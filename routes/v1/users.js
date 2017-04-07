/*
 * Users resource API endpoints definition.
 */

const express     = require('express');
const usersRouter = express.Router();

usersRouter.get('/user', (rs, rq) => {
  /* Gets current user session information */

  /*
   * Remarks:
   *  - Uses request metadata to determine if a there is a standing session.
   *
   */

  /*
   * Sample Response: {
   *   meta: {
   *     availableSession: Bool
   *   },
   *   data: User = {
   *     id: String
   *     name: String,
   *     email: String,
   *     emailHash: String
   *   }
   * }
   */
});

usersRouter.post('/user', (rs, rq) => {
  /* Register a user. */

  /*
   * Sample Response: {
   *   meta: {
   *     success: Bool,
   *     error: Error // If success is false.
   *   },
   *   data: User = { // Null if success is false, the new User instance otherwise.
   *     id: String
   *     name: String,
   *     email: String,
   *     emailHash: String
   *   }
   * }
   */
});

userRouter.post('/user/authenticate', (rs, rq) => {
  /* Authenticates an existing user and creates a new session. */

  /*
   * Sample Response: {
   *   meta: {
   *     success: Bool,
   *     error: Error // If success is false.
   *   },
   *   data: User = { // Null if success is false, the authenticated User instance otherwise.
   *     id: String
   *     name: String,
   *     email: String,
   *     emailHash: String
   *   }
   * }
   */
});

module.exports = userRouter;