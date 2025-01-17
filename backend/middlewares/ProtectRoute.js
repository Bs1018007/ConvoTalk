import jwt from "jsonwebtoken"
import User from "../Models/UserModel.js"

export const protectRoute = async(req,res,next) =>{
    try{
        const token =req.cookies.jwt;

        if (!token){
            res.status(401).json({ message : "Unauthorised as no token"});
        }

        const check = jwt.verify(token,process.env.JWT_SECRET);


        if (!check){
            res.status(401).json({message : "Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user){
            res.status(404).json({message : "user not found"});
        }

        req.user = user;

        next();
    }
    catch(error){
        console.log("Error in ProtectRoute middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}