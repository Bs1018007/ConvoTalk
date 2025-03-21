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
    const token = generateToken(req.user._id, res);
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("http://localhost:5173/login");
});

router.get("/user", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not Authenticated" });

  res.json(req.user || null);
});

export default router;
