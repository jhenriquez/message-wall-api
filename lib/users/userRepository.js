/*
 * Encapsulates the storage and retrieval of User objects.
 */

const Q               = require('q');
const DataStore       = require('nedb');
const usersCollection = new DataStore({
  timestampData: true
});


class UserRepository {
  insert (user) {
    return Q.ninvoke(usersCollection, 'insert', user);
  }
}

module.exports = UserRepository;