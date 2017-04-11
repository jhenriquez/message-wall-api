const chai              = require('chai');
const PromiseHelpers    = require('../../helpers/promises');
const StoreMessage      = require('../../../lib/messages/storeMessage');
const MessageRepository = require('../../../lib/messages/messageRepository');


describe('messages/StoreMessage', () => {
  const author = {
    id: '123345567',
    name: 'Sample User',
    email: 'sample@email.com',
    emailHash: 'ca0b21b7f26ec580e57360c906c9529c',
    updatedAt: new Date(),
    createdAt: new Date()
  };

  describe('#()', () => {
    it('expects a MessageRepository object.', () => {
      chai.expect(() => new StoreMessage()).to.throw(Error, /MessageRepository/);
      chai.expect(() => new StoreMessage({})).to.throw(Error, /MessageRepository/);
    });
  });

  describe('#execute()', () => {

    const storeMessage = new StoreMessage(new MessageRepository());

    it('expects a param object of the following form: { text: String, author: User }', () => {
      return storeMessage.execute({ text: 123 })
                         .then(PromiseHelpers.failWithMessage('Should have failed.'))
                         .catch(PromiseHelpers.errorShouldMatch(/message/i));
    });

    it('stores a new message in the data store. Resolves a message with fresh id and timestamp.', () => {
      let validMessage = {
        text: 'This is a valid message.',
        author: author
      };

      return storeMessage.execute(validMessage).then((message) => {
        message.should.have.property('id');
        message.should.have.property('updatedAt');
        message.should.have.property('createdAt');
        message.author.should.eql(author);
        message.text.should.eql(validMessage.text);
      });
    });
  });

});