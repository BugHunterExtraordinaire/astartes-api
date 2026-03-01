const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncwrapper.js');

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
      .get(asyncWrapper(getAstartes))
      .patch(asyncWrapper(updateAstartes))
      .delete(asyncWrapper(deleteAstartes));

module.exports = router;