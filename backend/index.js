import express from "express";
import MongoDB from "./lib/db.js"
import dotenv from "dotenv";


dotenv.config();

const app = express();

const port = process.env.Port;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    MongoDB();
});
