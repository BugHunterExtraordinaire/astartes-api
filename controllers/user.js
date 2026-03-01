const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {

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