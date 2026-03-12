import { motion } from "framer-motion";

const features = [
  { emoji: "🧠", title: "Smart Resume Builder", desc: "Create ATS-friendly resumes with guided sections and industry-standard formatting. AI suggestions as you type.", tag: "Free", tc: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", text: "#86efac" } },
  { emoji: "📊", title: "ATS Score Analyzer", desc: "Instant compatibility score against real ATS algorithms — broken down section by section.", tag: "Free Preview", tc: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#93c5fd" } },
  { emoji: "⚡", title: "AI Keyword Injection", desc: "Auto-detect and inject missing keywords so your resume hits the top of every stack without stuffing.", tag: "Basic", tc: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#93c5fd" } },
  { emoji: "✍️", title: "Cover Letter Generator", desc: "Personalized, high-conversion cover letters tailored to any job posting in under 10 seconds.", tag: "Basic", tc: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#93c5fd" } },
  { emoji: "🎯", title: "Job Match Score", desc: "Paste any job description and see your exact match score with a line-by-line gap analysis.", tag: "Pro", tc: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#fcd34d" } },
  { emoji: "🔄", title: "Multi-Version Manager", desc: "Manage unlimited resume versions for different roles and industries from one clean dashboard.", tag: "Pro", tc: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#fcd34d" } },
];

const Features = () => (
  <section id="features" className="py-32 px-6 relative overflow-hidden" style={{ background: "#07080c" }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
    </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5"
          style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd" }}>
          Capabilities
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.04em] leading-tight">
          Everything you need
          <br />
          <span style={{ color: "#3b82f6" }}>to get hired.</span>
        </h2>
        <p className="mt-5 max-w-xl mx-auto font-medium leading-relaxed" style={{ color: "#64748b" }}>
          From upload to offer letter — ATSify covers every step with AI tools built for real results.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="group relative p-7 rounded-2xl transition-all duration-300 cursor-default"
            style={{ background: "#0c0e15", border: "1px solid rgba(255,255,255,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"; e.currentTarget.style.background = "#10121a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "#0c0e15"; }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {f.emoji}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: f.tc.bg, border: `1px solid ${f.tc.border}`, color: f.tc.text }}>
                {f.tag}
              </span>
            </div>
            <h3 className="text-lg font-black tracking-tight text-white mb-3">{f.title}</h3>
            <p className="text-sm leading-relaxed font-medium" style={{ color: "#64748b" }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default Features;
