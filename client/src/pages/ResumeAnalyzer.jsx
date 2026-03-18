import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Briefcase,
    FileText,
    Search,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Copy,
    Download,
    Layout,
    Target,
    Zap
} from "lucide-react";

const Navbar = () => {
    const userStr = localStorage.getItem("user");
    const displayName = userStr ? JSON.parse(userStr).name : "User";

    return (
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
                        <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <span className="text-xl font-black tracking-[-0.05em] text-white">
                        ATS<span style={{ color: "#3b82f6" }}>ify</span>
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors">
                        Dashboard
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black uppercase ring-4 ring-blue-600/10">
                        {displayName.charAt(0)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const ResumeAnalyzer = () => {
    const [role, setRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!role) {
            setError("Please specify the target job role.");
            return;
        }
        setError(null);
        setLoading(true);
        setResults(null);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5001/api/resume/analyze",
                { role, jobDescription },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResults(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to analyze resume. Please ensure you have uploaded a resume first.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    const iV = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div className="min-h-screen text-white pb-20 overflow-x-hidden" style={{ background: "#07080c" }}>
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px] bg-blue-600" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full opacity-5 blur-[100px] bg-orange-500" />
            </div>

            <Navbar />

            <motion.main
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="relative z-10 pt-32 px-6 md:px-12 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Input Form */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div variants={iV}>
                            <h1 className="text-4xl font-black tracking-tight mb-3">
                                ATS <span className="text-blue-500">Optimizer</span>
                            </h1>
                            <p className="text-slate-500 text-sm font-medium">
                                Tailor your resume to any job description using advanced AI analysis.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={iV}
                            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                                        Target Role
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Senior Frontend Engineer"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                                        Job Description (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Paste the job description here for better keyword matching..."
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        rows={8}
                                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    style={{
                                        background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                                        boxShadow: "0 10px 20px -5px rgba(37,99,235,0.3)"
                                    }}
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Optimize Resume <Zap className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {!results && !loading && (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 rounded-3xl bg-white/[0.01] border border-dashed border-white/[0.06]"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-blue-500/5 flex items-center justify-center mb-6">
                                        <Search className="w-10 h-10 text-blue-500/40" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-300">Ready for Analysis</h3>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                        Fill in the role details and click optimize to see your AI-powered ATS suggestions.
                                    </p>
                                </motion.div>
                            )}

                            {loading && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full min-h-[500px] flex flex-col items-center justify-center p-10"
                                >
                                    <div className="relative w-24 h-24 mb-8">
                                        <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
                                        <motion.div
                                            className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight mb-2">Analyzing with AI</h3>
                                    <p className="text-blue-500/60 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
                                        Scanning Keywords • Calculating Score
                                    </p>
                                </motion.div>
                            )}

                            {results && (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    {/* Score & Highlights */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-1 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center justify-center text-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">ATS Score</span>
                                            <div className="relative w-24 h-24 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.05]" />
                                                    <circle
                                                        cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                        className="text-blue-500"
                                                        strokeDasharray={251}
                                                        strokeDashoffset={251 - (251 * results.atsScore) / 100}
                                                        style={{ strokeLinecap: "round", transition: "stroke-dashoffset 1s ease-out" }}
                                                    />
                                                </svg>
                                                <span className="absolute text-2xl font-black">{results.atsScore}</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-3 p-6 rounded-2xl bg-blue-500/[0.08] border border-blue-500/20">
                                            <h4 className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                                                <CheckCircle className="w-4 h-4" /> Optimization Roadmap
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Missing Keywords</p>
                                                    <p className="text-lg font-bold text-white leading-tight">{results.missingKeywords?.length || 0}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Critical Issues</p>
                                                    <p className="text-lg font-bold text-red-400 leading-tight">{results.issues?.length || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback Tabs */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2">
                                                <Search className="w-3.5 h-3.5" /> Missing Keywords
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {results.missingKeywords?.map((kw, i) => (
                                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[10px] font-black uppercase text-orange-400">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                                                <AlertCircle className="w-3.5 h-3.5" /> Suggested Improvements
                                            </h4>
                                            <ul className="space-y-3">
                                                {results.suggestions?.slice(0, 3).map((sug, i) => (
                                                    <li key={i} className="flex gap-2 text-xs font-medium text-slate-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1 shrink-0" />
                                                        {sug}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Optimized Resume Preview */}
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] relative group">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black tracking-tight">AI-Optimized Draft</h3>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">High compatibility professional rewrite</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => copyToClipboard(results.optimizedResume)}
                                                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-colors"
                                                    title="Copy Draft"
                                                >
                                                    <Copy className="w-4 h-4 text-slate-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                            <pre className="text-sm font-medium text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                                                {results.optimizedResume}
                                            </pre>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none rounded-b-3xl" />

                                        <button
                                            onClick={() => copyToClipboard(results.optimizedResume)}
                                            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-3 rounded-xl bg-blue-600 font-black text-[10px] uppercase tracking-widest text-white shadow-2xl shadow-blue-500/40 hover:scale-105 transition-transform"
                                        >
                                            Copy Entire Resume
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.main>
        </div>
    );
};

export default ResumeAnalyzer;
