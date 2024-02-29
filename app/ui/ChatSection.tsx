import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { currentChatContext } from '../lib/context';
import { fetchMessages } from '../lib/actions';
import { useSession } from 'next-auth/react';
import ChatBox from './ChatBox';
import { Socket, io } from 'socket.io-client';
   
const socket:any = io('https://let-s-chat.onrender.com')
function ChatSection() {
  const chatCompare:any = useRef(null);
  const chatScroll:any=useRef(null)
  const { currentChat } = useContext(currentChatContext);
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messageInput, setMessageInput] = useState('');



  useEffect(() => {
    socket.emit('setup', currentChat.participants.find((participant:any) => participant.email === session?.user?.email));
    socket.on('connection', () => setIsSocketConnected(true));
},[currentChat.participants,session?.user?.email]);

  useEffect(() => {
    const getMessages = async () => {
      setMessages(await fetchMessages(currentChat._id));
      socket.emit('join chat', currentChat._id);
    }
    getMessages();
    chatCompare.current = currentChat;
   
  }, [currentChat]);

  useEffect(() => {
    const handleNewMessage = (newMessage:any) => {
      if (!chatCompare.current || chatCompare.current._id !== newMessage.chatId._id) {
        // Notify or handle the condition appropriately
      } else {
        setMessages((prevMessages:any) => [...prevMessages, newMessage]);
      }
    };
  
    socket.on('message received', handleNewMessage);
  
    return () => {
      socket.off('message received', handleNewMessage);
    };
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
