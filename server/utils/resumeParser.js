import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import fs from "fs";
import mammoth from "mammoth";
import nlp from "compromise";
import Tesseract from "tesseract.js";


const SECTION_ALIASES = {
  experience: [
    "experience",
    "work experience",
    "employment",
    "professional experience",
  ],
  education: ["education", "academics", "academic background"],
  skills: ["skills", "technical skills", "core skills", "key skills"],
  projects: ["projects", "project experience"],
  summary: ["summary", "profile", "objective"],
};


const SKILL_KEYWORDS = [
  "javascript",
  "typescript",
  "react",
  "node.js",
  "node",
  "express",
  "mongodb",
  "postgresql",
  "mysql",
  "html",
  "css",
  "tailwind",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "go",
  "rust",
  "django",
  "flask",
  "fastapi",
  "spring",
  "next.js",
  "redux",
  "graphql",
  "rest",
  "api",
  "aws",
  "gcp",
  "azure",
  "docker",
  "kubernetes",

  "git",
];

const normalizeText = (text) =>
  text
    .replace(/\t/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[•·■●]/g, "•")
    .replace(/\s{2,}/g, " ")
    .replace(/\r?\n{3,}/g, "\n\n")
    .trim();

const extractName = (text) => {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return "Anonymous";
  return lines[0].trim().substring(0, 50);
};

const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : "";
};

const extractPhone = (text) => {
  const match = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  return match ? match[0] : "";
};

const buildSectionIndex = (text) => {
  const lower = text.toLowerCase();
  const headings = Object.values(SECTION_ALIASES).flat();
  const matches = [];
  for (const heading of headings) {
    const regex = new RegExp(`(^|\\n)\\s*${heading}\\s*(:)?\\s*(\\n|$)`, "i");
    const match = regex.exec(lower);
    if (match) {
      matches.push({ heading, index: match.index });
    }
  }
  return matches.sort((a, b) => a.index - b.index);
};

const extractSection = (text, sectionKey) => {
  const matches = buildSectionIndex(text);
  if (!matches.length) return "";

  const aliases = SECTION_ALIASES[sectionKey] || [];
  const current = matches.find((m) => aliases.includes(m.heading));
  if (!current) return "";

  const idx = matches.indexOf(current);
  const start = current.index + current.heading.length;
  const end = idx < matches.length - 1 ? matches[idx + 1].index : text.length;

  return text.substring(start, end).trim();
};

const extractSkills = (text) => {
  const lower = text.toLowerCase();
  const found = new Set();
  for (const skill of SKILL_KEYWORDS) {
    if (lower.includes(skill)) {
      found.add(skill);
    }
  }
  return Array.from(found).slice(0, 30);
};

const extractExperience = (text) => {
  const section = extractSection(text, "experience");
  return section.replace(/^[a-zA-Z]\s*\n/, "").trim();
};

const extractEducation = (text) => {
  const section = extractSection(text, "education");
  return section.replace(/^[a-zA-Z]\s*\n/, "").trim();
};

