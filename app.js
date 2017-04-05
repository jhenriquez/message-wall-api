const path    = require('path');
const express = require('express');
const server  = express();


/*
 * Serve contents of the "public" directory as static.
 */
server.use(
    express.static(path.resolve('public'))
);


server.listen(8081, () => {
    console.log(`Server listening on port ${process.env.PORT || 8081}`);
});