import express from "express";
import MongoDB from "./lib/db.js"
import dotenv from "dotenv";
import AuthRoutes from "./Routes/AuthRoutes.js"


dotenv.config();

const app = express();

const port = process.env.Port;


app.use("/api/auth",AuthRoutes);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    MongoDB();
});
