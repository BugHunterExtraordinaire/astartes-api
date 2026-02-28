const Marine = require('../models/marine');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllAstartes = async (req, res) => {
  const marines = await Marine.find({});
  res.status(StatusCodes.OK).json({
    marines,
    nbHits: marines.length
  });
};
const createAstartes = async (req, res) => {
  const { name, chapter } = req.body;
  if (!name || !chapter) throw new BadRequestError("Please provide both name and chapter for astartes");
  const marine = await Marine.create(req.body);
  res.status(StatusCodes.CREATED).json({
    marine
  });
};
const getAstartes = async (req, res) => {
  res.send('get all astartes')
};
const updateAstartes = async (req, res) => {
  res.send('get all astartes')
};
const deleteAstartes = async (req, res) => {
  res.send('get all astartes')
};

module.exports = {
  getAllAstartes,
  createAstartes,
  getAstartes,
  updateAstartes,
  deleteAstartes
}