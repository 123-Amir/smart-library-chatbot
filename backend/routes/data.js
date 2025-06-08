const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Path to data.json
const dataFile = path.join(__dirname, '../data/data.json');

// GET /api/data
router.get('/', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Failed to read data.json' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      console.error('Invalid JSON format:', e);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

module.exports = router;
