import express from "express";
import passport from "passport";
import { generateToken } from "../lib/jwtokens.js"; 

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("http://localhost:5173/login");
    }
    
    // Generate JWT token and set it in a cookie
    const token = generateToken(req.user._id, res);
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  // Clear JWT cookie
  res.clearCookie("jwt");
  
  // Clear session
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
    });
  }
  
  // Clear all cookies
  const cookies = req.cookies;
  for (let cookie in cookies) {
    res.clearCookie(cookie);
  }
  
  res.redirect("http://localhost:5173/login");
});

router.get("/user", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not Authenticated" });

  res.json(req.user || null);
});

export default router;
