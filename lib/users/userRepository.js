/*
 * Encapsulates the storage and retrieval of User objects.
 */

const Q               = require('q');
const DataStore       = require('nedb');

const usersCollection = new DataStore({
  timestampData: true
});


class UserRepository {

  _replaceId (user) {
    user.id = user._id;
    delete user._id;
    return user;
  }

  insert (user) {
    return Q.ninvoke(usersCollection, 'insert', user)
            .then(this._replaceId);
  }

  findByEmail (email) {
    return Q.ninvoke(usersCollection, 'findOne', { email: email })
            .then((user) => user ? this._replaceId(user) : user);
  }

  findById (id) {
    if (!id) {
      throw new Error('Please provide a valid id.');
    }

    return Q.ninvoke(usersCollection, 'findOne', { _id: id })
            .then((user) => user ? this._replaceId(user) : user);
  }

}

module.exports = UserRepository;