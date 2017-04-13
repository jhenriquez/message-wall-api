/*
 * Users resource API endpoints definition.
 */
const Q           = require('q');
const express     = require('express');
const usersRouter = express.Router();

const RegisterAccount  = require('../../lib/users/registerAccount');
const UserRepository   = require('../../lib/users/userRepository');
const AuthenticateUser = require('../../lib/users/authenticate');
const SendWelcome      = require('../../lib/emails/sendWelcome');
const isAuthenticated  = require('./common/authenticated');


/*
 * Extracts the friendly message from a Joi validation error.
 *
 * Remarks: This extracts the first error message. Assuming Joi is configured to abort early.
 */

const extractFriendlyMessage = (err) => err.details.shift().message;

/*
 * Helper function that takes a user, authenticates it on the request and pass it along the promise chain.
 */

const loginAndBypassUser = (rq, user) => {
  return Q.ninvoke(rq, 'login', user).then(_ => user);
};

/*
 * Short hand function to to send over a 200 status code with a given value resolved from the promise chain.
 */

const bypassSuccessUser = (rs, user) => {
  rs.status(200).send(user);
};

const sendWelcomeEmailAndBypassUser = (user) => {
  new SendWelcome().execute(user)
                    .then((resolve) => {
                      console.log(`New mail queued for account: ${user.email}.`);
                    }).catch((err) => {
                      console.log(`Something went wrong. ${err.message}`);
                    });

  return user;
};


usersRouter.get('/user', isAuthenticated(), (rq, rs) => {
  return rs.status(200).send(rq.user);
});

usersRouter.post('/user/signup', (rq, rs) => {
  new RegisterAccount(new UserRepository())
                .execute(rq.body)
                .then(sendWelcomeEmailAndBypassUser)
                .then(loginAndBypassUser.bind(this, rq))
                .then(bypassSuccessUser.bind(this, rs))
                .catch((err) => {
                  if (err.isJoi) {
                    return rs.status(422).send(extractFriendlyMessage(err));
                  }

                  if ((/unique/i).test(err.message)) {
                    return rs.status(403).send('It appears you already have an account or are trying to use someone elses email. Naugthy human... ;)');
                  }

                  rs.status(500).send('Something went wrong while creating your account. Please try again.');
                });
});

usersRouter.post('/user/authenticate', (rq, rs) => {
  new AuthenticateUser(new UserRepository())
        .execute(rq.body)
        .then(loginAndBypassUser.bind(this, rq))
        .then(bypassSuccessUser.bind(this, rs))
        .catch((err) => {
          if (err.isJoi) {
            return rs.status(422).send(extractFriendlyMessage(err));
          }

          if ((/invalid/i).test(err.message)) {
            return rs.status(401).send('Invalid Credentials');
          }

          rs.status(500).send('Soemthing went wrong attempting sign in. Please try again.');
        });
});

module.exports = usersRouter;