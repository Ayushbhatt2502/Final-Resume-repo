import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import DashboardPage from "./pages/Dashboard";
import AllTemplates from "./pages/AllTemplates";
import TemplatesPage from "./pages/TemplatesPage";
import TemplatesSection from "./components/sections/TemplatesSection";
import FAQ from "./components/FAQ/FAQ";
import MyResumes from "./pages/MyResumes";
import Settings from "./pages/Settings";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import OAuthCallback from "./pages/OAuthCallback";
import CustomCursor from "./components/CustomCursor";
import FallingResumes from "./components/FallingResumes";

function App() {
  return (
    <>
      <FallingResumes /> 
     <CustomCursor />
     <div className="relative z-10">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/templates" element={<TemplatesSection />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/templates/all" element={<AllTemplates />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/templates/:category" element={<TemplatesPage />} />
      <Route path="/my-resumes" element={<MyResumes />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
