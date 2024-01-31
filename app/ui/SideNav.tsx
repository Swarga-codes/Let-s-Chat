'use client'
import React,{Fragment, useContext, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'

import Image from 'next/image'
import ChatLogo from '@/public/chat.png'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import SearchResults from './SearchResults'
import { fetchSearchResults } from '../lib/actions'
import { currentChatContext, welcomePageContext } from '../lib/context'
import { useSession } from 'next-auth/react'
function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function SideNav() {
const [searchQuery,setSearchQuery]=useState('')
const [searchData,setSearchData]=useState([])
const [isSearching,setIsSearching]=useState(false)
const [chats,setChats]=useState([])
const {isWelcome,setIsWelcome}=useContext(welcomePageContext)
const {setCurrentChat}=useContext(currentChatContext)
const {data:session}=useSession()
const pathname=usePathname()
if(pathname==='/login'){
  return null
}
function displayUser(participants){
  if(participants[0].email===session?.user?.email){
    return participants[1]
  }
  return participants[0]
}

async function fetchUserChats(){
  const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/myChats`)
  const data=await response.json()
  console.log(data)
  if(!data.error){
  setChats(data)
  }
}
useEffect(()=>{
fetchUserChats()
},[])

  return (
    <aside className="flex h-screen w-96 flex-col border-r bg-black px-5 py-8">
        <div className='flex'>
     <Image
            src={ChatLogo}
            alt="Chat Icon"
            width={40}
            height={40}
          />
          <span className='ml-4 my-auto font-semibold'>Let&apos;s Chat.</span>
          
          <Menu as="div" className="relative ml-auto">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
            src={"https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png"}
            alt="profile pic"
            width={40}
            height={40}
            
          />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={()=>signOut()}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div>
          </div>
          </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="mt-3 space-y-3">
         
           <input type="text" value={searchQuery} onChange={async(e)=>{
            setSearchQuery(e.target.value)
            if(searchQuery){
            setIsSearching(true)
            setSearchData(await fetchSearchResults(e.target.value))
            setIsSearching(false)
            }
           }
           } className='bg-gray-700 outline-none text-white p-2 px-4 w-full rounded-xl' placeholder='Search for users...'/>
          </div>
          {searchQuery && <SearchResults userData={searchData} isSearching={isSearching}/>}
          <div className="space-y-3 ">
            <label className="px-3 text-md font-semibold uppercase text-white">My Chats</label>
            {chats.map(chat=>(
              <div
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
           key={chat._id} onClick={()=>{
            setIsWelcome(false)
          setCurrentChat(chat)
          }}
            >
               <Image
            src={chat.isGroupChat?chat?.GroupPhoto:displayUser(chat.participants)?.profilePic}
            alt="profile pic"
            width={40}
            height={40}
          />
          <div className='ml-2'>
              <p className="mx-2 text-md font-semibold">{chat.chatName?chat.chatName:displayUser(chat.participants)?.name}</p>
            
              <p className="mx-2 text-sm font-md">{chat.lastMessageId?chat.lastMessageId?.content:"Start conversation!"}</p>
              </div>
            </div>
            ))
            }
          </div>

    
        </nav>
      </div>
    </aside>
  )
}
