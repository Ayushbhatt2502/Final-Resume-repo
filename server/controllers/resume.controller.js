import fs from "fs";
import path from "path";
import User from "../models/User.js";
import { extractResumeData } from "../utils/resumeParser.js";
import { generateLatexResume } from "../utils/latexTemplate.js";

const mapParsedToLatexData = (parsed) => {
  const skillsArray = Array.isArray(parsed.skills) ? parsed.skills : [];

  const splitBullets = (text) =>
    text
      .split(/\n|•/g)
      .map((line) => line.trim())
      .filter(Boolean);

  const experienceText = typeof parsed.experience === "string" ? parsed.experience : "";
  const educationText = typeof parsed.education === "string" ? parsed.education : "";

  const experience = experienceText
    ? [
        {
          company: "Work Experience",
          duration: "",
          position: "",
          location: "",
          achievements: splitBullets(experienceText),
        },
      ]
    : [];

  const education = educationText
    ? [
        {
          institution: educationText,
          duration: "",
          degree: "",
          cgpa: "",
          coursework: "",
        },
      ]
    : [];

  const skills = skillsArray.length ? { skills: skillsArray.join(", ") } : {};

  return {
    personalInfo: {
      name: parsed.name || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      linkedin: "",
      github: "",
      portfolio: "",
      leetcode: "",
    },
    education,
    experience,
    projects: [],
    skills,
    certifications: [],
  };
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const resume = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
    };

    let resumeParsed = {};
    try {
      resumeParsed = await extractResumeData({
        filePath: req.file.path,
        mimeType: req.file.mimetype,
      });
    } catch (err) {
      resumeParsed = {};
    }

    const latexData = mapParsedToLatexData(resumeParsed);
    const latex = generateLatexResume(latexData);

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const latexFilename = `${path.parse(req.file.filename).name}.tex`;
    const latexFilePath = path.join(uploadDir, latexFilename);
    fs.writeFileSync(latexFilePath, latex, "utf8");

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resume, resumeParsed },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Resume uploaded",
      user,
      resumeParsed,
      latex,
      latexFile: `/uploads/${latexFilename}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
