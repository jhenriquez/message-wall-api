const Q              = require('q');
const BaseRepository = require('../common/baseRepository');
const Datastore      = require('nedb');

const messages = new Datastore({ timestampData: true });


class MessageRepository extends BaseRepository {
  insert (message) {
    return Q.ninvoke(messages, 'insert', message)
            .then(this._replaceId);
  }

  findAll () {
    let findCursor = messages.find({}).sort({ createdAt: -1 });
    return Q.ninvoke(findCursor, 'exec');
  }
}


module.exports = MessageRepository;