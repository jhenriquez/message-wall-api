const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().required().label('user'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().required().label('password')
}).required().label('parameter object');