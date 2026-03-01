const Marine = require('../models/marine');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllAstartes = async (req, res) => {
  const marines = await Marine.find({});
  res.status(StatusCodes.OK).json({
    marines,
    nbHits: marines.length
  });
};
const createAstartes = async (req, res) => {
  const marine = await Marine.create(req.body);
  res.status(StatusCodes.CREATED).json({
    marine
  });
};
const getAstartes = async (req, res) => {
  const marine = await Marine.findById(req.astartesId);
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.astartesId}`);

  res.status(StatusCodes.OK).json({
    marine
  });
};
const updateAstartes = async (req, res) => {
  const marine = await Marine.findByIdAndUpdate(req.astartesId, req.body, {
    returnDocument: 'after',
    runValidators: true
  });
  
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.astartesId}`);
  res.status(StatusCodes.OK).json({
    marine
  });
};
const deleteAstartes = async (req, res) => {
  const marine = await Marine.findByIdAndDelete(req.astartesId);
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.astartesId}`);

  res.status(StatusCodes.OK).json({
    marine
  });
};

module.exports = {
  getAllAstartes,
  createAstartes,
  getAstartes,
  updateAstartes,
  deleteAstartes
}