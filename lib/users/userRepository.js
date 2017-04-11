/*
 * Encapsulates the storage and retrieval of User objects.
 */

const Q               = require('q');
const DataStore       = require('nedb');
const Crypto          = require('crypto');

const usersCollection = new DataStore({
  timestampData: true
});

usersCollection.ensureIndex({ fieldName: 'email', unique: true });

class UserRepository {

  _replaceId (user) {
    user.id = user._id;
    delete user._id;
    return user;
  }

  _md5 (email) {
    return Crypto.createHash('md5').update(email).digest('hex');
  }

  insert (user) {
    user.emailHash = this._md5(user.email);
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