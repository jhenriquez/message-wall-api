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

    const registerAccount = new RegisterAccount(new UserRepository());

    before(() => {
      return registerAccount.execute({
        name: 'Pre-Existing User',
        email: 'pre-existing@email.com',
        password: 'password'
      });
    });

    it('expects a parameter object with the following structure: { name: String, email: String, password: String }', () => {
      return registerAccount.execute()
                            .then(PromiseHelpers.failWithMessage('Should fail for validation'))
                            .catch(PromiseHelpers.errorShouldMatch(/parameter/));
    });

    it('inserts a new user in in the data storage. Ensure resolves to a new user instance with a fresh id.', () => {
      return registerAccount.execute({ name: 'Test User', email: 'testUser1@email.com', password: 'password' })
                            .then((user) => {
                              user.should.have.property('id');
                            });
    });

    it('encrypts the provided password before storing it.', () => {
      return registerAccount.execute({ name: 'Test User', email: 'testUser2@email.com', password: 'password' })
                            .then((user) => {
                              user.password.should.eql(cipherPassword('password'));
                            });
    });

    it('confirms an email has not been previously registerd before creating account', () => {
      return registerAccount.execute({
        name: 'This should fail',
        email: 'pre-existing@email.com',
        password: 'password'
      }).then(PromiseHelpers.failWithMessage('Should have failed.'))
        .catch(PromiseHelpers.errorShouldMatch(/unique/i));
    });
  });
});