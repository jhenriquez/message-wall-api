const Q   = require('q');
const Joi = require('joi');

const UserRepository = require('./userRepository');
const cipherPassword = require('./cipherPassword');

const UserValidator = Joi.object().keys({
  name: Joi.string().required().label('user'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().required().label('password')
}).required().label('parameter object');

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
       Encrypts the password and updates the provided values with it.
     */
    validated.value.password = cipherPassword(validated.value.password);

    return this.userRepository
               .insert(validated.value)
               .then((user) => {
                  return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    createdAt: user.createdAt
                  };
               });
  }
}

module.exports = RegisterAccount;