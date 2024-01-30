import React, { useContext, useState } from 'react'
import { SendHorizontal } from 'lucide-react'
import { currentChatContext } from '../lib/context'
import { sendMessage } from '../lib/actions'
function ChatBox() {
  const {currentChat}=useContext(currentChatContext)
  const [message,setMessage]=useState("")

  return (
    <div className='flex bottom-0 fixed border-t-2 border-gray-400 p-6 w-full items-center'>
        <input type="text" className='bg-gray-700 p-3 text-white outline-none rounded-lg w-2/3' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter your message...'/>
        <SendHorizontal className='ml-10 cursor-pointer' height={35} width={35} onClick={()=>{
          sendMessage(currentChat._id,message)
        }}/>
    </div>
  )
}

export default ChatBox