const chai            = require('chai');
const RegisterAccount = require('../../../lib/users/registerAccount');
const cipherPassword  = require('../../../lib/users/cipherPassword');
const PromiseHelpers  = require('../../helpers/promises');

const UserRepository = require('../../../lib/users/userRepository');

describe('users/registerAccount', () => {

  describe('#()', () => {
    it('expects a UserRepository object', () =>  {
      chai.expect(() => new RegisterAccount()).to.throw(Error, /UserRepository/);
      chai.expect(() => new RegisterAccount({})).to.throw(Error, /UserRepository/);
    });
  });

  describe('#execute', () => {

    const testUser = {
      name: 'Test User',
      email: 'testUser@email.com',
      password: 'password'
    };

    it('expects a parameter object with the following structure: { name: String, email: String, password: String }', () => {
      return new RegisterAccount(new UserRepository()).execute()
                                  .then(PromiseHelpers.failWithMessage('Should fail for validation'))
                                  .catch(PromiseHelpers.errorShouldMatch(/parameter/));
    });

    it('inserts a new user in in the data storage. Ensure resolves to a new user instance with a fresh id.', () => {
      return new RegisterAccount(new UserRepository()).execute(testUser)
                                  .then((user) => {
                                    user.should.have.property('id');
                                  });
    });

    it('encrypts the provided password before storing it.', () => {
      return new RegisterAccount(new UserRepository()).execute(testUser)
                                  .then((user) => {
                                    user.password.should.eql(cipherPassword(testUser.password));
                                  });
    });
  });
});