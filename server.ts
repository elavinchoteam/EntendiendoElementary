import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // API Route for AI Feedback
  app.post('/api/ai-feedback', async (req, res) => {
    try {
      const { studentText, attempt, prompt: clientPrompt, exerciseId, storyContext } = req.body;
      if (!studentText || typeof studentText !== 'string') {
        return res.status(400).json({ error: 'studentText is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const assignmentPrompt =
            clientPrompt ||
            `Your company sells a music magazine called 'Rock City.' This month there is a sale: the magazine costs less if you buy more, and it comes with a free CD. Write a telephone ad. What's the magazine about? How much does it usually cost? How much is it now? What is your telephone number? Write the ad and send it to your teacher.`;

          const contextInfo = storyContext ? `\nStory Context:\n${storyContext}\n` : '';

          const systemInstruction = `You are a helpful, encouraging ESL teacher evaluating an elementary English student's writing assignment.
The student had to complete this writing prompt:
"${assignmentPrompt}"
${contextInfo}
Evaluate the student's submission (Attempt ${attempt || 1}):
"${studentText}"

Return JSON strictly matching this schema:
{
  "stars": 1, 2, or 3,
  "scoreSummaryEn": "One sentence summary of the evaluation",
  "scoreSummaryEs": "Traducción al español de la evaluación",
  "strengthsEn": "What the student did well (in English)",
  "strengthsEs": "Puntos fuertes en español",
  "correctionsEn": "Specific grammar, vocabulary or requirement corrections (in English)",
  "correctionsEs": "Correcciones y recomendaciones en español",
  "improvementsEn": "Suggestions to improve the writing response (in English)",
  "improvementsEs": "Sugerencias de mejora en español",
  "suggestedAdEn": "A model answer or model text in English (3-4 sentences)",
  "suggestedAdEs": "Traducción al español del texto modelo sugerido"
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: systemInstruction,
            config: {
              responseMimeType: 'application/json',
            },
          });

          const raw = response.text?.trim();
          if (raw) {
            const parsed = JSON.parse(raw);
            return res.json({ success: true, feedback: parsed });
          }
        } catch (apiErr) {
          console.warn('Gemini API call warning (falling back to pedagogical rules):', apiErr);
        }
      }

      return res.json({ success: false, message: 'Fallback to client evaluation' });
    } catch (err) {
      console.error('Server error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
