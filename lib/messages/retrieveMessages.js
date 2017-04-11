/*
 * Retrieves a list of messages.
 *
 * Remarks: The messages are retrieved in reversed order, by createdAt.
 */

const BaseMessageInteractor = require('./baseMessageInteractor');

class RetrieveMessages extends BaseMessageInteractor {
  execute () {
    return this.messageRepository.findAll();
  }
}


module.exports = RetrieveMessages;