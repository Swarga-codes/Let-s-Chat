'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import WelcomePage from '@/app/ui/WelcomePage'
import ChatNav from '@/app/ui/ChatNav'
import ChatBox from '@/app/ui/ChatBox'
import ChatSection from './ui/ChatSection'

export default function Home() {
  const {data:session}=useSession()
  if(!session){
redirect('/login')
  }
  return (
    <>
     {/* <WelcomePage/> */}
     <ChatNav/>
     <ChatSection/>
     <ChatBox/>
    </>
   
  )
}
