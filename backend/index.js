import express from "express";
import { MongoDB } from "./lib/db.js"
import dotenv from "dotenv";
import Cookieparser from "cookie-parser"
import AuthRoutes from "./Routes/AuthRoutes.js"
import MessageRoutes from "./Routes/MessageRoutes.js"

import cors from "cors"
import {app,server} from "./lib/socket.js"



dotenv.config();

const port = process.env.Port;


app.use(express.json({limit: '10mb'}));
app.use(Cookieparser());



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth",AuthRoutes);
app.use("/api/message",MessageRoutes);



server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    MongoDB();
});
