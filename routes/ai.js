const express = require('express');
const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { messages } = req.body;
    const prompt = messages?.[0]?.content || "";

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000
        })
      }
    );

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences
    text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

    res.json({ content: [{ text }] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

module.exports = router;