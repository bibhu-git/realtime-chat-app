import mongoose from "mongoose";
import Message from "./message.model.js";
import User from "./user.model.js";

const ConversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message
        },
    ],

}, { timestamps: true });
const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;