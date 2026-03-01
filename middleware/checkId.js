const { NotFoundError } = require("../errors");

const checkId = (req, res, next) => {
  const { id: astartesId } = req.params;
  if (!astartesId) next(new NotFoundError(`please provide a valid id`));
  req.astartesId = astartesId;
  next();
}

module.exports = checkId;