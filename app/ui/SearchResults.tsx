'use client'
import React from 'react'
import Image from 'next/image'
 function SearchResults({userData,isSearching}) {
    
  return (
    <div className='border-gray-400 border-2 rounded-lg'>
      {userData.length===0 && !isSearching && <p className='p-6'>No user found!</p>}
      {userData.length===0 && isSearching && <p className='p-6'>Searching for users...</p>}
         {userData?.map((user:string,idx:number)=>(

        
            <div
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
             key={idx}>
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