const Q   = require('q');

const UserValidator  = require('./userValidator');
const UserRepository = require('./userRepository');
const cipherPassword = require('./cipherPassword');

/*
 * Registers a new user account.
 */

class RegisterAccount {

  constructor (userRepository) {
    if (!(userRepository && userRepository instanceof UserRepository)) {
      throw new Error('An instance of the UserRepository type is expected.');
    }

    this.userRepository = userRepository;
  }

  execute (params) {
    let validated = UserValidator.validate(params);

    if (validated.error) {
      return Q.reject(validated.error);
    }

    /*
       Encrypts the password and updates the provided value with it.
     */
    validated.value.password = cipherPassword(validated.value.password);

    return this.userRepository
               .insert(validated.value)
               .then((user) => {
                  user.id = user._id;
                  delete user._id;
                  return user;
               });
  }
}

module.exports = RegisterAccount;