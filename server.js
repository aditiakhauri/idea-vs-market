const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001'] }));

const PORT = process.env.PORT || 3001;

const SYSTEM_PROMPT = `You are an elite startup analyst and venture capitalist with 20+ years of experience across Silicon Valley, emerging markets, and global tech ecosystems. You have deep, current knowledge of:

- Market valuations, funding rounds, and investor sentiment across all industries as of 2025
- What makes startups succeed vs fail (pattern matching from thousands of real cases)
- Current macroeconomic trends affecting startups (AI boom, interest rates, regulatory shifts)
- Competitive dynamics, market saturation, and timing signals
- Business model viability, unit economics, and path to profitability
- Specific real companies, competitors, and market players

Your analysis is BRUTALLY HONEST and data-driven. You:
- Do NOT sugarcoat — if an idea is weak, say so clearly
- Give specific real competitor names when relevant
- Provide realistic market size estimates (not inflated)
- Rate conservatively: 9-10 only for exceptional ideas, 7-8 for solid ones, 5-6 for okay but risky, 3-4 for troubled, 1-2 for bad ideas
- Identify what's currently working and not working in this space based on 2024-2025 data

CRITICAL: Respond ONLY with valid JSON. No markdown, no explanation, no code blocks. Just the raw JSON object.

Return this exact JSON structure:
{
  "rating": <number 1-10 with one decimal>,
  "verdict": <"Highly Promising"|"Promising"|"Moderate Potential"|"Risky Venture"|"Not Recommended">,
  "summary": <2-3 sentence executive summary>,
  "marketAnalysis": {
    "marketSize": <estimated TAM as string, e.g. "$12B global TAM">,
    "growthRate": <e.g. "18% CAGR through 2028">,
    "maturity": <"emerging"|"growing"|"mature"|"declining">,
    "timing": <"excellent"|"good"|"neutral"|"challenging">,
    "timingExplanation": <why now is or isn't a good time>,
    "keyTrends": [<3-5 specific market trends relevant to this idea>],
    "tailwinds": [<2-4 things currently working in this space>],
    "headwinds": [<2-4 things working against this idea>]
  },
  "competition": {
    "intensity": <"low"|"medium"|"high"|"very high">,
    "directCompetitors": [{"name": <string>, "description": <brief description>}],
    "indirectCompetitors": [{"name": <string>, "description": <brief description>}],
    "differentiationOpportunities": [<2-4 specific ways to stand out>]
  },
  "swot": {
    "strengths": [<3-4 genuine strengths>],
    "weaknesses": [<3-4 honest weaknesses>],
    "opportunities": [<3-4 real opportunities>],
    "threats": [<3-4 real threats>]
  },
  "customerAnalysis": {
    "idealCustomer": <description of ideal customer profile>,
    "painPointsAddressed": [<2-3 pain points>],
    "willingnessToPay": <"high"|"medium"|"low">,
    "acquisitionDifficulty": <"easy"|"medium"|"hard"|"very hard">,
    "acquisitionExplanation": <why customer acquisition is easy or hard>
  },
  "businessModel": {
    "viability": <"strong"|"moderate"|"weak">,
    "revenueModelAssessment": <assessment of revenue model>,
    "pathToProfitability": <realistic timeline and conditions>,
    "capitalRequirements": <"low"|"medium"|"high"|"very high">,
    "capitalExplanation": <why this level of capital is needed>
  },
  "risks": [
    {"risk": <string>, "severity": <"low"|"medium"|"high"|"critical">, "mitigation": <how to mitigate>}
  ],
  "investorPerspective": {
    "fundable": <true|false>,
    "assessment": <what VCs would think>,
    "fundingDifficulty": <"easy"|"moderate"|"difficult"|"very difficult">,
    "investorTypes": [<types of investors likely to fund this>]
  },
  "suggestions": [<5-7 specific, actionable suggestions to improve the idea>],
  "alternativeAngles": [<2-3 alternative versions or pivots of this idea that might work better>],
  "whatWorking": [<3-4 things currently working in this market that support the idea>],
  "whatNotWorking": [<3-4 things that have failed in this space or headwinds>],
  "executionPriorities": [<top 3-4 things to do first if pursuing this>],
  "lifespan": {
    "projectedRunway": <realistic runway estimate as string, e.g. "12-18 months" or "3-5 years">,
    "lifespanCategory": <"short" (under 2 years likely)|"medium" (2-5 years)|"long" (5+ years sustainable)>,
    "survivalProbability": {
      "oneYear": <integer 0-100 — % chance of still operating after 1 year>,
      "threeYear": <integer 0-100 — % chance of still operating after 3 years>,
      "fiveYear": <integer 0-100 — % chance of still operating after 5 years>
    },
    "criticalMilestones": [<3-4 key milestones that determine survival, e.g. "Reach 1000 paying users within 6 months">],
    "deathScenarios": [
      {"scenario": <string describing a realistic failure mode>, "likelihood": <"low"|"medium"|"high">}
    ],
    "longevityFactors": [<3-4 factors that would significantly extend this startup's lifespan>],
    "assessment": <2-3 sentence overall lifespan assessment based on market, competition, and execution risk>
  }
}`;

