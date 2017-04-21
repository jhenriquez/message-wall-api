/*
 * Messages resource API endpoints definition.
 */
const { Rescue }     = require('rescue-error');
const express        = require('express');
const messagesRouter = express.Router();

const MessageRepository = require('../../lib/messages/messageRepository');
const RetrieveMessages  = require('../../lib/messages/retrieveMessages');
const StoreMessage      = require('../../lib/messages/storeMessage');
const isAuthenticated   = require('./common/authenticated');

/*
 * Extracts the friendly message from a Joi validation error.
 *
 * Remarks: This extracts the first error message. Assuming Joi is configured to abort early.
 */

const extractFriendlyMessage = (err) => err.details.shift().message;


const bypassSuccessValue = (rs, messages) => {
  rs.status(200).send(messages);
};

const handleError = (rs, err) => {
  console.log(err);
  new Rescue(err)
        .ifAttribute('isJoi', _ => rs.status(422).send(extractFriendlyMessage(err)))
        .default(_ => rs.status(500).send('Something went wrong! Please, try again.'))
        .do();
};

messagesRouter.get('/messages', (rq, rs) => {
  new RetrieveMessages(new MessageRepository())
                .execute()
                .then(bypassSuccessValue.bind(this, rs))
                .catch(handleError.bind(null, rs));
});

messagesRouter.post('/message', isAuthenticated(), (rq, rs) => {
  let message = {
    text: rq.body.text,
    author: rq.user
  }

  new StoreMessage(new MessageRepository())
                .execute(message)
                .then(bypassSuccessValue.bind(this, rs))
                .catch(handleError.bind(null, rs));
});


module.exports = messagesRouter;