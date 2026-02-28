const { StatusCodes } = require('http-status-codes');
const APIError = require('./apierror');

class NotFoundError extends APIError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = NotFoundError;