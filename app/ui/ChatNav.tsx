import React, { useContext,useState } from 'react'
import Image from 'next/image'
import { currentChatContext } from '../lib/context'
import { useSession } from 'next-auth/react'
import { Participants } from '../lib/types'
import GroupChatDescription from './GroupChatDescription'
function ChatNav() {
  const {currentChat}=useContext(currentChatContext)
  const [open, setOpen] = useState<boolean>(false)
  const {data:session}=useSession()
  function displayUser(participants:Participants[]){
    if(participants[0].email===session?.user?.email){
      return participants[1]
    }
    return participants[0]
  }
  return (
    <>
    <div className='flex p-6 border-b-2 border-b-gray-400 items-center'>
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
       {currentChat?.isGroupChat &&   <div className='ml-auto mr-4' onClick={()=>setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>

        </div>}
        </div>
        <GroupChatDescription open={open} setOpen={setOpen} currentChat={currentChat}/>
        </> 
  )
}

export default ChatNav