const nock           = require('nock');
const SendWelcome    = require('../../../lib/emails/sendWelcome');
const PromiseHelpers = require('../../helpers/promises');

describe('emails/sendWelcome', () => {

  describe('#execute', () => {

    let testUser = {
      name: 'Test User',
      email: 'vunoridebe@10host.top',
      password: 'SomePassword'
    };

    it('expects a User compliant object { name: String, email: String, password: String }',  () => {
      return new SendWelcome().execute()
                              .then(PromiseHelpers.failWithMessage('Should have fail for validation.'))
                              .catch(PromiseHelpers.errorShouldMatch(/parameter/))
    });

    it('should call the mailgun API and succeed for a registered email.', () => {

      nock('https://api.mailgun.net:443', {"encodedQueryParams":true})
        .post(`/v3/${process.env.MAILGUN_DOMAIN}/messages`, "from=welcome%40thoughtwall.io&to=vunoridebe%4010host.top&subject=Test%20User%2C%20Welcome!&html=%3Ch1%3EWelcome%3C%2Fh1%3E%3Cp%3ETest%20User%2C%20we%20are%20glad%20to%20have%20you%20here.%20Now%20you%20can%20start%20posting.%3C%2Fp%3E")
        .reply(200, {"id":`<20170407202418.8774.53903.7395BB4B@${process.env.MAILGUN_DOMAIN}>`,"message":"Queued. Thank you."});


      return new SendWelcome().execute(testUser);
    });

  });

});