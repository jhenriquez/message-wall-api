/*
 * Serves as a base class for repositories common functionality.
 * Please, do not use on its own.
 */

class BaseRepository {

  _replaceId (entity) {
    entity.id = entity._id;
    delete entity._id;
    return entity;
  }

}

module.exports = BaseRepository;