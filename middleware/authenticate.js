const jwt = require('jsonwebtoken');
const { NotAuthenticatedError } = require('../errors')

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return next(new NotAuthenticatedError('Not authenticated to access this route'));
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new NotAuthenticatedError('Token is invalid')); 
  }
}

module.exports = authenticateUser;