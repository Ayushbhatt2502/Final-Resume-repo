import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ResumeFeedback from "../components/ResumeFeedback/ResumeFeedback";
import PaymentModal from "../components/PaymentModal";
const Navbar = ({ displayName }) => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
    style={{
      background: "rgba(7,8,12,0.88)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
            boxShadow: "0 0 18px rgba(37,99,235,0.3)",
          }}
        >
          <svg
            width="13"
            height="13"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <span className="text-xl font-black tracking-[-0.05em] text-white">
          ATS<span style={{ color: "#3b82f6" }}>ify</span>
        </span>
      </Link>
      <div className="flex items-center gap-5">
        <div className="hidden md:flex gap-6">
          <Link
            to="/dashboard"
            className="text-[10px] font-black uppercase tracking-widest transition-colors"
            style={{ color: "#475569" }}
            onMouseEnter={(e) => (e.target.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.target.style.color = "#475569")}
          >
            Dashboard
          </Link>
          <Link
            to="/my-resumes"
            className="text-[10px] font-black uppercase tracking-widest transition-colors"
            style={{ color: "#475569" }}
            onMouseEnter={(e) => (e.target.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.target.style.color = "#475569")}
          >
            My Resumes
          </Link>
          <Link
            to="/settings"
            className="text-[10px] font-black uppercase tracking-widest transition-colors"
            style={{ color: "#475569" }}
            onMouseEnter={(e) => (e.target.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.target.style.color = "#475569")}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentPlan, setPaymentPlan] = useState(null);
  const displayName = useMemo(() => {
    const r = localStorage.getItem("user");
    if (!r) return "there";
    try {
      const p = JSON.parse(r);
      return p.name || p.username || "there";
    } catch {
      return "there";
    }
  }, []);

  const tools = [
    {
      title: "Analyze Resume",
      desc: "Upload your resume and get instant color-coded AI feedback.",
      action: "Analyze Now",
      tab: "analyze",
      icon: "🔍",
      accent: "rgba(59,130,246,0.12)",
      aBorder: "rgba(59,130,246,0.25)",
      badge: null,
    },
    {
      title: "Create ATS Resume",
      desc: "Build a new ATS-optimized resume from scratch with AI guidance.",
      action: "Start Building",
      tab: null,
      icon: "📄",
      accent: "rgba(245,158,11,0.08)",
      aBorder: "rgba(245,158,11,0.18)",
      badge: "Pro",
    },
    {
      title: "Generate Cover Letter",
      desc: "Create a tailored cover letter in seconds based on your resume.",
      action: "Generate",
      tab: null,
      icon: "✍️",
      accent: "rgba(59,130,246,0.08)",
      aBorder: "rgba(59,130,246,0.15)",
      badge: "Basic",
    },
  ];

  const iV = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analyze", label: "Analyze Resume" },
    { id: "resumes", label: "My Resumes" },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: "#07080c" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-125 h-125 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-100 h-100 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Navbar displayName={displayName} />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="relative z-10 pt-36 pb-20 px-6 md:px-12 max-w-6xl mx-auto"
      >
        <header className="mb-10">
          <motion.div
            variants={iV}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#93c5fd",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "rgba(34,197,94,0.6)" }}
              />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            AI Engine Ready
          </motion.div>
          <motion.h1
            variants={iV}
            className="text-5xl md:text-7xl font-black tracking-[-0.05em] leading-tight text-white"
          >
            Welcome back,
            <br />
            <span style={{ color: "#3b82f6" }}>{displayName}.</span>
          </motion.h1>
          <motion.p
            variants={iV}
            className="text-lg mt-3 font-medium"
            style={{ color: "#475569" }}
          >
            Your AI-powered career toolkit is ready.
          </motion.p>
        </header>

        {/* Tabs */}
        <motion.div
          variants={iV}
          className="flex gap-1 p-1 rounded-2xl w-fit mb-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              style={
                activeTab === tab.id
                  ? {
                      background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(37,99,235,0.25)",
                    }
                  : { color: "#475569" }
              }
              onMouseEnter={(e) => {
                if (activeTab !== tab.id)
                  e.currentTarget.style.color = "#94a3b8";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id)
                  e.currentTarget.style.color = "#475569";
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="ov"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {tools.map((tool) => (
                  <motion.div
                    key={tool.title}
                    variants={iV}
                    onClick={() => tool.tab && setActiveTab(tool.tab)}
                    className="group relative p-8 rounded-2xl flex flex-col justify-between min-h-65 overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(160deg, ${tool.accent}, #0c0e15)`,
                      border: `1px solid rgba(255,255,255,0.06)`,
                      cursor: tool.tab ? "pointer" : "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = tool.aBorder)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.06)")
                    }
                  >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {tool.icon}
                        </div>
                        {tool.badge && (
                          <span
                            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={
                              tool.badge === "Pro"
                                ? {
                                    background: "rgba(245,158,11,0.12)",
                                    border: "1px solid rgba(245,158,11,0.25)",
                                    color: "#fcd34d",
                                  }
                                : {
                                    background: "rgba(37,99,235,0.12)",
                                    border: "1px solid rgba(59,130,246,0.25)",
                                    color: "#93c5fd",
                                  }
                            }
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-black tracking-tight text-white mb-2">
                        {tool.title}
                      </h2>
                      <p
                        className="text-sm leading-relaxed font-medium"
                        style={{ color: "#475569" }}
                      >
                        {tool.desc}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (tool.tab) setActiveTab(tool.tab);
                      }}
                      className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all group-hover:gap-4"
                      style={{ color: "#334155" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#94a3b8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#334155")
                      }
                    >
                      {tool.action}
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Upgrade banner */}
              <motion.div
                variants={iV}
                className="mt-8 p-7 rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0a0d18, #070912)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(59,130,246,0.15), rgba(245,158,11,0.25))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <div
                  className="absolute top-0 right-0 w-64 h-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to left, rgba(37,99,235,0.08), transparent)",
                  }}
                />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
                  <div>
                    <p
                      className="text-[9px] font-black uppercase tracking-widest mb-1"
                      style={{ color: "#3b82f6" }}
                    >
                      Free Plan Active
                    </p>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Unlock the full ATS toolkit
                    </h3>
                    <p
                      className="text-sm mt-1 font-medium"
                      style={{ color: "#475569" }}
                    >
                      Download resumes, generate cover letters, and get 100% AI
                      feedback.
                    </p>
                  </div>
                  <div className="flex gap-2.5 shrink-0 flex-wrap">
                    <button
                      onClick={() => setPaymentPlan("basic")}
                      className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                        boxShadow: "0 0 20px rgba(37,99,235,0.2)",
                      }}
                    >
                      Basic $2.99/mo
                    </button>
                    <button
                      onClick={() => setPaymentPlan("pro")}
                      className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-opacity hover:opacity-85"
                      style={{
                        background: "linear-gradient(135deg, #d97706, #f59e0b)",
                        color: "#000",
                      }}
                    >
                      Pro $6.99/mo
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Recent files */}
              <motion.div
                variants={iV}
                className="mt-12 pt-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3
                  className="text-[10px] font-black uppercase tracking-widest mb-5"
                  style={{ color: "#334155" }}
                >
                  Recent Documents
                </h3>
                <div className="space-y-2">
                  {[
                    "Software_Engineer_Master.pdf",
                    "Product_Manager_Role.pdf",
                  ].map((file) => (
                    <div
                      key={file}
                      className="flex items-center justify-between py-4 px-5 rounded-xl transition-all cursor-pointer group"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(59,130,246,0.15)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.05)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(37,99,235,0.12)" }}
                        >
                          <svg
                            width="13"
                            height="13"
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#64748b" }}
                        >
                          {file}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: "#334155" }}
                      >
                        View →
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "analyze" && (
            <motion.div
              key="an"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tight text-white mb-3">
                  Resume Analyzer
                </h2>
                <div className="flex items-center gap-5 flex-wrap">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#475569" }}
                  >
                    Upload for instant AI feedback.
                  </p>
                  <div className="flex items-center gap-4">
                    {[
                      { c: "bg-orange-400", l: "Best Parts", t: "#fb923c" },
                      { c: "bg-emerald-400", l: "Good Sections", t: "#34d399" },
                      { c: "bg-red-400", l: "Needs Work", t: "#f87171" },
                    ].map(({ c, l, t }) => (
                      <div key={l} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${c}`} />
                        <span
                          className="text-xs font-bold"
                          style={{ color: t }}
                        >
                          {l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <ResumeFeedback />
            </motion.div>
          )}

          {activeTab === "resumes" && (
            <motion.div
              key="res"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ background: "rgba(37,99,235,0.1)" }}
              >
                📁
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                No resumes yet
              </h3>
              <p className="text-sm font-medium" style={{ color: "#475569" }}>
                Upload and analyze your first resume to save it here.
              </p>
              <button
                onClick={() => setActiveTab("analyze")}
                className="mt-6 px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                }}
              >
                Analyze Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <AnimatePresence>
        {paymentPlan && (
          <PaymentModal plan={paymentPlan} onClose={() => setPaymentPlan(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
export default DashboardPage;
