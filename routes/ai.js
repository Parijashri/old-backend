const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set!');
      return res.status(500).json({ error: 'Server misconfigured: missing API key' });
    }

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
          max_tokens: 2000
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', response.status, errText);
      return res.status(502).json({ error: `Groq API error: ${response.status}` });
    }

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if present
    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    res.json({ result: text });

  } catch (err) {
    console.error('AI route error:', err);
    res.status(500).json({ error: 'AI request failed: ' + err.message });
  }
});

module.exports = router;
