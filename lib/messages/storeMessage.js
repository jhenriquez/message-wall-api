/*
 * Module responsible for storing messages.
 */
const Q                 = require('q');
const MessageValidator  = require('./messageValidator');
const MessageRepository = require('./messageRepository');

class StoreMessage {
  constructor(messageRepository) {
    if (!(messageRepository && messageRepository instanceof MessageRepository)) {
      throw new Error('An instance of the MessageRepository type is expected.');
    }

    this.messageRepository = messageRepository;
  }

  execute (params) {
    let validated = MessageValidator.validate(params);
    if (validated.error) {
      return Q.reject(validated.error);
    }

    return this.messageRepository.insert(validated.value);
  }
}


module.exports = StoreMessage;