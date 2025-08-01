import User from "../Models/UserModel.js";
import Message from "../Models/MessageModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { sendNotificationMail } from "../lib/mailer.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Sidebar Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const userToChatId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
      deletedBy: { $ne: myId },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("GetMessages Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, audio } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl = null;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      imageUrl = uploadRes.secure_url;
    }

    let audioUrl = null;
    if (audio) {
      const uploadRes = await cloudinary.uploader.upload(audio, {
        resource_type: "video",
      });
      audioUrl = uploadRes.secure_url;
    }


    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      audio: audioUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", newMessage);
    } else {
      const receiverUser = await User.findById(receiverId);
      const senderUser = await User.findById(senderId);

      if (receiverUser?.email) {
        try {
          await sendNotificationMail(
            receiverUser.email,
            "📩 New message on ConvoTalk",
            `${senderUser.fullName} sent you a message.Open ConvoTalk https://convotalk-1.onrender.com/ to check it out.`
          );
        } catch (mailErr) {
          console.error("Email sending failed:", mailErr.message);
        }
      }
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("SendMessage Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this message" });
    }

    message.text = "";
    message.image = "";
    message.audio = "";
    message.isDeletedForEveryone = true;
    await message.save();

    const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeletedForEveryone", message._id);
    }

    res.status(200).json({ message: "Message deleted for everyone", id: message._id });
  } catch (error) {
    console.error("DeleteForEveryone Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessageForMe = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (!message.deletedBy.includes(req.user._id)) {
      message.deletedBy.push(req.user._id);
      await message.save();
    }

    res.status(200).json({ message: "Message deleted for you" });
  } catch (error) {
    console.error("DeleteForMe Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
