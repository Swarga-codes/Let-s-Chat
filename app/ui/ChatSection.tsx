import React, { useContext, useEffect, useState } from 'react'
import { currentChatContext } from '../lib/context'
import { fetchMessages } from '../lib/actions'
import { useSession } from 'next-auth/react'

function ChatSection() {
    const {currentChat}=useContext(currentChatContext)
    const {data:session}=useSession()
    const [messages,setMessages]=useState([])
    async function getMessages(){
        setMessages(await fetchMessages(currentChat._id))
    }
    useEffect(()=>{
getMessages()
    },[currentChat])
  return (
    <div className='p-3 overflow-y-scroll max-h-[64%]'>
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
  )
}

export default ChatSection