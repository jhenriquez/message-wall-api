/*
 * Exposes a Joi schema that validates the expected
 * structure of a given message before it is stored.
 */

const Joi = require('joi');

const MessageValidator = Joi.object().keys({
  text: Joi.string().required().label('message text'),
  author: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    emailHash: Joi.string().required(),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required()
  }).required().label('message author')
}).required().label('message').unknown(true);


module.exports = MessageValidator;