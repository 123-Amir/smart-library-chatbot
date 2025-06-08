async function handleBotReply(message) {
  try {
    const msg = message.toLowerCase();
    const BASE_URL = "https://smart-library-chatbot.onrender.com";

    const res = await fetch(`${BASE_URL}/api/data`);
    const data = await res.json();

    // Tutorials
    const tutorials = data.tutorials;
    const faqs = data.faqs;

    // WhatsApp Photo Tutorial
    if (msg.includes('whatsapp') && msg.includes('photo')) {
      const wa = tutorials.find(t => t.tool.toLowerCase() === 'whatsapp');
      if (wa) {
        addMessage(`📸 WhatsApp Photo Tutorial:\n${wa.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // Google Maps Tutorial
    if (msg.includes('google maps') || msg.includes('map')) {
      const gm = tutorials.find(t => t.tool.toLowerCase() === 'google maps');
      if (gm) {
        addMessage(`🗺️ Google Maps Tutorial:\n${gm.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // Paytm Usage
    if (msg.includes('paytm') && (msg.includes('send') || msg.includes('money') || msg.includes('recharge') || msg.includes('use'))) {
      const ptm = tutorials.find(t => t.tool.toLowerCase() === 'paytm');
      if (ptm) {
        addMessage(`💰 Paytm Tutorial:\n${ptm.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // FAQs (optional)
    if (msg.includes('whatsapp') || msg.includes('paytm') || msg.includes('upi') || msg.includes('location') || msg.includes('google maps')) {
      const foundFaq = faqs.find(f => msg.includes(f.question.toLowerCase().split(' ')[0]));
      if (foundFaq) {
        addMessage(`❓ ${foundFaq.question}\n✅ ${foundFaq.answer}`);
        return;
      }
    }

    // Fallback
    addMessage("🤖 I can help with WhatsApp, Paytm, and Google Maps.\nTry asking things like:\n• How to send money using Paytm?\n• WhatsApp photo tutorial\n• Use Google Maps");

  } catch (err) {
    console.error(err);
    addMessage("⚠️ Oops! Something went wrong.");
  }
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(`🧑 You: ${message}`, "user");
  handleBotReply(message);
  input.value = "";
}

function addMessage(text, sender = "bot") {
  const chat = document.getElementById("chat-messages");
  const msgEl = document.createElement("div");
  msgEl.className = sender === "user" ? "user-msg" : "bot-msg";
  msgEl.innerText = text;
  chat.appendChild(msgEl);
  chat.scrollTop = chat.scrollHeight;
}







