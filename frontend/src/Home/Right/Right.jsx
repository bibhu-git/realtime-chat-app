import React, { useState } from 'react'
import ChatWith from './ChatWith'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../Zustand/UseConversation'
const Right = () => {
  const authUser = JSON.parse(localStorage.getItem("chatApp"));
  console.log(authUser);
  const { selectedConversation } = useConversation();
  return (
    <div className='max-h-screen overflow-scroll w-[75%] bg-slate-800 no-scrollbar'>
      {selectedConversation ? (
        <div>
          <ChatWith />
          <div className='mt-24 mx-4 mb-16'>
            <Messages />
          </div>
          <div className='fixed bottom-0 left-[380px] right-0'>
            <Typesend />
          </div>
        </div>
      ) : (
        <div className='h-full text-lg w-full flex flex-col items-center justify-center text-white text-center'>
          <p className='block'>Welcome <span className='font-semibold'>{authUser?.user.name}</span></p>
          <p> No chat selected, please start conversation by selecting anyone to your contacts</p>
        </div>
      )}
    </div>
  )
}

export default Right
