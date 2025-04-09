import express from "express";
import { MongoDB} from "./lib/db.js";
import dotenv from "dotenv";
import Cookieparser from "cookie-parser";
import AuthRoutes from "./Routes/AuthRoutes.js";
import MessageRoutes from "./Routes/MessageRoutes.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import session from "express-session";
import passport from "passport";
import "./lib/passport.js"; 
import GoogleAuthRoutes from "./Routes/GoogleAuthRoutes.js"; 
import path from "path";

const __dirname = path.resolve();

dotenv.config();

const port = process.env.PORT || 3000;
const FRONTEND_URL = process.env.NODE_ENV === "production" 
  ? "https://convotalk-production.up.railway.app" 
  : "http://localhost:5173";

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(Cookieparser());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/auth", GoogleAuthRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Handle all other routes by serving the index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  MongoDB();
});
