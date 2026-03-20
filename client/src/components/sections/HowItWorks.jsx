import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Upload Your Resume", desc: "Drop your PDF or Word doc. Our parser extracts every detail instantly — no manual re-entry needed.", icon: "📤", accent: "#2563eb" },
  { num: "02", title: "AI Deep Scan", desc: "We run your resume through our model trained on thousands of real ATS algorithms and recruiter patterns.", icon: "🔍", accent: "#3b82f6" },
  { num: "03", title: "Color-Coded Feedback", desc: "See exactly what's working (green), what's solid (orange), and what needs fixing (red) — section by section.", icon: "🎨", accent: "#f59e0b" },
  { num: "04", title: "One-Click Optimize", desc: "Accept AI rewrites, inject missing keywords, and fix structural gaps in seconds. Export a polished PDF.", icon: "⚡", accent: "#d97706" },
];

const HowItWorks = () => (
  <section id="how" className="py-32 px-6 relative overflow-hidden" style={{ background: "#0c0e15" }}>
    <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none rounded-full opacity-15"
      style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 70%)" }} />

    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5"
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#fcd34d" }}>
          The Process
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.04em] leading-tight">
          From upload to
          <br />
          <span style={{ color: "#f59e0b" }}>offer letter.</span>
        </h2>
        <p className="mt-5 max-w-xl mx-auto font-medium leading-relaxed" style={{ color: "#64748b" }}>
          We've collapsed ATS optimization into a process that takes under 5 minutes.
        </p>
      </motion.div>

      <div className="relative w-full h-[550px] flex items-center justify-center">

  {/* LEFT HEADING */}
  <div className="absolute left-10 max-w-sm text-left z-10">
    <h2 className="text-4xl font-black text-white leading-tight">
      From upload to <br />
      <span className="text-amber-400">offer letter.</span>
    </h2>
    <p className="mt-4 text-sm text-slate-400">
      We've collapsed ATS optimization into a process that takes under 5 minutes.
    </p>
  </div>

  {/* 🌙 SVG GLOW PATH */}
  <svg className="absolute w-full h-full pointer-events-none">
    <defs>
      <linearGradient id="glowPath" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
      </linearGradient>
    </defs>

    <motion.path
      d="M500,50 Q650,275 500,500"
      stroke="url(#glowPath)"
      strokeWidth="3"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2 }}
      style={{
        filter: "drop-shadow(0 0 8px rgba(59,130,246,0.5))"
      }}
    />
  </svg>

  {/* 🔥 STEPS ON ARC */}
  {steps.map((s, i) => {
    const radius = 750;
const centerX = 300;
const centerY = 325;
const angle = (-150 + i * 100) * (Math.PI / 180);

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.25 }}
        className="absolute w-64 p-5 rounded-xl hover:scale-105 transition-all duration-300"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
          background: "#07080c",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 0 0 rgba(0,0,0,0)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 0 25px rgba(59,130,246,0.15)";
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        }}
      >
        <div className="flex items-start gap-3">
          <div className="text-xl">{s.icon}</div>
          <div>
            <div className="text-[10px] text-slate-500">{s.num}</div>
            <h3 className="text-white font-bold text-sm">{s.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>

      {/* Terminal */}
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        className="mt-10 p-6 rounded-2xl font-mono text-sm overflow-hidden"
        style={{ background: "#07080c", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 text-[9px] font-black uppercase tracking-widest" style={{ color: "#334155" }}>ATSify AI Engine v3.1</span>
        </div>
        {[
          { c: "#93c5fd", t: "→ Parsing resume...                           done (0.3s)" },
          { c: "#60a5fa", t: "→ Running ATS compatibility check...           72/100" },
          { c: "#fcd34d", t: "⚠  Missing keywords: ['Agile', 'CI/CD', 'REST APIs']" },
          { c: "#fca5a5", t: "✗  Summary section absent — critical gap detected" },
          { c: "#86efac", t: "✓  Skills section: strong match (9 keywords found)" },
          { c: "#60a5fa", t: "⚡ Applying AI optimizations...  ATS score → 94/100  ✓" },
        ].map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.14 }}
            className="text-xs leading-relaxed py-0.5" style={{ color: l.c }}>{l.t}</motion.p>
        ))}
      </motion.div>
    </div>
  </section>
);
export default HowItWorks;
