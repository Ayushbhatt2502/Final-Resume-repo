import express from "express";
import User from "../models/User.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  protect,
  signUpValidation,
  loginValidation,
} from "../middleware/auth.middleware.js";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// ─── Email / Password ──────────────────────────────────────────────────────
router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login);

// ─── Helper: generate JWT & redirect to frontend ──────────────────────────
const oauthSuccess = (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const userResponse = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const encoded = encodeURIComponent(JSON.stringify(userResponse));
    // Redirect frontend with token + user in query params
    res.redirect(
      `${clientUrl}/oauth-callback?token=${token}&user=${encoded}`
    );
  } catch (err) {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/login?error=oauth_failed`);
    console.error("OAuth Success processing error:", err);
  }
};

// ─── Google OAuth ──────────────────────────────────────────────────────────
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  oauthSuccess
);

// ─── LinkedIn OAuth ────────────────────────────────────────────────────────
router.get(
  "/linkedin",
  passport.authenticate("linkedin")
);
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/login",
    session: false,
  }),
  oauthSuccess
);

// ─── Protected profile route ───────────────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
