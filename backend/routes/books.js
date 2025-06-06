const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/booksController');

router.get('/', getAllBooks);        // GET /api/books
router.get('/:id', getBookById);     // GET /api/books/:id
router.post('/', addBook);           // POST /api/books
router.put('/:id', updateBook);      // PUT /api/books/:id
router.delete('/:id', deleteBook);   // DELETE /api/books/:id

module.exports = router;