const computeAtsScore = ({
  name,
  email,
  phone,
  skills,
  experience,
  education,
  rawText,
}) => {
  const breakdown = {
    contact: 0,
    skills: 0,
    experience: 0,
    education: 0,
    keywords: 0,
    length: 0,
  };

  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  const hasMetrics = /\b\d+%|\b\d{1,3}[,.]?\d{0,2}\b/.test(experience);
  const bulletCount = (experience.match(/•/g) || []).length;
  const sectionCoverage =
    (name ? 1 : 0) +
    (email ? 1 : 0) +
    (phone ? 1 : 0) +
    (skills.length ? 1 : 0) +
    (experience ? 1 : 0) +
    (education ? 1 : 0);

  const actionVerbs = [
    "built",
    "designed",
    "developed",
    "implemented",
    "optimized",
    "led",
    "improved",
    "created",
    "managed",
    "delivered",
    "deployed",
    "engineered",
    "analyzed",
    "automated",
  ];
  const actionVerbHits = actionVerbs.filter((v) =>
    new RegExp(`\\b${v}\\b`, "i").test(experience),
  ).length;
  const actionVerbScore = Math.min(15, actionVerbHits * 3);

  const dateHits = (experience.match(/\b(20\d{2}|19\d{2})\b/g) || []).length;
  const hasDateRanges =
    /\b(20\d{2}|19\d{2})\s*[–-]\s*(20\d{2}|present|current)\b/i.test(
      experience,
    );
  const dateScore = Math.min(
    10,
    dateHits >= 2 || hasDateRanges ? 10 : dateHits >= 1 ? 6 : 2,
  );

  const impactScore = hasMetrics ? 15 : 6;
  const bulletScore = bulletCount >= 6 ? 10 : bulletCount >= 3 ? 7 : 4;

  const formattingIssues = {
    tablesOrColumns: /\|.+\|/.test(rawText) ? 1 : 0,
    headersFooters: /(page \d+ of \d+)/i.test(rawText) ? 1 : 0,
    fancyBullets: /[◦▪■□◆]/.test(rawText) ? 1 : 0,
    imagesOrIcons: /(icon|logo|image|graphic)/i.test(rawText) ? 1 : 0,
  };
  const formattingIssueCount = Object.values(formattingIssues).reduce(
    (a, b) => a + b,
    0,
  );

  breakdown.contact = (name ? 5 : 0) + (email ? 5 : 0) + (phone ? 5 : 0);

  breakdown.skills = Math.min(skills.length, 15);
  breakdown.experience = experience ? 15 : 0;
  breakdown.education = education ? 10 : 0;
  breakdown.keywords = Math.min(skills.length * 2, 20);

  if (wordCount >= 250 && wordCount <= 900) {
    breakdown.length = 10;
  } else if (wordCount >= 150) {
    breakdown.length = 6;
  } else {
    breakdown.length = 2;
  }

  const score =
    breakdown.contact +
    breakdown.skills +
    breakdown.experience +
    breakdown.education +
    breakdown.keywords +
    breakdown.length;

  const repetitionIssues = (() => {
    const words = rawText.toLowerCase().match(/[a-z]{3,}/g) || [];
    const counts = new Map();
    for (const w of words) {
      counts.set(w, (counts.get(w) || 0) + 1);
    }
    const top = Array.from(counts.values()).sort((a, b) => b - a)[0] || 0;
    if (top > 20) return 2;
    if (top > 14) return 1;
    return 0;
  })();

  const spellingIssues = (() => {
    const common = ["teh", "recieve", "definately", "seperated", "occured"]
    const lower = rawText.toLowerCase();
    const found = common.filter((w) => lower.includes(w));
    return found.length ? 1 : 0;
  })();

  const contentIssues = {
    parseRate: sectionCoverage >= 4 ? 0 : 1,
    quantifyingImpact: hasMetrics ? 0 : 1,
    repetition: repetitionIssues,
    spellingGrammar: spellingIssues,
  };

  const issues =
    contentIssues.parseRate +
    contentIssues.quantifyingImpact +
    contentIssues.repetition +
    contentIssues.spellingGrammar;

  const contentScore = Math.min(
    100,
    Math.round(
      ((contentIssues.parseRate ? 20 : 30) +
        (contentIssues.quantifyingImpact ? 10 : 20) +
        (contentIssues.repetition ? 10 : 20) +
        (contentIssues.spellingGrammar ? 10 : 20) +
        Math.min(actionVerbScore, 10)) *
      1,
    ),
  );

  const sectionsScore =
    sectionCoverage >= 6
      ? 100
      : sectionCoverage >= 5
        ? 85
        : sectionCoverage >= 4
          ? 70
          : 55;

  const essentialsScore = Math.min(100, Math.round(score));
  const formattingScore = Math.max(60, 100 - formattingIssueCount * 10);

  const tailoringScore = null;

  return {
    score: Math.min(
      100,
      Math.round(
        contentScore * 0.3 +
        sectionsScore * 0.2 +
        essentialsScore * 0.35 +
        formattingScore * 0.15,
      ),
    ),
    issues,
    content: contentScore,
    sections: sectionsScore,
    essentials: essentialsScore,
    formatting: formattingScore,
    tailoring: tailoringScore,
    breakdown,
    contentIssues,
    signals: {
      wordCount,
      bulletCount,
      hasMetrics,
      actionVerbHits,
      dateHits,
      formattingIssues,
      formattingIssueCount,
    },
  };
};


export const extractResumeData = async ({ filePath, mimeType }) => {
  const debugLog = (msg) => {
    fs.appendFileSync("debug_parser.log", `[${new Date().toISOString()}] ${msg}\n`);
  };

  let rawText = "";
  debugLog(`Starting extraction for ${filePath} (${mimeType})`);

  const isPdf = mimeType === "application/pdf" || filePath.toLowerCase().endsWith(".pdf");
  const isDocx = mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || filePath.toLowerCase().endsWith(".docx");
  const isText = mimeType.startsWith("text/") || filePath.toLowerCase().endsWith(".txt") || filePath.toLowerCase().endsWith(".tex");
  const isImage = mimeType.startsWith("image/");

  if (isPdf) {
    const buffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(buffer);
      rawText = data.text || "";
      debugLog(`PDF parsed, length: ${rawText.length}`);
    } catch (err) {
      debugLog(`PDF error: ${err.message}`);
      rawText = "";
    }
  } else if (isDocx) {
    const result = await mammoth.extractRawText({ path: filePath });
    rawText = result.value || "";
    debugLog(`DOCX parsed, length: ${rawText.length}`);
  } else if (isText) {
    rawText = fs.readFileSync(filePath, "utf-8");
    debugLog(`Text file parsed, length: ${rawText.length}`);
  } else if (isImage) {
    const { data: { text } } = await Tesseract.recognize(filePath, "eng");
    rawText = text || "";
    debugLog(`OCR parsed, length: ${rawText.length}`);
  }

  const normalized = normalizeText(rawText);
  debugLog(`Normalized length: ${normalized.length}`);
  const parsed = {
    name: extractName(normalized),
    email: extractEmail(normalized),
    phone: extractPhone(normalized),
    skills: extractSkills(normalized),
    experience: extractExperience(normalized),
    education: extractEducation(normalized),
  };


  let finalScore = computeAtsScore({ ...parsed, rawText: normalized }).score;

  return {
    ...parsed,
    atsScore: finalScore,
    rawText: normalized,
  };
};
