const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve frontend

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/tutorials', require('./routes/tutorials'));

// Frontend route (serves index.html if someone opens the app in browser)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

