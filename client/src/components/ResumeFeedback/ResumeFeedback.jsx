import { useState, useRef } from "react";
import PaymentModal from "../PaymentModal";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";


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
  const [role, setRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [feedback, setFeedback] = useState(null);
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

    try {
      const token = localStorage.getItem("token");

      // 1. Upload the file first
      const formData = new FormData();
      formData.append("resume", file);
      const uploadRes = await axios.post("http://localhost:5001/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      const extractedText = uploadRes.data.resumeParsed?.rawText || "";

      if (!extractedText || extractedText.trim().length < 20) {
        alert("Unable to extract sufficient text from your resume. Please try a standard PDF or Word document.");
        setStep("idle");
        setSubmitLoading(false);
        return;
      }

      setStep("analyzing");

      // 2. Call the analysis endpoint
      const response = await axios.post(
        "http://localhost:5001/api/resume/analyze",
        {
          role: role || "Professional",
          jobDescription: jobDesc,
          resumeText: extractedText // Pass directly for reliability
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;

      // 3. Map Gemini response to UI
      setFeedback({
        score: data.atsScore,
        best: {
          title: "Strengths & Keywords",
          items: data.addedKeywords && data.addedKeywords.length > 0 ? data.addedKeywords : ["Professional structure", "Clear contact info"]
        },
        good: {
          title: "Improvements Found",
          items: data.suggestions && data.suggestions.length > 0 ? data.suggestions : ["Formatting is consistent"]
        },
        improve: {
          title: "Critical Issues",
          items: data.issues && data.issues.length > 0 ? data.issues : ["No major issues detected"]
        }
      });

      setStep("done");
    } catch (err) {
      console.error("Analysis failed:", err);
      alert(err.response?.data?.message || "Failed to analyze resume.");
      setStep("idle");
    } finally {
      setSubmitLoading(false);
    }
  };

  const subscription = "pro"; // Forced pro for results
  const canAccessFull = true;
  const openPaywall = (plan) => {
    setPaywallPlan(plan);
    setShowPaywall(true);
  };

  return (
    <div className="w-full">
      {/* Resume & Job Information Input */}
      <div
        className="mb-8 p-6 rounded-2xl"
        style={{
          background: "#10121a",
          border: "1px solid rgba(59,130,246,0.08)",
        }}
      >
        <h3 className="font-black text-lg text-white mb-2">
          Analysis Requirements
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Target Job Role
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                className="w-full p-3 rounded-lg text-sm bg-[#181b23] text-white border border-[#334155] focus:outline-none focus:border-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Resume File
              </label>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full p-2.5 rounded-lg bg-[#181b23] text-white border border-[#334155] focus:outline-none focus:border-blue-500 text-xs"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && (
                <div className="text-[10px] text-green-400 mt-1">
                  Ready: {file.name}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
              Job Description (Optional but recommended)
            </label>
            <textarea
              className="w-full p-3 rounded-lg text-sm bg-[#181b23] text-white border border-[#334155] focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Paste the job description here for better results..."
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
