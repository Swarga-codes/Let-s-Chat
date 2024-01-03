'use client'
import React from 'react'
import Image from 'next/image'
import ChatLogo from '@/public/chat.png'
import { useSession, signIn,signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Page() {
const {data:session}=useSession()
if(session){
  redirect('/')
}
  return (
   <>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src={ChatLogo}
            alt="Chat Icon"
            width={30}
            height={30}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         
            <div>
              {session && session.user?
               <button
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={()=>signOut()}
             >
               Sign Out
             </button>
             :
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={()=>signIn()}
             >
                Sign in with Google
              </button>
              
             
}
            </div>
       

         
        </div>
      </div>
   </>
  )
}
