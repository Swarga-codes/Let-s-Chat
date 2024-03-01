import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Chats, Participants, SetOpenType } from '../lib/types'

export default function GroupChatDescription({open,setOpen,currentChat}:{open:boolean,setOpen:SetOpenType,currentChat:Chats}) {

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                   <div className='flex items-center'>
                   <Image
         src={"https://cdn-icons-png.freepik.com/512/2352/2352167.png"}
         alt="profile pic"
         width={50}
         height={40}
         className='bg-white rounded-lg'
       />
       <p className='text-lg ml-5'><b>{currentChat?.chatName}</b></p>
                   </div>
                  
                  </div>
                  <div className='mt-4 font-semibold'>
                    <p>{currentChat?.participants?.length} PARTICIPANTS</p>
                    <div className='overflow-y-scroll max-h-[25vh]'>

                  {currentChat?.participants?.map((participant:Participants)=>(
                     <div
              className="flex transform items-center rounded-lg p-2 cursor-pointer py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            key={participant._id} >
               <Image
            src={participant?.profilePic}
            alt="profile pic"
            width={40}
            height={40}
          />
          <div className='ml-2'>
              <p className="mx-2 text-md font-semibold">{participant?.name}</p>
            
              <p className="mx-2 text-sm font-md">{participant?.email}</p>
              </div>
             {participant?._id === currentChat?.GroupAdmin && <div className="ml-auto">
                <p className='font-bold text-red-500'>Admin</p>
              </div>}
            </div>)) }
            </div>
                   </div>
                </div>
                <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
