const { StatusCodes } = require('http-status-codes');
const APIError = require('./apierror');

class BadRequestError extends APIError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = BadRequestError;