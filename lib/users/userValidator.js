const Joi = require('joi');

module.exports = Joi.object().unknown(true).keys({
  name: Joi.string().required().label('name'),
  email: Joi.string().email().required().label('email'),
  password: Joi.string().required().label('password')
}).required().label('parameter object');