import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { GenToken } from "../utils/jwtokens.js";

export const SignUp = async (req, res) => {
    const {UserName,email,password} = req.body;
    try{
        if (password.length<6){
            return res.status(400).json({message: "password should be of at least 6 characters"});
        }
        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({message: "Email Already exists"});
        }

        const salt=await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            Username:UserName,
            password:hashedPassword,
            email:email
        });

        if (newUser){
            GenToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                UserName: newUser.UserName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            
            
        }
        else{
            return res.status(400).json({message: "User not created"});
        }

    }catch(error){

    }
  };
  
  export const Signout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in Signout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  export const SignIn = async (req, res) => {
    const {UserName,email,password} = req.body;
    try{
        const user = User.findOne({email});
        if (!user){
            return res.status(400).json({message: "Email does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        GenToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            UserName: user.UserName,
            email: user.email,
            rofilePic: user.profilePic,
        });
    }
    catch(error){
        console.log("Error in SignIn controller", error.message);
        return res.status(400).json({message: "Error"});
    }

  };
  