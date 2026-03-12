import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/auth/signup", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: "#07080c" }}
    >
      <div
        className="absolute top-[-8%] right-[20%] w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-[10%] w-[400px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)",
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              boxShadow: "0 0 24px rgba(37,99,235,0.3)",
            }}
          >
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="text-2xl font-black text-white">
            ATS<span style={{ color: "#3b82f6" }}>ify</span>
          </span>
        </Link>

        <div
          className="relative p-8 rounded-3xl"
          style={{ background: "linear-gradient(160deg, #0a0d18, #0c0e15)" }}
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: "1px",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(245,158,11,0.15))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white text-center mb-1 tracking-tight">
              Create account
            </h1>
            <p
              className="text-sm text-center mb-8 font-medium"
              style={{ color: "#475569" }}
            >
              Start optimizing your resume for free
            </p>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label
                  className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                  style={{ color: "#334155" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="yourname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    caretColor: "#3b82f6",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(59,130,246,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                  }
                />
              </div>
              <div>
                <label
                  className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                  style={{ color: "#334155" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white focus:outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    caretColor: "#3b82f6",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(59,130,246,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                  }
                />
              </div>
              <div>
                <label
                  className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                  style={{ color: "#334155" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white focus:outline-none transition-colors pr-16"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      caretColor: "#3b82f6",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(59,130,246,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest transition-colors"
                    style={{ color: "#334155" }}
                    onMouseEnter={(e) => (e.target.style.color = "#64748b")}
                    onMouseLeave={(e) => (e.target.style.color = "#334155")}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white relative overflow-hidden group mt-2"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  boxShadow: "0 0 24px rgba(37,99,235,0.2)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  }}
                />
                <span className="relative z-10">
                  {loading ? "Creating account..." : "Create Free Account"}
                </span>
              </button>

              <div className="relative flex items-center gap-4 my-2">
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "#334155" }}
                >
                  or
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:5001/api/auth/google")
                }
                className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.4H42V20H24v8h11.3C33.7 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.7 7 29 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.6z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.7 7 29 5 24 5c-7.7 0-14.4 4.3-17.7 9.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.1 0 9.7-2 13.2-5.3l-6.1-5.1c-1.8 1.3-4.1 2.1-7.1 2.1-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.6 40.5 16.3 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.4H42V20H24v8h11.3c-1 2.7-3 4.9-5.6 6.3l.1.1 6.1 5.1C39.6 36.1 44 31 44 25c0-1.3-.1-2.6-.4-3.6z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:5001/api/auth/linkedin")
                }
                className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all"
                style={{
                  background: "rgba(10,102,194,0.08)",
                  border: "1px solid rgba(10,102,194,0.25)",
                  color: "#94a3b8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(10,102,194,0.14)";
                  e.currentTarget.style.borderColor = "rgba(10,102,194,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(10,102,194,0.08)";
                  e.currentTarget.style.borderColor = "rgba(10,102,194,0.25)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </button>

              <p
                className="text-center text-sm font-medium"
                style={{ color: "#475569" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-black transition-colors"
                  style={{ color: "#3b82f6" }}
                  onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
                  onMouseLeave={(e) => (e.target.style.color = "#3b82f6")}
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default SignUpPage;
