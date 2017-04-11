const path    = require('path');
const express = require('express');
const server  = express();

const morgan     = require('morgan');
const bodyParser = require('body-parser');
const session    = require('express-session');
const passport   = require('./passport');
const routes     = require('./routes/v1');

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
 * Configure session handling middleware. Will use cookies and servermemory for storage.
 */
server.use(session({
  secret: process.env.APP_SECRET_HASH,
  saveUninitialized: true,
  resave: false
}));

/*
 * Configure passport middleware; With session support as well.
 */
server.use(passport.initialize());
server.use(passport.session());

/*
 * Register application specific routes.
 */
server.use(routes);

module.exports = server;