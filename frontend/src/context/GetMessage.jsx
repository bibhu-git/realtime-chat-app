import React, { useState, useEffect } from 'react'
import useConversation from '../Home/Zustand/UseConversation';
import axios from 'axios';
const GetMessage = () => {
    const { messages, setMessage, selectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMessage = async () => {
            setLoading(true);
            if (selectedConversation  && selectedConversation._id) {
                try {
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
                    setMessage(res.data);
                    
                }
                catch (err) {
                    console.log("Error in GetMessage " + err);
                    setLoading(false);
                }
                finally{
                    setLoading(false);
                }
            }
        }
        getMessage();
    }, [selectedConversation, setMessage]);

    return [ messages, loading ]
}

export default GetMessage
