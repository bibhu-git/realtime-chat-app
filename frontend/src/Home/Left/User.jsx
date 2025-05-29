import React from 'react'
import useConversation from '../Zustand/UseConversation'
import { useSocketContext } from '../../context/SocketContext';
const User = ({ user }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    return (
        <div onClick={() => setSelectedConversation(user)} className={`flex gap-3 mx-3 hover:bg-slate-400 pl-2 rounded-md duration-200 ${isSelected ? 'bg-slate-400' : ""} `}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-14 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-lg'>{user.fullName}</h2>
                <span className='text-gray-300'>{user.email}</span>
            </div>
        </div>
    )
}

export default User
