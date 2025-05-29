import React from 'react'

const Message = ({ msg }) => {
    const authUser = JSON.parse(localStorage.getItem("chatApp"));
    const itsMe = authUser.user._id === msg.senderId;
    const chatName = itsMe ? "chat-end" : "chat-start";
    const bgColor = itsMe ? "chat-bubble-success" : "chat-bubble-primary";
    const createdAt = new Date(msg.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div>
            <div className={`chat ${chatName}  mt-3`}>
                <div className={`chat-bubble ${bgColor}`}>{msg.message}</div>
                <div className='chat-footer text-gray-400'>{formattedTime}</div>
            </div>

        </div>
    )
}

export default Message
