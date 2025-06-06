const { readData, writeData, generateId, findById } = require('../utils/fileUtils');

async function getAllBooks(req, res) {
  const data = await readData();
  res.json(data.books || []);
}

async function getBookById(req, res) {
  const { id } = req.params;
  const data = await readData();
  const book = findById(data.books, id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
}

async function addBook(req, res) {
  const { title, author, year, genre } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and Author are required' });

  const newBook = { id: generateId(), title, author, year: year || '', genre: genre || '' };
  const data = await readData();
  data.books.push(newBook);
  await writeData(data);
  res.status(201).json(newBook);
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;
  const data = await readData();
  const index = data.books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  if (title) data.books[index].title = title;
  if (author) data.books[index].author = author;
  if (year) data.books[index].year = year;
  if (genre) data.books[index].genre = genre;

  await writeData(data);
  res.json(data.books[index]);
}

async function deleteBook(req, res) {
  const { id } = req.params;
  const data = await readData();
  const index = data.books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const deleted = data.books.splice(index, 1)[0];
  await writeData(data);
  res.json({ message: 'Deleted', book: deleted });
}

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };

