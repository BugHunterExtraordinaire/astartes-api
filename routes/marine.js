const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncwrapper.js');
const authenticateUser = require('../middleware/authenticate.js');
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
      .get([authenticateUser, checkId], asyncWrapper(getMarine))
      .patch([authenticateUser, checkId], asyncWrapper(updateMarine))
      .delete([authenticateUser, checkId], asyncWrapper(deleteMarine));

module.exports = router;