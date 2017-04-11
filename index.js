/*
 * This module is mainly responsibe for starting the web server.
 */

/*
 * Load and config local environment variables. YES, EVEN BEFORE DEPS :)
 */
require('dotenv').config();

const server = require('./app');

/*
 * Start the server
 */
server.listen(8081, () => {
  console.log(`Server listening on port ${process.env.PORT || 8081}`);
});