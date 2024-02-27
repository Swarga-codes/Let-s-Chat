import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { currentChatContext } from '../lib/context';
import { fetchMessages } from '../lib/actions';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000');
const socket = io('https://let-s-chat.onrender.com');

function ChatSection() {
  const chatCompare:any = useRef(null);
  const chatScroll:any=useRef(null)
  const { currentChat } = useContext(currentChatContext);
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const getMessages = useCallback(async () => {
    setMessages(await fetchMessages(currentChat._id));
    socket.emit('join chat', currentChat._id);
  }, [currentChat._id]);

  useEffect(() => {
    socket.emit('setup', currentChat.participants.find((participant:any) => participant.email === session?.user?.email));
    socket.on('connection', () => setIsSocketConnected(true));
  },[currentChat.participants,session?.user?.email]);

  useEffect(() => {
    getMessages();
    chatCompare.current = currentChat;
   
  }, [currentChat, getMessages]);

  useEffect(() => {
    socket.on('message received', newMessage => {
      if (!chatCompare.current || chatCompare.current._id !== newMessage.chatId._id) {
        // notify
      } else {
        setMessages((prevMessages):any => [...prevMessages, newMessage]);
      }
    });
  }, []);
useEffect(()=>{
  chatScroll.current.scrollTop=chatScroll.current.scrollHeight
},[messages])
  return (
    <>
      <div className='p-3 overflow-y-scroll max-h-[500px]' ref={chatScroll}>
        {messages.length === 0 && <p className='font-bold text-center'>Oops no texts! Start a conversation!</p>}
        {messages.length > 0 && messages.map((message:any) => (
          session?.user?.email !== message?.sender?.email ? (
            <div className='bg-gray-700 p-3 w-fit rounded-md my-2' key={message._id}>
              <p>{message?.content}</p>
            </div>
          ) : (
            <div className='bg-gray-700 p-3 w-fit rounded-md ml-auto my-2' key={message._id}>
              <p>{message?.content}</p>
            </div>
          )
        ))}
      </div>
      <ChatBox setMessageInput={setMessageInput} messageInput={messageInput} messages={messages} setMessages={setMessages} socket={socket}/>
    </>
  );
}

export default ChatSection;
