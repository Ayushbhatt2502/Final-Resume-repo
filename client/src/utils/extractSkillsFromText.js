// Extract skills from a text (e.g., job description) using a keyword list
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
  "linux",
  "firebase",
  "redis",
  "pandas",
  "numpy",
  "scikit-learn",
  "tensorflow",
  "pytorch",
  "ml",
  "nlp",
  "spacy",
  "sql",
  "ci/cd",
  "jest",
  "pytest",
  "selenium",
];

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

export default function extractSkillsFromText(text) {
  const lower = text.toLowerCase();
  const found = new Set();
  for (const skill of SKILL_KEYWORDS) {
    if (lower.includes(skill)) {
      found.add(skill);
    }
  }
  // Optionally: add more advanced extraction here
  const normalized = Array.from(found).map(normalizeSkill).filter(Boolean);
  return Array.from(new Set(normalized));
}
