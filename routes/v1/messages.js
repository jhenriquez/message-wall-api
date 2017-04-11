/*
 * Messages resource API endpoints definition.
 */

const express     = require('express');
const messagesRouter = express.Router();

const MessageRepository = require('../../lib/messages/messageRepository');
const RetrieveMessages  = require('../../lib/messages/retrieveMessages');
const StoreMessage      = require('../../lib/messages/storeMessage');
const isAuthenticated   = require('./common/authenticated');


const bypassSuccessValue = (rs, messages) => {
  rs.status(200).send(messages);
};

messagesRouter.get('/messages', (rq, rs) => {
  new RetrieveMessages(new MessageRepository())
                .execute()
                .then(bypassSuccessValue.bind(this, rs))
                .catch(console.log.bind(console));
});

messagesRouter.post('/message', isAuthenticated(), (rq, rs) => {
  let message = {
    text: rq.body.text,
    author: rq.user
  }
  new StoreMessage(new MessageRepository())
                .execute(message)
                .then(bypassSuccessValue.bind(this, rs))
                .catch(console.log.bind(console));
});


module.exports = messagesRouter;