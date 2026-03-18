import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="pt-16 pb-8 px-6" style={{ background: "#07080c", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10" style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              ATS<span style={{ color: "#3b82f6" }}>ify</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm mb-10 text-slate-400">
            Elevate your career with CodeXConquer. Our AI-powered resume optimization engine helps you bypass ATS filters and land your dream job.
          </p>
          <div className="max-w-xs">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-600">Newsletter</p>
            <div className="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500/50 transition-all">
              <input type="email" placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none" />
              <button className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}>Join Now</button>
            </div>
          </div>
        </div>

        {[
          { title: "Product", links: ["Features", "How It Works", "Templates", "Dashboard"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          { title: "Social", links: ["LinkedIn", "Twitter", "GitHub", "Discord"] },
        ].map(col => (
          <div key={col.title} className="md:col-span-2 md:ml-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-slate-600">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm font-medium transition-colors" style={{ color: "#475569" }}
                    onMouseEnter={e => e.target.style.color = "#94a3b8"} onMouseLeave={e => e.target.style.color = "#475569"}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>

    <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 mx-auto max-w-7xl px-6">
      <span className="text-xs font-medium text-slate-600">© 2025 CodexConquer. All Rights Reserved.</span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">ATSify Engine: Active</span>
      </div>
    </div>
  </footer>
);
export default Footer;
