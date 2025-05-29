import React, { useState } from 'react'
import axios from 'axios';
import useConversation from '../Home/Zustand/UseConversation';
const SendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();
    const sendMsg = async (message) => {
        try {
            if(message == null)
            {
                return;
            }
            setLoading(true);
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
            setMessage([...messages, res.data]);
            setLoading(false);
        }
        catch (err) {
            console.log("Error in sendMessage" + err);
            setLoading(false);
        }
    }
    return { loading, sendMsg };
}

export default SendMessage
