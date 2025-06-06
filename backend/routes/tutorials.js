const express = require('express');
const router = express.Router();
const {
  getAllTutorials,
  getTutorialById,
  addTutorial,
  updateTutorial,
  deleteTutorial
} = require('../controllers/tutorialsController');

router.get('/', getAllTutorials);        // GET /api/tutorials
router.get('/:id', getTutorialById);     // GET /api/tutorials/:id
router.post('/', addTutorial);           // POST /api/tutorials
router.put('/:id', updateTutorial);      // PUT /api/tutorials/:id
router.delete('/:id', deleteTutorial);   // DELETE /api/tutorials/:id

module.exports = router;


