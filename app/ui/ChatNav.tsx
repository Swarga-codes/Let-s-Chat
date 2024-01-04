import React from 'react'
import Image from 'next/image'
function ChatNav() {
  return (
    <div className='flex p-6 border-b-2 border-b-gray-400'>
         <Image
            src={"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"}
            alt="profile pic"
            width={50}
            height={40}
          />
          <div className='ml-4'>
            <h1 className='text-xl font-semibold'>John Doe</h1>
            <p>online</p>
          </div>
          
        </div>
        
  )
}

export default ChatNav