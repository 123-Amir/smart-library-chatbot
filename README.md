Live : https://vercel.com/123-amirs-projects/smart-library-chatbot-a5gz
# 📚 Smart Digital Library Assistant (Chatbot + REST API)

A full-stack project combining a **RESTful Library/Inventory API** with a **Smart Chatbot Assistant** to promote digital literacy. Users can query how to use apps like **Paytm**, **WhatsApp**, and **Google Maps** via step-by-step tutorials and FAQs.

---

## 🚀 Features

### ✅ Backend (Node.js + Express)
- RESTful API with full **CRUD operations**
- Modular folder structure: `routes/`, `controllers/`, `utils/`, `data/`
- Uses a JSON file (`data.json`) to simulate a database
- Endpoints for:
  - `GET /api/books` – List all books
  - `POST /api/books` – Add a book
  - `PUT /api/books/:id` – Update a book
  - `DELETE /api/books/:id` – Delete a book
  - `GET /api/faqs` – Fetch FAQ data
  - `GET /api/tutorials` – Fetch step-by-step tutorial data

### 💬 Frontend (HTML + CSS + JS)
- Clean and responsive **Chatbot UI**
- Users can ask:
  - “How to send money using Paytm?”
  - “How to send photo on WhatsApp?”
  - “Google Maps tutorial?”
- Smart detection using **keyword-based logic**
- Data fetched from REST API dynamically
- Error handling and fallback messages

---

## 📦 Setup & Run

### ⚙️ Prerequisites
- Node.js (v16 or higher)

### 🔧 Installation

```bash
cd smart-library-chatbot/backend
npm install
node server.js

http://localhost:3000

📝 Author
Amir Hussain
B.Tech CSE, Birla Institute of Technology, Mesra
📧 amirhussainremba@gmail.com
📱 9334015417
