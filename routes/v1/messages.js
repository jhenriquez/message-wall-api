/*
 * Messages resource API endpoints definition.
 */

const express     = require('express');
const messagesRouter = express.Router();

messagesRouter.get('/messages', (rs, rq) => {
  /* Gets all available messages. */

  /*
   * Remarks: Messages will intentionally be sorted from newest to oldest.
   */

  /*
   * Sample Response: {
   *   meta: {
   *     success: Bool,
   *     error: Error // If success is false.
   *   },
   *   data: Message[] = { // if successful
   *     id: String
   *     text: String,
   *     author: User,
   *     createdAt: Date
   *   }
   * }
   */
});

messagesRouter.post('/message', (rs, rq) => {
  /* Creates a new message. */

  /*
   * Remarks: Will use the current user as the author of the message.
   */

  /*
   * Expected body: {
   *   text: String
   * }
   */

  /*
   * Sample Response: {
   *   meta: {
   *     success: Bool,
   *     error: Error // If success is false.
   *   },
   *   data: Message = { // if successful
   *     id: String
   *     text: String,
   *     author: User,
   *     createdAt: Date
   *   }
   * }
   */
});


module.exports = messagesRouter;