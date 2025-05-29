import React from 'react'
import GetMessage from '../../context/GetMessage'
import Loading from '../../Components/Loading';
import Message from './Message';
import useGetSocketMessage from '../../context/useGetSocketMessage';
import { useRef , useEffect} from 'react';
const Messages = () => {
  const [messages, loading] = GetMessage();
  useGetSocketMessage();
  const lastMsgRef = useRef();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  
    return () => clearTimeout(timeoutId);
  }, [messages]);
  
  return (
    <div>
      {
        loading ? <Loading /> : (messages.length > 0 &&
          messages.map((msg, index) => (
            <div key={index} ref={lastMsgRef}>
              <Message msg={msg} />
            </div>
          )))
      }
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages
