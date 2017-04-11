/*
 * API routes (v1) bootstrap module. Imports all relevant routers and registers them on the given expressApp
 * under the '/api/v1' route.
 */
const consolidated   = require('express').Router();
const usersRoutes    = require('./users');
const messagesRoutes = require('./messages');

consolidated.use('/api/v1', usersRoutes);
consolidated.use('/api/v1', messagesRoutes);

module.exports = consolidated;