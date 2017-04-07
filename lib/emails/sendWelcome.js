/*
 * Encapsulates a call to the mailgun API with a welcome message to a new  user.
 */

const Q = require('q');

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const UserValidator = require('../users/userValidator');

class SendWelcome {
  execute (user) {
    let validated = UserValidator.validate(user);

    if (validated.error) {
      return Q.reject(validated.error);
    }

    let mailSender = mailgun.messages();

    return Q.ninvoke(mailSender, 'send', {
      from: 'welcome@thoughtwall.io',
      to: user.email,
      subject: `${user.name}, Welcome!`,
      html: `<h1>Welcome</h1><p>${user.name}, we are glad to have you here. Now you can start posting.</p>`
    });
  }
}

module.exports = SendWelcome;