import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="pt-16 pb-8 px-6" style={{ background:"#07080c", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              ATS<span style={{ color:"#3b82f6" }}>ify</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm mb-8" style={{ color:"#475569" }}>
            Built by CodeXConquer. AI-powered resume optimization that gets you past the filters and in front of real humans.
          </p>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color:"#334155" }}>Stay updated</p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs text-white placeholder-opacity-20 focus:outline-none transition-colors"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#f1f5f9", caretColor:"#3b82f6" }}
                onFocus={e=>e.target.style.borderColor="rgba(59,130,246,0.4)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
              <button className="px-4 py-2.5 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-80"
                style={{ background:"linear-gradient(135deg, #1d4ed8, #2563eb)" }}>Join</button>
            </div>
          </div>
        </div>

        {[
          { title:"Product", links:["Features","How It Works","Templates","Pricing","Dashboard"] },
          { title:"Legal", links:["Privacy Policy","Terms of Service","Cookie Policy"] },
          { title:"Connect", links:["LinkedIn","Twitter","GitHub","Discord"] },
        ].map(col => (
          <div key={col.title} className="md:col-span-2">
            <p className="text-[10px] font-black uppercase tracking-widest mb-5" style={{ color:"#334155" }}>{col.title}</p>
            <ul className="space-y-3">
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm font-medium transition-colors" style={{ color:"#475569" }}
                    onMouseEnter={e=>e.target.style.color="#94a3b8"} onMouseLeave={e=>e.target.style.color="#475569"}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-widest mb-5" style={{ color:"#334155" }}>Plans</p>
          <div className="space-y-2.5">
            {[
              { n:"Free", d:"ATS score + preview" },
              { n:"Basic $2.99/mo", d:"Resume + cover letter" },
              { n:"Pro $6.99/mo", d:"Full toolkit" },
            ].map(p => (
              <div key={p.n} className="cursor-pointer transition-colors" style={{ color:"#475569" }}
                onMouseEnter={e=>e.currentTarget.style.color="#64748b"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>
                <span className="text-xs font-bold">{p.n}</span>
                <span className="text-xs mx-1.5" style={{ color:"#334155" }}>—</span>
                <span className="text-xs font-medium">{p.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <span className="text-xs font-medium" style={{ color:"#334155" }}>© 2025 CodexConquer. All Rights Reserved.</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:"#334155" }}>ATSify Engine: Active</span>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
