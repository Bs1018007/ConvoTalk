import express from "express";
import { MongoDB } from "./lib/db.js"
import dotenv from "dotenv";
import Cookieparser from "cookie-parser"
import AuthRoutes from "./Routes/AuthRoutes.js"
import MessageRoutes from "./Routes/MessageRoutes.js"
import path from "path"
import cors from "cors"
import {app,server} from "./lib/socket.js"



dotenv.config();

const port = process.env.Port;
const __dirname = path.resolve();


app.use(express.json({limit: '10mb'}));
app.use(Cookieparser());



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth",AuthRoutes);
app.use("/api/message",MessageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend","index.html"));
    });
  }


server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    MongoDB();
});
