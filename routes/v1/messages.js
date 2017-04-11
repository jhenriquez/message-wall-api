/*
 * Messages resource API endpoints definition.
 */

const express     = require('express');
const messagesRouter = express.Router();

const MessageRepository = require('../../lib/messages/messageRepository');
const RetrieveMessages  = require('../../lib/messages/retrieveMessages');
const StoreMessage      = require('../../lib/messages/storeMessage');


const bypassSuccessValue = (rs, messages) => {
  rs.status(200).send(messages);
};

messagesRouter.get('/messages', (rq, rs) => {
  new RetrieveMessages(new MessageRepository())
                .execute()
                .then(bypassSuccessValue.bind(this, rs));
});

messagesRouter.post('/message', (rq, rs) => {
  new StoreMessage(new MessageRepository())
                .execute(rq.body)
                .then(bypassSuccessValue.bind(this, rs));
});


module.exports = messagesRouter;