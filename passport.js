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

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  new UserRepository().findById(id)
                      .then(done.bind(null,null))
                      .catch(done);
});

module.exports = passport;