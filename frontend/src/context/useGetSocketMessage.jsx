import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../Home/Zustand/UseConversation'
import sound from '../assets/notification2.mp3';
const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();
    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessage([...messages, newMessage]);
        })
        return () => socket.off("newMessage");
    }, [socket, messages, setMessage])
}

export default useGetSocketMessage
