import express from "express";
import MongoDB from "./lib/db.js"
import dotenv from "dotenv";
import Cookieparser from "cookie-parser"
import AuthRoutes from "./Routes/AuthRoutes.js"
import MessageRoutes from "./Routes/MessageRoutes.js"


dotenv.config();

const app = express();

const port = process.env.Port;


app.use("/api/auth",AuthRoutes);
app.use("/api/message",MessageRoutes);
app.use(express.json());
app.use(Cookieparser());

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    MongoDB();
});
