import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  
  { title: "Features", path: "#features" },
  { title: "How It Works", path: "#how" },
  { title: "Templates", path: "#templates" },
  { title: "Pricing", path: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-100 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(7,8,12,0.9)" : "rgba(7,8,12,0.45)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between py-4">
        
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
          >
            <svg
              width="14"
              height="14"
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

        <ul className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.title}>
              <a
                href={item.path}
                 className="relative inline-block text-sm font-semibold text-slate-400 
             
             before:content-[''] before:absolute before:w-full before:h-[2px] 
             before:bg-gradient-to-r before:from-blue-500 before:to-white
             before:top-[-4px] before:left-0 before:scale-x-0 before:origin-left 
             before:transition-transform before:duration-300

             after:content-[''] after:absolute after:w-full after:h-[2px] 
             after:bg-gradient-to-r after:from-blue-500 after:to-white 
             after:bottom-[-4px] after:left-0 after:scale-x-0 after:origin-right 
             after:transition-transform after:duration-300

             hover:text-slate-100 
             hover:before:scale-x-100 hover:after:scale-x-100"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-bold px-4 py-2 transition-colors"
            style={{ color: "#94a3b8" }}
            onMouseEnter={(e) => (e.target.style.color = "#f1f5f9")}
            onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
          >
            Log in
          </Link>
          <Link
  to="/signup"
  className="relative group inline-block rounded-xl overflow-hidden text-sm font-black uppercase tracking-wide leading-[44px]"
>
  {/* FRONT */}
  <span
    className="absolute inset-0 flex items-center justify-center px-5 
               text-white transition-all duration-500
               [transform:translateY(0)_rotateX(0deg)]
               group-hover:[transform:translateY(50%)_rotateX(90deg)]
               rounded-xl"
    style={{
      background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
      boxShadow: "0 0 24px rgba(37,99,235,0.3)",
    }}
  >
    Get Started Free
  </span>

  {/* BACK */}
  <span
    className="absolute inset-0 flex items-center justify-center px-5 
               text-[#1e293b] transition-all duration-500
               opacity-0
               [transform:translateY(-50%)_rotateX(90deg)]
               group-hover:opacity-100
               group-hover:[transform:translateY(0)_rotateX(0deg)]
               rounded-xl"
    style={{
      background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    }}
  >
    Sign Up Now
  </span>

  {/* Spacer (keeps size stable) */}
  <span className="opacity-0 px-5">Get Started Free</span>
</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: "#cbd5e1" }}
          onClick={() => setOpen(!open)}
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 bg-current transition-all duration-300"
                style={{
                  transform:
                    open && i === 0
                      ? "rotate(45deg) translate(0, 8px)"
                      : open && i === 2
                        ? "rotate(-45deg) translate(0, -8px)"
                        : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#0c0e15",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {nav.map((item) => (
                <a
                  key={item.title}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="font-semibold py-1"
                  style={{ color: "#64748b" }}
                >
                  {item.title}
                </a>
              ))}
              <div
                className="flex flex-col gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-center py-3 rounded-xl font-bold text-sm"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                  }}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="text-center py-3 rounded-xl font-black text-sm text-white"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  }}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default Navbar;
