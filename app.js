const path = require('path');
const express = require('express');
const server = express();

const morgan = require('morgan');

/*
 * Configure logging
 */
server.use(morgan('combined'));


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
