const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Gemini API key not set in environment");
}

// प्राथमिक मॉडल + fallback
const MODELS = [
  "gemini-2.0-flash"
];

/**
 * Create API URL dynamically
 */
function getApiUrl(model) {
  return `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

/**
 * Core Gemini request handler with retry + fallback
 */
async function callGemini(prompt, options = {}) {
  const {
    temperature = 0.2,
    maxTokens = 2048,
    timeout = 15000,
    retries = 2
  } = options;

  let lastError;

  for (const model of MODELS) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(getApiUrl(model), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens,
            },
          }),
        });

        if (!response.ok) {
          let errText;
          try {
            errText = JSON.stringify(await response.json());
          } catch {
            errText = response.statusText;
          }

          throw new Error(`Model ${model} failed: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error(`Empty response from ${model}`);

        return text;

      } catch (err) {
        lastError = err;

        if (err.name === "AbortError") {
          console.warn(`⏱ Timeout on ${model}, attempt ${attempt + 1}`);
        } else {
          console.warn(`⚠️ ${err.message}`);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }

  throw new Error("All Gemini models failed:\n" + lastError);
}

/**
 * Safe JSON parser (handles markdown-wrapped JSON)
 */
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON response:\n" + text);
  }
}

/**
 * ===============================
 * ✅ CODE FEEDBACK FUNCTION
 * ===============================
 */
export async function getCodeFeedback(code, language = "plain text") {
  if (!code) throw new Error("Code is required");

  const prompt = `
You are a senior code reviewer.

Analyze the following ${language} code and provide:
- Issues
- Improvements
- Best practices
- Performance suggestions

Keep it concise and practical.

CODE:
${code}
`;

  return await callGemini(prompt, {
    temperature: 0.3,
    maxTokens: 1024,
  });
}

/**
 * ===============================
 * ✅ RESUME ANALYZER FUNCTION
 * ===============================
 */
export async function analyzeResume(role, jobDescription = "", resumeText) {
  if (!role || !resumeText) {
    throw new Error("Role and resumeText are required");
  }

  const prompt = `
You are an ATS resume analyzer.

Return ONLY valid JSON.

INPUT:
ROLE: ${role}
JOB DESCRIPTION: ${jobDescription || "N/A"}
RESUME:
${resumeText}

OUTPUT FORMAT:
{
  "atsScore": number,
  "missingKeywords": [],
  "addedKeywords": [],
  "issues": [],
  "suggestions": [],
  "optimizedResume": ""
}

RULES:
- No markdown
- No explanations
- No extra text
- Do not hallucinate fake experience
`;

  const resultText = await callGemini(prompt, {
    temperature: 0.2,
    maxTokens: 2048,
  });

  return safeJsonParse(resultText);
}