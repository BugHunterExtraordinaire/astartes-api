const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Please provide both email and password");
  const user = await User.findOne({
    email
  });
  if (!user) throw new NotFoundError("invalid credentials");
  const isVerified = await user.verifyPassword(password);
  if (!isVerified) throw new NotFoundError("invalid credentials");
  const token = user.generateJwt();
  res.status(StatusCodes.OK).json({
    user,
    token
  });
}

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.generateJwt();
  res.status(StatusCodes.CREATED).json({
    user,
    token
  });
}

module.exports = {
  login,
  register
}