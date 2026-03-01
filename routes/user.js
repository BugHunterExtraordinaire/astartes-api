const express = require('express');
const router = express.Router();

const {
  login,
  register,
  getAllMarines,
  getMarine,
  createMarine,
  updateMarine,
  deleteMarine
} = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);

router.route('/marine')
      .get(getAllMarines)
      .post(createMarine);
router.route('/marine/:id')
      .get(getMarine)
      .patch(updateMarine)
      .deleteMarine(deleteMarine);

module.exports = router;