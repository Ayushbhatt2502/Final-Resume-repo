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
    delete userResponse.resumeParsed;

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
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      if (err || !user) {
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        return res.redirect(`${clientUrl}/login?error=oauth_failed`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  oauthSuccess
);

// ─── LinkedIn OAuth ────────────────────────────────────────────────────────
router.get(
  "/linkedin",
  passport.authenticate("linkedin")
);
router.get(
  "/linkedin/callback",
  (req, res, next) => {
    passport.authenticate("linkedin", { session: false }, (err, user, info) => {
      if (err || !user) {
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        return res.redirect(`${clientUrl}/login?error=oauth_failed`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  oauthSuccess
);

// ─── Protected profile route ───────────────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
