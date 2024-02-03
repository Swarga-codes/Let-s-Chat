'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import WelcomePage from '@/app/ui/WelcomePage'
import ChatNav from '@/app/ui/ChatNav'
import ChatBox from '@/app/ui/ChatBox'
import ChatSection from './ui/ChatSection'
import { useEffect, useState } from 'react'
import SideNav from './ui/SideNav'
import { welcomePageContext,currentChatContext } from './lib/context'

export default function Home() {
  const {data:session}=useSession()
  const [isWelcome,setIsWelcome]=useState(true)
  const [currentChat,setCurrentChat]=useState()
  if(!session){
redirect('/login')
  }
  
  return (
    <>
    <welcomePageContext.Provider value={{isWelcome,setIsWelcome}}>
      <currentChatContext.Provider value={{currentChat,setCurrentChat}}>
      <div className='flex'>
            <SideNav/>
            <div className='flex-1'>
            {isWelcome?
     <WelcomePage/>
     :
     <>
     <ChatNav/>
     <ChatSection/>
     </>}
          </div>
          </div>
          </currentChatContext.Provider>
          </welcomePageContext.Provider>
    </>
   
  )
}
