const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncwrapper.js');
const checkId = require('../middleware/checkId.js');

const {
  getAllAstartes,
  createAstartes,
  getAstartes,
  updateAstartes,
  deleteAstartes
} = require('../controllers/astartes.js');

router.route('/')
      .get(asyncWrapper(getAllAstartes))
      .post(asyncWrapper(createAstartes));

router.route('/:id')
      .get(checkId, asyncWrapper(getAstartes))
      .patch(checkId, asyncWrapper(updateAstartes))
      .delete(checkId, asyncWrapper(deleteAstartes));

module.exports = router;