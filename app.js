const path    = require('path');
const express = require('express');
const server  = express();

const morgan     = require('morgan');
const bodyParser = require('body-parser');

/*
 * Configure logging
 */
server.use(morgan('combined'));


/*
 * Configure body parsing middleware to user JSON
 */
server.use(bodyParser.json());

/*
 * Serve contents of the "public" directory as static.
 */
server.use(
  express.static(path.resolve('public'))
);

/*
 * Start the server
 */
server.listen(8081, () => {
  console.log(`Server listening on port ${process.env.PORT || 8081}`);
});
