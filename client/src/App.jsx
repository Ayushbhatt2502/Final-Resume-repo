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
import OAuthCallback from "./pages/OAuthCallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/templates" element={<TemplatesSection />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/templates" element={<AllTemplates />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/templates/:category" element={<TemplatesPage />} />
      <Route path="/my-resumes" element={<MyResumes />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />
    </Routes>
  );
}

export default App;
