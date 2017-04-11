/*
 * Configures an exposes a passport instance.
 */

const passport         = require('passport');
const LocalStrategy    = require('passport-local');
const UserRepository   = require('./lib/users/userRepository');
const UserAuthenticate = require('./lib/users/authenticate');


passport.use(new LocalStrategy((email, password, done) => {

  new UserAuthenticate(new UserRepository()).execute({
    email: email,
    password: password
  }).then(done.bind(null,null))
    .catch(done);
}));


/*
 * The user that gets serialized into the request
 * doesn't need a password field.
 */
const removePassword = (user) => {
  delete user.password;
  return user;
};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  new UserRepository().findById(id)
                      .then(removePassword)
                      .then(done.bind(null,null))
                      .catch(done);
});

module.exports = passport;