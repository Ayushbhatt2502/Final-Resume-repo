import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
  GEMINI_API_KEY;

export async function getCodeFeedback(code, language = "plain text") {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key not set in environment");
  const prompt = `You are an expert code reviewer. Please provide constructive feedback, suggestions, and improvements for the following code.\nLanguage: ${language}\n\nCode:\n${code}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
  };
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Gemini API error: " + response.statusText);
  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated."
  );
}
