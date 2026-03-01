const { StatusCodes } = require('http-status-codes');

const handleError = async (err, req, res, next) => {
  const customErrObj = {
    message: err.message || "something went wrong please try again",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  res.status(err.statusCode).json({
    message: err.message
  });
  next()
}

module.exports = handleError;