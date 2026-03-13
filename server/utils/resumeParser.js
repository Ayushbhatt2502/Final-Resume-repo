import fs from "fs";
import pdfParse from "pdf-parse";
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

  const currentIdx = matches.indexOf(current);
  const start = current.index + current.heading.length;
  
  const corpus = section || text;
  const lower = corpus.toLowerCase();

  const found = new Set();
  for (const skill of SKILL_KEYWORDS) {
    if (lower.includes(skill)) {
      found.add(skill);
    }
  }

  const doc = nlp(corpus);
  const entities = doc
    .match("#Technology+")
    .out("array")
    .map((s) => s.toLowerCase().trim());
  for (const entity of entities) {
    if (entity.length > 1) {
      found.add(entity);
    }
  }

  const normalizeSkill = (skill) => {
    const s = skill.trim().toLowerCase();
    if (!s) return "";
    if (s === "node" || s === "node.js" || s === "nodejs") return "Node.js";
    if (s === "react") return "React";
    if (s === "python") return "Python";
    if (s === "javascript" || s === "js") return "JavaScript";
    if (s === "typescript" || s === "ts") return "TypeScript";
    if (s === "html") return "HTML";
    if (s === "css") return "CSS";
    if (s === "aws") return "AWS";
    if (s === "gcp") return "GCP";
    if (s === "mongodb") return "MongoDB";
    if (s === "postgresql" || s === "postgres") return "PostgreSQL";
    if (s === "mysql") return "MySQL";
    if (s === "sql") return "SQL";
    if (s === "git") return "Git";
    if (s === "linux") return "Linux";
    if (s === "django") return "Django";
    if (s === "flask") return "Flask";
    if (s === "express") return "Express";
    if (s === "rest" || s === "rest api" || s === "apis" || s === "api")
      return "REST APIs";
    if (s === "ml" || s === "machine learning") return "Machine Learning";
    if (s === "scikit-learn" || s === "sklearn") return "Scikit-learn";
    if (s === "numpy") return "NumPy";
    if (s === "pandas") return "Pandas";
    if (s === "c") return "C";
    if (s === "java") return "Java";
    if (s === "go") return "Go";
    return s.length <= 24 ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  };

  const normalized = Array.from(found).map(normalizeSkill).filter(Boolean);

  const unique = Array.from(new Set(normalized));
  return unique.slice(0, 40);
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


import { getCodeFeedback } from "./gemini.js";
export const extractResumeData = async ({ filePath, mimeType }) => {
  let rawText = "";
  if (mimeType === "application/pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    rawText = data.text || "";
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    rawText = result.value || "";
  } else if (
    mimeType === "image/jpeg" ||
    mimeType === "image/png" ||
    mimeType === "image/jpg" ||
    mimeType === "image/bmp" ||
    mimeType === "image/gif" ||
    mimeType === "image/webp" ||
    mimeType === "image/tiff"
  ) {

    const {
      data: { text },
    } = await Tesseract.recognize(filePath, "eng");
    rawText = text || "";
  } else {
    rawText = "";
  }

  const normalized = normalizeText(rawText);
  const parsed = {
    name: extractName(normalized),
    email: extractEmail(normalized),
    phone: extractPhone(normalized),
    skills: extractSkills(normalized),
    experience: extractExperience(normalized),
    education: extractEducation(normalized),
  };

  
  let geminiFeedback = "";
  let geminiScore = null;
  let algoScore = computeAtsScore({ ...parsed, rawText: normalized }).score;
  try {
    
    const prompt = `You are an expert ATS resume reviewer. Carefully analyze the resume below and provide:
1. A realistic ATS score (0-100) based on section coverage, skills, formatting, and overall quality.
2. Actionable feedback for improvement.
3. Brief reasoning for the score.
Resume:
${normalized}

Respond ONLY in this format:
ATS Score: <number>
Reason: <short reasoning>
Feedback: <suggestions>`;
    geminiFeedback = await getCodeFeedback(prompt, "resume");
    
    const scoreMatch = geminiFeedback.match(/ATS Score\s*[:\-]?\s*(\d{1,3})/i);
    if (scoreMatch) {
      geminiScore = Math.max(0, Math.min(100, parseInt(scoreMatch[1])));
    }
  } catch (err) {
    geminiFeedback = "Gemini feedback unavailable.";
  }

  
  let finalScore;
  if (geminiScore !== null) {
    
    finalScore = Math.round(geminiScore * 0.6 + algoScore * 0.4);
  } else {
    finalScore = algoScore;
  }

  return {
    ...parsed,
    atsScore: finalScore,
    geminiFeedback,
  };
};
