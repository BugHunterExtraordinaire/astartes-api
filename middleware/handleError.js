const { StatusCodes } = require('http-status-codes');

const handleError = async (err, req, res, next) => {
  const customErrObj = {
    message: err.message || "something went wrong please try again",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }
  if (err.name === "ValidationError") {
    let message = [];
    for (const error in err.errors) {
      message.push(err.errors[error].message); 
    }
    customErrObj.message = message.join(", ");
    customErrObj.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err?.errorResponse?.code === 11000) {
    customErrObj.statusCode = StatusCodes.BAD_REQUEST;
    customErrObj.message = "Email value already present";
  }
  res.status(customErrObj.statusCode).json({
    message: customErrObj.message
  });
  next();
}

module.exports = handleError;