const { readData, writeData, generateId, findById } = require('../utils/fileUtils');

// 🔹 GET all FAQs
async function getAllFaqs(req, res) {
  const data = await readData();
  res.json(data.faqs || []);
}

// 🔹 GET single FAQ by ID
async function getFaqById(req, res) {
  const { id } = req.params;
  const data = await readData();
  const faq = findById(data.faqs, id);

  if (!faq) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  res.json(faq);
}

// 🔹 CREATE new FAQ
async function addFaq(req, res) {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and Answer are required' });
  }

  const newFaq = {
    id: generateId(),
    question,
    answer
  };

  const data = await readData();
  data.faqs.push(newFaq);
  await writeData(data);

  res.status(201).json(newFaq);
}

// 🔹 UPDATE existing FAQ by ID
async function updateFaq(req, res) {
  const { id } = req.params;
  const { question, answer } = req.body;

  const data = await readData();
  const index = data.faqs.findIndex(faq => faq.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  if (question) data.faqs[index].question = question;
  if (answer) data.faqs[index].answer = answer;

  await writeData(data);
  res.json(data.faqs[index]);
}

// 🔹 DELETE FAQ by ID
async function deleteFaq(req, res) {
  const { id } = req.params;
  const data = await readData();
  const index = data.faqs.findIndex(faq => faq.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  const deleted = data.faqs.splice(index, 1)[0];
  await writeData(data);
  res.json({ message: 'FAQ deleted', faq: deleted });
}

module.exports = {
  getAllFaqs,
  getFaqById,
  addFaq,
  updateFaq,
  deleteFaq
};

