const _                 = require('lodash');
const Q                 = require('q');
const chai              = require('chai');
const MessageRepository = require('../../../lib/messages/messageRepository');
const RetrieveMessages  = require('../../../lib/messages/retrieveMessages');
const StoreMessage      = require('../../../lib/messages/storeMessage');

describe('messages/retrieveMessages', () => {

  describe('#()', () => {

    it('expects a MessageRepository object.', () => {
      chai.expect(() => new RetrieveMessages()).to.throw(Error, /MessageRepository/);
      chai.expect(() => new RetrieveMessages({})).to.throw(Error, /MessageRepository/);
    });

  });

  describe('#execute()', () => {
    const storeMessage = new StoreMessage(new MessageRepository());
    const retrieveMessages = new RetrieveMessages(new MessageRepository());

    const createAuthor = (() => {
      let counter = 0;
      return () => {
        return {
          id: `${++counter}${counter}${counter}`,
          name: `Sample User ${counter}`,
          email: 'sample@email.com',
          emailHash: 'ca0b21b7f26ec580e57360c906c9529c',
          updatedAt: new Date(),
          createdAt: new Date()
        };
      };
    })();

    const createMessage = (() => {
      let counter = 0;
      return (author) => {
        return {
          text: `This is message #${++counter}`,
          author: author
        };
      };
    })();

    const newCountedMessage = _.flowRight([storeMessage.execute, createMessage, createAuthor]).bind(storeMessage);

    before(() => {
      return Q.all([
        newCountedMessage(),
        newCountedMessage(),
        newCountedMessage()
      ]);
    });

    it('should resolve to 3 messages', () => {
      return retrieveMessages.execute()
                             .then(messages => {
                                messages.should.be.an.instanceOf(Array);
                                messages.should.have.length(3);
                             });
    });

    it('should retrieve the messages in reverse order', () => {
      return retrieveMessages.execute()
                             .then(messages => {
                                messages.forEach((m, i) => {
                                  m.text.should.eql(`This is message #${messages.length-i}`);
                                });
                             });
    });

  });

});