const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncwrapper.js');
const checkId = require('../middleware/checkId.js');

const {
  getAllMarines,
  createMarine,
  getMarine,
  updateMarine,
  deleteMarine
} = require('../controllers/marine.js');

router.route('/')
      .get(asyncWrapper(getAllMarines))
      .post(asyncWrapper(createMarine));

router.route('/:id')
      .get(checkId, asyncWrapper(getMarine))
      .patch(checkId, asyncWrapper(updateMarine))
      .delete(checkId, asyncWrapper(deleteMarine));

module.exports = router;