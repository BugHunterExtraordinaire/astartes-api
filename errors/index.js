const APIError = require('./apierror');
const NotFoundError = require('./notfound');
const BadRequestError = require('./badrequest');
const NotAuthenticatedError = require('./notauthenticated');

module.exports = {
  APIError,
  NotFoundError,
  BadRequestError,
  NotAuthenticatedError
}