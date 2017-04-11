/*
 * Module responsible for storing messages.
 */
const Q                     = require('q');
const MessageValidator      = require('./messageValidator');
const BaseMessageInteractor = require('./baseMessageInteractor');

class StoreMessage extends BaseMessageInteractor {

  execute (params) {
    let validated = MessageValidator.validate(params);
    if (validated.error) {
      return Q.reject(validated.error);
    }

    return this.messageRepository.insert(validated.value);
  }

}

module.exports = StoreMessage;