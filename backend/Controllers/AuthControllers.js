import cloudinary from "../lib/cloudinary.js";
import { GenToken } from "../lib/jwtokens.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  const { UserName, email, password } = req.body;
  try {
    if (!UserName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      UserName:UserName,
      email:email,
      password: hashedPassword,
    });

    if (newUser) {
      GenToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        UserName: newUser.UserName,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    GenToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      UserName: user.UserName,
      email: user.email,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const SignOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateProfile = async (req,res) =>{
    try{
        const {profilePhoto} = req.body;
        const UserId = req.user._id;
        
        if (!profilePhoto){
            res.status(400).json({message:"ProfilePhoto is Required"});
        }

        const uploadPhoto=await cloudinary.uploader.upload(profilePhoto);
        const updateUser =  await User.findByIdAndUpdate(UserId,{profilePhoto: uploadPhoto.secure_url},{new:true});

        res.status(200).json(updateUser);
    }
    catch(error){
        console.log("Error in UpdateProfile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const CheckAuth =(req,res) => {
    try{
        const user = req.user;
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error in CheckAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}