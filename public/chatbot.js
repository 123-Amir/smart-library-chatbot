async function handleBotReply(message) {
  try {
    const msg = message.toLowerCase();
    const BASE_URL = "https://smart-library-chatbot.onrender.com";

    // --- Show Book List ---
    if (msg.includes("books") || msg.includes("book list")) {
      const res = await fetch(`${BASE_URL}/api/books`);
      const books = await res.json();

      if (books.length > 0) {
        const bookList = books
          .map((book, i) => `${i + 1}. ${book.title} – by ${book.author}`)
          .join("\n");
        addMessage(`📚 Available Books:\n${bookList}`);
      } else {
        addMessage("📚 No books found.");
      }
      return;
    }

    // --- Tutorials: WhatsApp ---
    if (msg.includes("whatsapp") || msg.includes("photo")) {
      const res = await fetch(`${BASE_URL}/api/tutorials`);
      const tutorials = await res.json();
      const wa = tutorials.find(t => t.tool.toLowerCase() === "whatsapp");

      if (wa) {
        addMessage(`📸 How to send photo on WhatsApp:\n${wa.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
        return;
      }
    }

    // --- Tutorials: Google Maps ---
    if (msg.includes("google maps") || msg.includes("map")) {
      const res = await fetch(`${BASE_URL}/api/tutorials`);
      const tutorials = await res.json();
      const maps = tutorials.find(t => t.tool.toLowerCase() === "google maps");

      if (maps) {
        addMessage(`🗺️ How to use Google Maps:\n${maps.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
        return;
      }
    }

    // --- Tutorials: Paytm ---
    if (msg.includes("paytm") && (msg.includes("send") || msg.includes("money") || msg.includes("recharge") || msg.includes("use"))) {
      const res = await fetch(`${BASE_URL}/api/tutorials`);
      const tutorials = await res.json();
      const paytm = tutorials.find(t => t.tool.toLowerCase() === "paytm");

      if (paytm) {
        addMessage(`💰 How to use Paytm:\n${paytm.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
        return;
      }
    }

    // --- FAQs: Paytm ---
    if (msg.includes("paytm") && !msg.includes("send") && !msg.includes("money") && !msg.includes("recharge") && !msg.includes("use")) {
      const res = await fetch(`${BASE_URL}/api/faqs`);
      const faqs = await res.json();
      const paytm = faqs.find(f => f.question.toLowerCase().includes("paytm"));

      if (paytm) {
        addMessage(`📖 FAQ:\nQ: ${paytm.question}\nA: ${paytm.answer}`);
        return;
      }
    }

    // --- Default fallback ---
    addMessage("🤖 I can help with WhatsApp, Paytm, Google Maps, and show book list.\nTry asking:\n• How to send money using Paytm?\n• WhatsApp photo tutorial\n• Use Google Maps\n• Show me book list");

  } catch (err) {
    console.error(err);
    addMessage("⚠️ Oops! Something went wrong.");
  }
}




