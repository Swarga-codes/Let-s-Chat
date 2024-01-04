'use client'
import React from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench, Search } from 'lucide-react'
import Image from 'next/image'
import ChatLogo from '@/public/chat.png'
import { usePathname } from 'next/navigation'
export default function SideNav() {
const pathname=usePathname()
if(pathname==='/login'){
  return null
}

  return (
    <aside className="flex h-screen w-96 flex-col overflow-y-auto border-r bg-black px-5 py-8">
        <div className='flex'>
     <Image
            src={ChatLogo}
            alt="Chat Icon"
            width={40}
            height={40}
          />
          <span className='ml-4 my-auto font-semibold'>Let&apos;s Chat.</span>
          </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="mt-3 space-y-3">
         
           <input type="text" className='bg-gray-700 outline-none text-white p-2 px-4 w-full rounded-xl' placeholder='Search for users...'/>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-md font-semibold uppercase text-white">My Chats</label>
            <div
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            >
               <Image
            src={"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"}
            alt="profile pic"
            width={40}
            height={40}
          />
          <div className='ml-2'>
              <p className="mx-2 text-md font-semibold">John Doe</p>
            
              <p className="mx-2 text-sm font-md">Heyy!</p>
              </div>
            </div>
          </div>

    
        </nav>
      </div>
    </aside>
  )
}
