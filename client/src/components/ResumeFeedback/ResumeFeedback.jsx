import { useState, useRef } from "react";
import PaymentModal from "../PaymentModal";
import extractSkillsFromText from "../../utils/extractSkillsFromText";
import extractTextFromPDF from "../../utils/extractTextFromPDF";
import { motion, AnimatePresence } from "framer-motion";


// ─────────────────────────────────────────────
// Feedback Block
// ─────────────────────────────────────────────
const FeedbackBlock = ({ type, title, items, isLocked }) => {
  const colors = {
    best: "#22c55e",
    good: "#f59e0b",
    improve: "#ef4444",
  };
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative">
      <h4 className="font-bold mb-3 text-white" style={{ color: colors[type] }}>
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-gray-400">
        {items.map((item, i) => (
          <li key={i} className={isLocked && i >= 1 ? "blur-sm" : ""}>
            • {item}
          </li>
        ))}
      </ul>
      {isLocked && (
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-2xl" />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Score Ring
// ─────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-32 h-32">
      <svg className="-rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl">
        {score}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const ResumeFeedback = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [resumeSkills, setResumeSkills] = useState([]);
  const [jdSkills, setJdSkills] = useState([]);
  const [step, setStep] = useState("idle");
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallPlan, setPaywallPlan] = useState("basic");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [expandedBlock, setExpandedBlock] = useState(null); // 'best', 'good', 'improve', or null

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume file.");
      return;
    }
    setSubmitLoading(true);
    setStep("uploading");
    setTimeout(async () => {
      setStep("analyzing");
      setTimeout(async () => {
        setFeedback(mock);
        let resumeText = "";
        let resumeSkillArr = [];
        if (file.name.toLowerCase().endsWith(".pdf")) {
          try {
            resumeText = await extractTextFromPDF(file);
            resumeSkillArr = extractSkillsFromText(resumeText);
          } catch (err) {
            console.error("PDF extraction failed:", err);
            resumeText = file.name.replace(/[_\-.]/g, " ");
            resumeSkillArr = extractSkillsFromText(resumeText);
          }
        } else {
          resumeText = file.name.replace(/[_\-.]/g, " ");
          resumeSkillArr = extractSkillsFromText(resumeText);
        }
        setResumeSkills(resumeSkillArr);
        const jdSkillArr = extractSkillsFromText(jobDesc);
        setJdSkills(jdSkillArr);
        const result = compareSkills(jdSkillArr, resumeSkillArr);
        setMatchResult(result);
        setStep("done");
        setSubmitLoading(false);
      }, 2600);
    }, 900);
  };

  function compareSkills(jdSkillsArr, resumeSkillsArr) {
    const matched = jdSkillsArr.filter((skill) =>
      resumeSkillsArr.includes(skill),
    );
    const missing = jdSkillsArr.filter(
      (skill) => !resumeSkillsArr.includes(skill),
    );
    const matchPercent =
      jdSkillsArr.length > 0
        ? Math.round((matched.length / jdSkillsArr.length) * 100)
        : 0;
    return {
      matchedSkills: matched,
      missingSkills: missing,
      matchPercent,
    };
  }

  const mock = {
    score: 72,
    best: {
      title: "Strong Technical Skills Section",
      items: [
        "Well-structured skills with relevant technologies clearly listed.",
        "Good use of industry-standard ATS keywords throughout.",
        "Quantified achievements in work experience (e.g., 'Improved performance by 40%').",
        "Clear, professional contact information layout.",
      ],
    },
    good: {
      title: "Solid Work Experience Format",
      items: [
        "Consistent date formatting throughout the entire resume.",
        "Action verbs used effectively to start each bullet point.",
        "Education section is well-organized and easy to scan.",
        "File format (PDF) is ATS-compatible.",
      ],
    },
    improve: {
      title: "Critical Areas for Improvement",
      items: [
        "Summary/objective section is missing — add a 2–3 line professional summary.",
        "Some bullet points lack measurable impact — add numbers and percentages.",
        "Skills section uses generic terms — be more specific with tools and versions.",
        "No certifications section despite your technical background.",
      ],
    },
  };

  const subscription = "free";
  const canAccessFull = subscription !== "free";
  const openPaywall = (plan) => {
    setPaywallPlan(plan);
    setShowPaywall(true);
  };

  return (
    <div className="w-full">
      {/* Resume & Job Description Input */}
      <div
        className="mb-8 p-6 rounded-2xl"
        style={{
          background: "#10121a",
          border: "1px solid rgba(59,130,246,0.08)",
        }}
      >
        <h3 className="font-black text-lg text-white mb-2">
          Resume & Job Description
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full mb-2 p-2 rounded-lg bg-[#181b23] text-white border border-[#334155] focus:outline-none focus:border-blue-500"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <div className="text-xs text-green-400 mb-2">
                Selected: {file.name}
              </div>
            )}
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 rounded-lg text-sm bg-[#181b23] text-white border border-[#334155] focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Paste the job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
        </div>
        <button
          className="mt-4 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
            boxShadow: "0 0 24px rgba(37,99,235,0.25)",
          }}
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          {submitLoading ? "Analyzing..." : "Submit & Analyze"}
        </button>

        {matchResult &&
          (matchResult.matchedSkills.length > 0 ||
            matchResult.missingSkills.length > 0) && (
            <div className="mt-6 p-4 rounded-xl bg-[#181b23] border border-[#334155]">
              {matchResult.matchPercent > 0 && (
                <div className="mb-2 text-white font-black text-base">
                  Match Percentage:{" "}
                  <span className="text-blue-400">
                    {matchResult.matchPercent}%
                  </span>
                </div>
              )}
              <div className="mb-1 text-green-400">
                ✅ Matched Skills:{" "}
                {matchResult.matchedSkills.length > 0
                  ? matchResult.matchedSkills.join(", ")
                  : "None"}
              </div>
              <div className="mb-1 text-yellow-400">
                ❌ Missing Skills:{" "}
                {matchResult.missingSkills.length > 0
                  ? matchResult.missingSkills.join(", ")
                  : "None"}
              </div>
            </div>
          )}
      </div>

      {/* Step-based UI */}
      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-black">Upload Your Resume</h1>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm"
            />
          </motion.div>
        )}

        {(step === "uploading" || step === "analyzing") && (
          <div className="text-center py-20">
            <p className="text-xl font-bold">
              {step === "uploading" ? "Uploading..." : "Analyzing Resume..."}
            </p>
          </div>
        )}

        {step === "done" && feedback && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <ScoreRing score={feedback.score} />
              <div>
                <h2 className="text-xl font-bold">{file?.name}</h2>
                <p className="text-gray-400">ATS Score Analysis Complete</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeedbackBlock
                type="best"
                title={feedback.best.title}
                items={feedback.best.items}
                isLocked={!canAccessFull}
              />
              <FeedbackBlock
                type="good"
                title={feedback.good.title}
                items={feedback.good.items}
                isLocked={!canAccessFull}
              />
              <FeedbackBlock
                type="improve"
                title={feedback.improve.title}
                items={feedback.improve.items}
                isLocked={!canAccessFull}
              />
            </div>
            {!canAccessFull && (
              <button
                onClick={() => openPaywall("pro")}
                className="mt-6 px-6 py-3 bg-blue-600 rounded-xl font-bold"
              >
                Unlock Full Report
              </button>
            )}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaywall && (
          <PaymentModal
            plan={paywallPlan}
            onClose={() => setShowPaywall(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeFeedback;
