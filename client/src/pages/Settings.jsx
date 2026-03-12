import React, { useState } from "react";

const Settings = () => {
  // Simulate fetching user data from localStorage or API
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    // TODO: Replace with real API call
    setTimeout(() => {
      setSaving(false);
      setMessage("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify({ ...user, name, email }));
    }, 1000);
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    setSaving(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      setSaving(false);
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px #e0e7ef33",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "#1e293b",
        }}
      >
        Settings
      </h1>
      <form onSubmit={handleProfileSave} style={{ marginBottom: 32 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #cbd5e1",
          }}
          required
        />
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #cbd5e1",
          }}
          required
        />
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 24px",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
      <form onSubmit={handlePasswordSave} style={{ marginBottom: 32 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #cbd5e1",
          }}
          required
        />
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #cbd5e1",
          }}
          required
        />
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #cbd5e1",
          }}
          required
        />
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 24px",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          {saving ? "Saving..." : "Change Password"}
        </button>
      </form>
      {message && (
        <div
          style={{
            color: message.includes("success") ? "#059669" : "#dc2626",
            marginBottom: 16,
          }}
        >
          {message}
        </div>
      )}
      <div style={{ color: "#64748b", fontSize: "0.95rem", marginTop: 24 }}>
        <strong>More settings coming soon:</strong>
        <ul style={{ margin: "0.5rem 0 0 1.5rem", color: "#475569" }}>
          <li>• Set notification preferences</li>
          <li>• Delete your account</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
