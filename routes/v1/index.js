/*
 * API routes (v1) bootstrap module. Imports all relevant routers and registers them on the given expressApp
 * under the '/api/v1' route.
 */

const usersRoutes    = require('./users');
const messagesRoutes = require('./messages');

function RegisterAPIV1Routes (expressApp) {
  expressApp.use('/api/v1', usersRoutes);
  expressApp.use('/api/v1', messagesRoutes);
}

module.exports = RegisterAPIV1Routes;