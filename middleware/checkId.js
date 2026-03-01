const { BadRequestError } = require("../errors");
const mongoose = require('mongoose');

const checkId = (req, res, next) => {
  const { id: astartesId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(astartesId)) next(new BadRequestError(`please provide a valid id`));
  req.astartesId = astartesId;
  next();
}

module.exports = checkId;