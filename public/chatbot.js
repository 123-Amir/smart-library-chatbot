async function handleBotReply(message) {
  try {
    const msg = message.toLowerCase();

    // --- Tutorials: WhatsApp ---
    if (msg.includes('whatsapp') || msg.includes('photo')) {
      const res = await fetch('/api/tutorials');
      const tutorials = await res.json();
      const wa = tutorials.find(t => t.tool.toLowerCase() === 'whatsapp');

      if (wa) {
        addMessage(`📸 How to send photo on WhatsApp:\n${wa.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // --- Tutorials: Google Maps ---
    if (msg.includes('google maps') || msg.includes('map')) {
      const res = await fetch('/api/tutorials');
      const tutorials = await res.json();
      const maps = tutorials.find(t => t.tool.toLowerCase() === 'google maps');

      if (maps) {
        addMessage(`🗺️ How to use Google Maps:\n${maps.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // --- Tutorials: Paytm ---
    if (msg.includes('paytm') && (msg.includes('send') || msg.includes('money') || msg.includes('recharge') || msg.includes('use'))) {
      const res = await fetch('/api/tutorials');
      const tutorials = await res.json();
      const paytm = tutorials.find(t => t.tool.toLowerCase() === 'paytm');

      if (paytm) {
        addMessage(`💰 How to use Paytm:\n${paytm.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // --- FAQs: Paytm ---
    if (msg.includes('paytm') && !msg.includes('send') && !msg.includes('money') && !msg.includes('recharge') && !msg.includes('use')) {
      const res = await fetch('/api/faqs');
      const faqs = await res.json();
      const paytm = faqs.find(f => f.tool.toLowerCase() === 'paytm');

      if (paytm) {
        addMessage(`📱 ${paytm.tool} Info:\n${paytm.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`);
        return;
      }
    }

    // --- Default Fallback ---
    addMessage("🤖 I can help with WhatsApp, Paytm, and Google Maps.\nTry asking things like:\n• How to send money using Paytm?\n• WhatsApp photo tutorial\n• Use Google Maps");

  } catch (err) {
    addMessage("⚠️ Oops! Something went wrong.");
  }
}

