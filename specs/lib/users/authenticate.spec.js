const chai             = require('chai');
const UserAuthenticate = require('../../../lib/users/authenticate');
const RegisterAccount  = require('../../../lib/users/registerAccount');
const UserRepository   = require('../../../lib/users/userRepository');
const PromiseHelpers   = require('../../helpers/promises');

describe('users/authenticate', () => {

  describe('#()', () => {
    it('expects a UserRepository instance', () => {
      chai.expect(() => new UserAuthenticate()).to.throw(Error, /UserRepository/);
      chai.expect(() => new UserAuthenticate({})).to.throw(Error, /UserRepository/);
    });
  });

  describe('#execute', () => {

    const testUser = {
      name: 'Test User',
      email: 'test@email.com',
      password: 'password'
    };

    before(() => {
      return new RegisterAccount(new UserRepository()).execute(testUser);
    });

    it('expects user credentials with following structure: { email: String, password: String }', () => {
      return new UserAuthenticate(new UserRepository()).execute()
                                                       .then(PromiseHelpers.failWithMessage('An error was expected.'))
                                                       .catch(PromiseHelpers.errorShouldMatch(/credentials/i));
    });

    it('should resolve to a User when provided with valid credentials.', () => {
      return new UserAuthenticate(new UserRepository())
                                    .execute({ email: testUser.email, password: testUser.password })
                                    .then((user) => {
                                      user.email.should.eql(testUser.email);
                                      user.name.should.eql(testUser.name);
                                    });
    });

    it('should reject to an Error when invalid credentials are provided.', () => {
      return new UserAuthenticate(new UserRepository())
                                    .execute({ email: 'notTheUsersEmail@email.com', password: testUser.password })
                                    .then(PromiseHelpers.failWithMessage('Should have failed authentication.'))
                                    .catch(PromiseHelpers.errorShouldMatch(/invalid credentials/i));
    });

  });
});