import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import SendMessage from "../../context/SendMessage";
import sound from '../../assets/notification.mp3';
function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMsg } = SendMessage();
  const notification = new Audio(sound);
  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    await sendMsg(message);
    notification.play();
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh]  bg-gray-800">
        <div className=" w-[90%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border text-black border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;