const { StatusCodes } = require('http-status-codes');
const APIError = require('./apierror');

class NotAuthenticatedError extends APIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = NotAuthenticatedError;