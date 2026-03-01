const Marine = require('../models/marine');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { formatSort } = require('../utils/marine');

const getAllMarines = async (req, res) => {
  const { 
    name, 
    chapter, 
    rank, 
    isTraitor,
    sort,
    limit,
    page
  } = req.query;

  const findObj = {};
  const sortObj = formatSort(sort);

  let limitNum = 10;
  let pageNum = 0;

  if (name) {
    findObj.name = name;
  }
  if (chapter) {
    findObj.chapter = chapter;
  }
  if (rank) {
    findObj.rank = rank;
  }
  if (isTraitor) {
    findObj.isTraitor = isTraitor === "true" ? true : false;
  }
  if (limit) {
    limitNum = Number(limit);
  }
  if (page) {
    pageNum = (Number(page) - 1) * limitNum;
  }

  findObj.createdBy = req.user.userId;

  const marines = await Marine.find(findObj)
                              .sort(sortObj)
                              .limit(limitNum)
                              .skip(pageNum);

  res.status(StatusCodes.OK).json({
    marines,
    nbHits: marines.length
  });
};
const createMarine = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const marine = await Marine.create(req.body);
  res.status(StatusCodes.CREATED).json({
    marine
  });
};
const getMarine = async (req, res) => {
  const marine = await Marine.findOne({
    _id: req.marineId,
    createdBy: req.user.userId
  });
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.marineId}`);

  res.status(StatusCodes.OK).json({
    marine
  });
};
const updateMarine = async (req, res) => {
  const marine = await Marine.findOneAndUpdate({
    _id: req.marineId,
    createdBy: req.user.userId
  }, req.body, {
    returnDocument: 'after',
    runValidators: true
  });
  
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.marineId}`);
  res.status(StatusCodes.OK).json({
    marine
  });
};
const deleteMarine = async (req, res) => {
  const marine = await Marine.findOneAndDelete({
    _id: req.marineId,
    createdBy: req.user.userId
  });
  if (!marine) throw new NotFoundError(`No marine found with id: ${req.marineId}`);

  res.status(StatusCodes.OK).json({
    marine
  });
};

module.exports = {
  getAllMarines,
  createMarine,
  getMarine,
  updateMarine,
  deleteMarine
}