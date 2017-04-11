const Joi            = require('joi');
const Q              = require('q');
const UserRepository = require('./userRepository');
const cipherPassword = require('./cipherPassword');


const UserCredentials = Joi.object().keys({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().required().label('password')
}).required().label('Credentials');

class UserAuthenticate {
  constructor (userRepository) {
    if (!(userRepository && userRepository instanceof UserRepository)) {
      throw new Error('An instance of the UserRepository type is expected.');
    }

    this.userRepository = userRepository;
  }

  _validateUserPassword (user, password) {
    if (!user || user.password !== cipherPassword(password)) {
      throw new Error('Invalid Credentials');
    }

    return user;
  }

  execute (params) {
    let validated = UserCredentials.validate(params);

    if (validated.error) {
      return Q.reject(validated.error);
    }

    return this.userRepository
               .findByEmail(validated.value.email)
               .then((user) => this._validateUserPassword(user, validated.value.password));
  }
}

module.exports = UserAuthenticate;