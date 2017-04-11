const chai            = require('chai');
const UserRepository  = require('../../../lib/users/userRepository');
const RegisterAccount = require('../../../lib/users/registerAccount');




describe('users/UserRepository', () => {

  let existingUser;

  before(() => {
    return new RegisterAccount(new UserRepository()).execute({
      name: 'Some Test User',
      email: 'test@email.com',
      password: 'some-password'
    }).then((user) => existingUser = user);
  });

  describe('#findById', () => {
    it('expects a string that represents the user\'s id.', () => {
      chai.expect(() => new UserRepository().findById()).to.throw(Error, /id/);
      chai.expect(() => new UserRepository().findById('')).to.throw(Error, /id/);
    });

    it('resolves to null if the no user is matched.', () => {
      return new UserRepository().findById('SomethingNotAnID')
                                 .then((user) => {
                                    chai.expect(user).to.be.null;
                                 });
    });

    it('resolves to a user if the id matches', () => {
      return new UserRepository().findById(existingUser.id)
                                 .then((user) => {
                                    user.should.eql(existingUser);
                                 });
    });
  });
});