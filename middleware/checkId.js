const { BadRequestError } = require("../errors");
const mongoose = require('mongoose');

const checkId = (req, res, next) => {
  const { id: marineId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(marineId)) return next(new BadRequestError(`please provide a valid id`));
  req.marineId = marineId;
  next();
}

module.exports = checkId;