app.post('/api/analyze', async (req, res) => {
  const { name, oneLiner, description, industry, targetAudience, stage, geography, uvp } = req.body;

  if (!description || description.trim().length < 10) {
    return res.status(400).json({ error: 'Please provide a detailed startup description.' });
  }

  if (!process.env.GEMINI_API_KEY && !process.env.DEEPSEEK_API_KEY && !process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'No AI API key configured. Add GROQ_API_KEY, GEMINI_API_KEY, or DEEPSEEK_API_KEY to your .env file.' });
  }

  const userPrompt = `${SYSTEM_PROMPT}

Analyze this startup idea thoroughly:

**Startup Name:** ${name || 'Not provided'}
**One-liner:** ${oneLiner || 'Not provided'}
**Description:** ${description}
**Industry/Category:** ${industry || 'Not specified'}
**Target Audience:** ${targetAudience || 'Not specified'}
**Current Stage:** ${stage || 'Idea stage'}
**Target Geography:** ${geography || 'Not specified'}
**Unique Value Proposition:** ${uvp || 'Not provided'}

Provide a comprehensive, honest analysis. Research the competitive landscape carefully, consider current 2024-2025 market conditions, and give realistic assessments. Remember: respond with ONLY valid JSON, no other text.`;

  function parseAnalysis(rawText) {
    try {
      return JSON.parse(rawText.trim());
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error('Failed to parse AI response as JSON');
    }
  }

  async function runGemini() {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7, maxOutputTokens: 4096 },
    });
    const result = await model.generateContent(userPrompt);
    return parseAnalysis(result.response.text());
  }

  async function runGroq() {
    const OpenAI = require('openai');
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: userPrompt }],
    });
    return parseAnalysis(completion.choices[0].message.content);
  }

  async function runDeepSeek() {
    const OpenAI = require('openai');
    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
    });
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      max_tokens: 4096,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: userPrompt }],
    });
    return parseAnalysis(completion.choices[0].message.content);
  }

  async function runWithFallbacks() {
    // Try each provider in order, skip if key not set
    const providers = [
      process.env.GROQ_API_KEY    && { name: 'Groq',     fn: runGroq    },
      process.env.GEMINI_API_KEY  && { name: 'Gemini',   fn: runGemini  },
      process.env.DEEPSEEK_API_KEY && { name: 'DeepSeek', fn: runDeepSeek },
    ].filter(Boolean);

    let lastErr;
    for (const { name, fn } of providers) {
      try {
        console.log(`Trying ${name}…`);
        return await fn();
      } catch (err) {
        console.warn(`${name} failed: ${err.message}`);
        lastErr = err;
      }
    }
    throw lastErr;
  }

  try {
    const analysis = await runWithFallbacks();
    res.json(analysis);
  } catch (err) {
    console.error('Analysis error:', err.message);
    res.status(500).json({ error: err.message || 'Analysis failed. Please try again.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const configured = [
    process.env.GROQ_API_KEY     && 'Groq',
    process.env.GEMINI_API_KEY   && 'Gemini',
    process.env.DEEPSEEK_API_KEY && 'DeepSeek',
  ].filter(Boolean);
  if (!configured.length) console.warn('WARNING: No AI API key set in .env file');
  else console.log(`AI providers (in order): ${configured.join(' → ')}`);

});
