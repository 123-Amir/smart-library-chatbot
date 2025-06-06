const { readData, writeData, generateId, findById } = require('../utils/fileUtils');

async function getAllTutorials(req, res) {
  const data = await readData();
  res.json(data.tutorials || []);
}

async function getTutorialById(req, res) {
  const { id } = req.params;
  const data = await readData();
  const tutorial = findById(data.tutorials, id);
  if (!tutorial) return res.status(404).json({ error: 'Tutorial not found' });
  res.json(tutorial);
}

async function addTutorial(req, res) {
  const { tool, steps } = req.body;
  if (!tool || !Array.isArray(steps)) return res.status(400).json({ error: 'Tool and steps[] required' });

  const data = await readData();
  const newTutorial = { id: generateId(), tool, steps };
  data.tutorials.push(newTutorial);
  await writeData(data);
  res.status(201).json(newTutorial);
}

async function updateTutorial(req, res) {
  const { id } = req.params;
  const { tool, steps } = req.body;
  const data = await readData();
  const index = data.tutorials.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Tutorial not found' });

  if (tool) data.tutorials[index].tool = tool;
  if (Array.isArray(steps)) data.tutorials[index].steps = steps;
  await writeData(data);
  res.json(data.tutorials[index]);
}

async function deleteTutorial(req, res) {
  const { id } = req.params;
  const data = await readData();
  const index = data.tutorials.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Tutorial not found' });

  const deleted = data.tutorials.splice(index, 1)[0];
  await writeData(data);
  res.json({ message: 'Deleted', tutorial: deleted });
}

module.exports = { getAllTutorials, getTutorialById, addTutorial, updateTutorial, deleteTutorial };

