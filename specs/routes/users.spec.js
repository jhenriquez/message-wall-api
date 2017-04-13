const nock    = require('nock');
const request = require('supertest');
const server  = require('../../app');

const RegisterAccount  = require('../../lib/users/registerAccount');
const UserRepository   = require('../../lib/users/userRepository');
const cookiedAgent     = request.agent(server);

describe('routes/users', () => {

  const createTestSubject = (() => {
    let counter = 0;
    return () => {
      return {
        name: 'Test User',
        email: `vunoridebe${++counter}@10host.top`,
        password: 'SomePassword'
      };
    };
  })();

  describe('POST /api/v1/user/signup', () => {

    beforeEach(() => {
      nock('https://api.mailgun.net:443', {"encodedQueryParams":true})
        .post(`/v3/${process.env.MAILGUN_DOMAIN}/messages`)
        .reply(200, {"id":`<20170407202418.8774.53903.7395BB4B@${process.env.MAILGUN_DOMAIN}>`,"message":"Queued. Thank you."});
    });

    it('it resolves to a newly created user and provides success metadata.', () => {
      let testSubject = createTestSubject();
      return request(server)
              .post('/api/v1/user/signup')
              .send(testSubject)
              .expect(200)
              .then((rs) => {
                rs.body.email.should.eql(testSubject.email);
                rs.body.name.should.eql(testSubject.name);
                rs.body.should.have.a.property('id');
              });
    });

    it('rejects to a single error message and a status code (422) on validation errors.', () => {
      return request(server)
              .post('/api/v1/user/signup')
              .send({})
              .expect(422)
              .then(rs => {
                rs.body.should.eql({});
                rs.text.should.match(/name/);
              });
    });

  });

  describe('GET /api/v1/user', () => {
    let testSubject = createTestSubject();
    before(() => {
      return new RegisterAccount(new UserRepository()).execute(testSubject);
    });

    it('should reject with 401 if no user is signed on', () => {
      return request(server)
              .get('/api/v1/user')
              .expect(401);
    });

    it('should resolve to the current user', () => {
      return cookiedAgent
                    .post('/api/v1/user/authenticate')
                    .send({ email: testSubject.email, password: testSubject.password })
                    .expect(200)
                    .then(_ => {

                      return cookiedAgent
                                    .get('/api/v1/user')
                                    .expect(200)
                                    .then(rs => {
                                      rs.body.email.should.eql(testSubject.email);
                                      rs.body.name.should.eql(testSubject.name);
                                    });
                    });
    });

    describe('POST /api/v1/user/authenticate', () => {
      it('should populate the connect.sid cookie.', () => {

        return cookiedAgent
                    .post('/api/v1/user/authenticate')
                    .send({ email: testSubject.email, password: testSubject.password })
                    .expect(200)
                    .then(rs => {
                      rs.body.email.should.eql(testSubject.email);
                      rs.body.name.should.eql(testSubject.name);
                    });
      });
    });

  });
});