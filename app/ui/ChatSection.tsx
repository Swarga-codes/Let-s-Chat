import React, { useContext, useEffect, useState } from 'react'
import { currentChatContext } from '../lib/context'
import { fetchMessages } from '../lib/actions'
import { useSession } from 'next-auth/react'
import ChatBox from './ChatBox'
import { io } from 'socket.io-client'
const socket=io('http://localhost:8000')

function ChatSection() {
       let chatCompare;
    const {currentChat}=useContext(currentChatContext)
    const {data:session}=useSession()
    const [messages,setMessages]=useState([])
    const [isSocketConnected,setIsSocketConnected]=useState(false)
  const [messageInput,setMessageInput]=useState("")
    async function getMessages(){
        setMessages(await fetchMessages(currentChat._id))
        socket.emit('join chat',currentChat._id)
    }
  
    useEffect(()=>{
socket.emit('setup',currentChat.participants.filter(participant=>participant.email===session?.user?.email)[0])
socket.on('connection',()=>setIsSocketConnected(true))
    },[])
    useEffect(()=>{
        getMessages()
        chatCompare=currentChat
            },[messages])
            useEffect(()=>{
                socket.on('message received',(newMessage)=>{
                    if(!chatCompare || chatCompare._id!==newMessage.chatId._id){
                        //notify
                    }
                    else{
                        setMessages([...messages,newMessage])
                    }
                })
            
            })
  return (
    <>
    <div className='p-3 overflow-y-scroll max-h-[500px]'>
        {messages.length===0 && <p className='font-bold text-center'>Oops no texts! Start a conversation!</p>}
       {messages.length>0 && messages?.map(message=>(
        session?.user?.email!==message?.sender?.email?(
       <div className='bg-gray-700 p-3 w-fit rounded-md my-2' key={message._id}>
    <p>{message?.content}</p>
        </div>
        ):(
        <div className='bg-gray-700 p-3 w-fit rounded-md ml-auto my-2'  key={message._id}>
    <p>{message?.content}</p>
        </div>
        )
       ))}
      
    
    </div>
     <ChatBox setMessageInput={setMessageInput} messageInput={messageInput} messages={messages} setMessages={setMessages} socket={socket}/>
     </>
  )
}

export default ChatSection