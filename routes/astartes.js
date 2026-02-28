const express = require('express');
const router = express.Router();

const {
  getAllAstartes,
  createAstartes,
  getAstartes,
  updateAstartes,
  deleteAstartes
} = require('../controllers/astartes.js');

router.route('/')
      .get(getAllAstartes)
      .post(createAstartes);
router.route('/:id')
      .get(getAstartes)
      .patch(updateAstartes)
      .delete(deleteAstartes);

module.exports = router;