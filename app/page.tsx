'use client'
import { useSession,signOut } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
  const {data:session}=useSession()
  if(!session){
redirect('/login')
  }
  return (
    <><h1>Welcome</h1>
     <button
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={()=>signOut()}
             >
               Sign Out
             </button>
    </>
   
  )
}
