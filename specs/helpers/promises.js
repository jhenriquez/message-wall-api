/*
 * Exposes helper functions for dealing with promises in specs.
 */

/*
 * Throws an Error object with the given message. Useful for specs that call on functions and are expected to fail but succeed.
 *
 * e.g: SomePromiseReturningFunction().then(failWithMessage('This function was expected to fail in this scenario'));
 */
module.exports.failWithMessage = function (message) {
  return () => {
    throw new Error(message);
  };
};

/*
 * Throws an Error object if the provided regex doesn't match the resolved promise error.
 *
 * e.g: SomePromiseReturningFunction().catch(errorShouldMatch(/value/));
 */
module.exports.errorShouldMatch = function (regex) {
  return (err) => {
    if (!regex.test(err.message)) {
      throw new Error(`Returned error doesn\'t match expectation. ${regex}`);
    }
  };
};