'use client'
import React from 'react'
import Image from 'next/image'
import { createChat, fetchUserChats } from '../lib/actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
 function SearchResults({userData,isSearching,setChats}:any) {
    const {data:session}=useSession()
  return (
    <div className='border-gray-400 border-2 rounded-lg'>
      {userData.length===0 && !isSearching && <p className='p-6'>No user found!</p>}
      {userData.length===0 && isSearching && <p className='p-6'>Searching for users...</p>}
         {userData?.map((user:any,idx:number)=>(

        
            <div
              className="flex transform items-center rounded-lg px-3 cursor-pointer py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
             key={idx} onClick={async()=>{
              if(user?.email===session?.user?.email){
                console.log('Cannot create a self chat...')
                return
              }
             
              if(window.confirm(`Do you want to start a conversation with ${user?.name} ?`)){

                const message=await createChat("",[user._id],false,session?.user?.email || "")
                if(message.success){
                  setChats(await fetchUserChats())
                  toast.success(message.success)
                }
                else{
                  toast.error(message.error)
                }
                
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

export default SearchResults