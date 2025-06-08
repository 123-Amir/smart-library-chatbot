async function handleBotReply(message) {
  try {
    const msg = message.toLowerCase();
    const BASE_URL = "https://smart-library-chatbot.onrender.com";

    const res = await fetch(`${BASE_URL}/api/tutorials`);
    const tutorials = await res.json();

    // WhatsApp tutorial
    if (msg.includes('whatsapp') || msg.includes('photo')) {
      const wa = tutorials.find(t => t.tool.toLowerCase() === 'whatsapp');
      if (wa) {
        addMessage(`📸 How to send photo on WhatsApp:\n${wa.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // Google Maps tutorial
    if (msg.includes('google maps') || msg.includes('map')) {
      const maps = tutorials.find(t => t.tool.toLowerCase() === 'google maps');
      if (maps) {
        addMessage(`🗺️ How to use Google Maps:\n${maps.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // Paytm tutorial
    if (msg.includes('paytm')) {
      const paytm = tutorials.find(t => t.tool.toLowerCase() === 'paytm');
      if (paytm) {
        addMessage(`💰 How to use Paytm:\n${paytm.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // Fallback default message
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






