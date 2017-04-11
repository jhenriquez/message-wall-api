/*
 * Exposes common functionality within message related interactors.
 * Please, do NOT use on its own.
 */

const MessageRepository = require('./messageRepository');

class BaseMessageInteractor {
  constructor(messageRepository) {
    if (!(messageRepository && messageRepository instanceof MessageRepository)) {
      throw new Error('An instance of the MessageRepository type is expected.');
    }

    this.messageRepository = messageRepository;
  }
}


module.exports = BaseMessageInteractor;