const { StatusCodes } = require('http-status-codes');
const { APIError } = require('.');

class NotAuthenticatedError extends APIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = NotAuthenticatedError;