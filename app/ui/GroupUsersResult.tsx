'use client'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GroupChatParticipants, Participants, SetGroupChatParticipantsType } from '../lib/types'
 function GroupUsersResults({userData,isSearching,participants,setParticipants}:{userData:Participants[],isSearching:boolean, participants:GroupChatParticipants[],setParticipants:SetGroupChatParticipantsType}) {
    const {data:session}=useSession()
  return (
    <div className='border-gray-400 border-2 rounded-lg'>
      {userData.length===0 && !isSearching && <p className='p-6'>No user found!</p>}
      {userData.length===0 && isSearching && <p className='p-6'>Searching for users...</p>}
         {userData?.map((user:Participants,idx:number)=>(

        
            <div
              className="flex transform items-center rounded-lg px-3 cursor-pointer py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
             key={idx} onClick={async()=>{
           
           const isPresent=participants.filter((participant:GroupChatParticipants)=>participant.name===user?.name)
           if(user?.name===session?.user?.name){
            toast.error('Admin is already added by default!')
           }
           else if(!isPresent.length){
            setParticipants([...participants,{_id:user?._id,name:user?.name}])
           }
           else{
            toast.error('Participant already present!')
           }
             }}>
               <Image
            src={user?.profilePic}
            alt="profile pic"
            width={40}
            height={40}
          />
          <div className='ml-2'>
              <p className="mx-2 text-md font-semibold">{user?.name}</p>
            
              <p className="mx-2 text-sm font-md">{user?.email}</p>
              </div>
            </div>
             ))}
            
    </div>
  )
}

export default GroupUsersResults