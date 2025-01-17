import express from "express"

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Signup Route");
})

router.get("/signin",(req,res)=>{
    res.send("Signin Route");
})

router.get("/signout",(req,res)=>{
    res.send("Sign Route");
})

export default router;