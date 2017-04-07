/*
 * Registers global hooks for the mocha test runner.
 */

/*
 * Loads an executes dotenv to ensure all required environment variables are available for tests.
 */

require('dotenv').config();


const chai = require('chai');

/*
 * Ensures the chai should API is run before any spec is run.
 */
before(chai.should);