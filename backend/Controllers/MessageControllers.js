import User from "../Models/UserModel.js";
import Message from "../Models/MessageModel.js";

export const getUsers = async (req,res) =>{
    try{
        const id= req.user._id;
        const filter= await (await User.find({_id: {$ne:loggedInUserId}})).select("-password");
        res.status(200).json(filter);
    }
    catch(error){
        console.log("Error in getUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req,res) =>{
    try{
        const {id:usertochat} =req.params;
        const myId = req.user._id;

        const messages = await Message.find({ $or: [{ senderId: myId }, { receiver: usertochat },{ senderId: usertochat }, { receiver: myId }] });

        res.staus(200).json(messages);
    }
    catch(error){
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessages = async (req,res) =>{
    try{
        const {text,image} =req.body;
        const {id:receiverId} =req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if (image){
            const uploadPhoto=await cloudinary.uploader.upload(profilePhoto);
            imageUrl = uploadPhoto.secure_url;
        }


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
        }
    catch(error){
        console.log("Error in sendMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}