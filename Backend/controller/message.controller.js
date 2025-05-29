import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";
export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = Conversation.create({
                members: [senderId, receiverId]
            })
        };
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        await Promise.all([newMessage.save(), conversation.save()]);
        res.status(200).json(newMessage);
    }
    catch (err) {
        console.log("Error in sendMessage : " + err);
        res.status(500).json(err);
    }
}
export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");
        if (!conversation) {
            return res.status(201).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch (err) {
        console.log("Error in getMessage " + err);
        res.status(500).json(err);
    }


}