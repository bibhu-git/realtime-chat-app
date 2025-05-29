import React, { useState, useEffect } from 'react'
import useConversation from '../Zustand/UseConversation'
import { useSocketContext } from '../../context/SocketContext';
const ChatWith = () => {
    const { selectedConversation } = useConversation();
    const [name, setName] = useState('');
    const { onlineUsers } = useSocketContext();
    const getOnlineUserStatus = (userId) => {
        return onlineUsers.includes(userId) ? "Online" : "Offline";
    };
    useEffect(() => {
        if (selectedConversation) {
            setName(selectedConversation.fullName);
        }
    }, [selectedConversation]);
    return (
        <div className='flex gap-3 items-center pl-20 h-20 bg-gray-900 z-50 fixed top-0 right-0 left-[387px]'>
            <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h3 className='text-lg font-semibold'>{name}</h3>
                <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
            </div>
        </div>
    )
}

export default ChatWith
