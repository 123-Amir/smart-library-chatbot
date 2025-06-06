const express = require('express');
const router = express.Router();
const {
  getAllFaqs,
  getFaqById,
  addFaq,
  updateFaq,
  deleteFaq
} = require('../controllers/faqsController');

router.get('/', getAllFaqs);        // GET /api/faqs
router.get('/:id', getFaqById);     // GET /api/faqs/:id
router.post('/', addFaq);           // POST /api/faqs
router.put('/:id', updateFaq);      // PUT /api/faqs/:id
router.delete('/:id', deleteFaq);   // DELETE /api/faqs/:id

module.exports = router;
