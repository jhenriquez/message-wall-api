/*
 * Exposes a function that builds a middleware that verifies if the request has been authenticated before moving through.
 */

function isAuthenticated () {
  return (rq, rs, n) => {
    if (rq.isAuthenticated()) { return n(); }
    rs.status(401).send('Please authenticate before trying to acquire this information.');
  };
}

module.exports = isAuthenticated;