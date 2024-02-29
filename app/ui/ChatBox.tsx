import React, { useContext } from 'react'
import { SendHorizontal } from 'lucide-react'
import { currentChatContext } from '../lib/context'
import { sendMessage } from '../lib/actions'
import { Message, SetMessageInputType, SetMessagesType } from '../lib/types'
import { Socket } from 'socket.io-client'

function ChatBox({ messageInput, setMessageInput, messages, setMessages, socket }:{messageInput:string,setMessageInput:SetMessageInputType,messages:Message[],setMessages:SetMessagesType,socket:Socket}) {
  const { currentChat } = useContext(currentChatContext)

  const handleSendMessage = async () => {
    const data = await sendMessage(currentChat._id, messageInput)
    socket.emit('new message', data)
    setMessages([...messages, data])
    setMessageInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='flex bottom-0 fixed border-t-2 border-gray-400 p-6 w-full items-center'>
      <input 
        type="text" 
        className='bg-gray-700 p-3 text-white outline-none rounded-lg w-2/3' 
        value={messageInput} 
        onChange={(e) => setMessageInput(e.target.value)} 
        onKeyPress={handleKeyPress} // Call handleKeyPress on key press
        placeholder='Enter your message...'
      />
      <SendHorizontal 
        className='ml-10 cursor-pointer' 
        height={35} 
        width={35} 
        onClick={handleSendMessage} // Call handleSendMessage on click
      />
    </div>
  )
}

export default ChatBox
