import React from "react";

const MyResumes = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        My Resumes
      </h1>
      <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
        Welcome to your resume dashboard! Here you’ll be able to view, edit, and
        manage all the resumes you’ve created or uploaded. This section will
        soon let you:
      </p>
      <ul style={{ margin: "1rem 0 0 1.5rem", color: "#475569" }}>
        <li>• See a list of your resumes</li>
        <li>• Edit or delete existing resumes</li>
        <li>• Download your resumes as PDF</li>
        <li>• Start a new resume from scratch</li>
      </ul>
      <p style={{ marginTop: "1.5rem", color: "#94a3b8" }}>
        (Feature coming soon!)
      </p>
    </div>
  );
};

export default MyResumes;
