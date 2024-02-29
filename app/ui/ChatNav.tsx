import React, { useContext } from 'react'
import Image from 'next/image'
import { currentChatContext } from '../lib/context'
import { useSession } from 'next-auth/react'
import { Participants } from '../lib/types'
function ChatNav() {
  const {currentChat}=useContext(currentChatContext)
  const {data:session}=useSession()
  function displayUser(participants:Participants[]){
    if(participants[0].email===session?.user?.email){
      return participants[1]
    }
    return participants[0]
  }
  return (
    <div className='flex p-6 border-b-2 border-b-gray-400'>
        {currentChat?.isGroupChat?
         <Image
         src={"https://cdn-icons-png.freepik.com/512/2352/2352167.png"}
         alt="profile pic"
         width={50}
         height={40}
         className='bg-white rounded-lg'
       />
        :
        <Image
            src={currentChat?.GroupPhoto?currentChat?.GroupPhoto:displayUser(currentChat?.participants)?.profilePic}
            alt="profile pic"
            width={50}
            height={40}
          />}
          <div className='ml-4'>
            <h1 className='text-xl font-semibold'>{currentChat?.chatName?currentChat?.chatName:displayUser(currentChat?.participants)?.name}</h1>
          {currentChat?.isGroupChat &&  <p>{currentChat?.participants.length} participants</p>}
          </div>
          
        </div>
        
  )
}

export default ChatNav