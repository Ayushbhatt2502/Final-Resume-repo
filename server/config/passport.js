import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ─── Google Strategy ─────────────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name =
          profile.displayName || profile.name?.givenName || "Google User";
        const avatar = profile.photos?.[0]?.value || null;

        if (!email) return done(new Error("No email from Google profile"));

        let user = await User.findOne({ $or: [{ email }, { googleId: profile.id }] });
        if (!user) {
          user = await User.create({
            name,
            email,
            googleId: profile.id,
            avatar,
            password: null,
          });
        } else {
          // Link Google ID if signing in via email that already exists
          if (!user.googleId) {
            user.googleId = profile.id;
            if (!user.avatar && avatar) user.avatar = avatar;
            await user.save();
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ─── LinkedIn Strategy ─────────────────────────────────────────────────────
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["openid", "profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value ||
          `linkedin_${profile.id}@atsify.app`;
        const name =
          profile.displayName ||
          `${profile.name?.givenName || ""} ${profile.name?.familyName || ""}`.trim() ||
          "LinkedIn User";
        const avatar = profile.photos?.[0]?.value || null;

        let user = await User.findOne({
          $or: [{ email }, { linkedinId: profile.id }],
        });

        if (!user) {
          user = await User.create({
            name,
            email,
            linkedinId: profile.id,
            avatar,
            password: null,
          });
        } else {
          if (!user.linkedinId) {
            user.linkedinId = profile.id;
            if (!user.avatar && avatar) user.avatar = avatar;
            await user.save();
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
