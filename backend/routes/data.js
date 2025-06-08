const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../data/data.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load data' });
    }

    try {
      const data = JSON.parse(jsonData);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

module.exports = router;
