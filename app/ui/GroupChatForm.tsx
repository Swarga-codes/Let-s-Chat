import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import GroupUsersResults from './GroupUsersResult'
import { createChat,fetchUserChats } from '../lib/actions'
import { useSession } from 'next-auth/react'
export default function GroupChatForm({open,setOpen,setChats}:any) {
    const [search,setSearch]=useState("")
    const [groupName,setGroupName]=useState("")
    const [isSearching,setIsSearching]=useState(false)
    const [SearchResult,setSearchResult]=useState([])
    const [participants,setParticipants]=useState([])
  const cancelButtonRef = useRef(null)
  const {data:session}=useSession()
  async function fetchSearchResults(query:string){
    if(!query) return []
    const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/search/users/${query}`)
    const data=await response.json()
    setSearchResult(data)
    setIsSearching(false)
  }
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
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h1" className="text-base font-semibold leading-6 text-white">
                        Create a Group Chat
                      </Dialog.Title>
                      <div className="w-full mt-5">
      <input
        className="flex h-10 w-96 rounded-md border border-white/30 bg-gray-700 text-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter the group name"
        value={groupName}
        onChange={(e)=>{
          setGroupName(e.target.value)
        }}
      ></input>
    </div>
                      <div className="w-full mt-5 mb-5">
      <input
        className="flex h-10 w-96 rounded-md border border-white/30 bg-gray-700 text-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Search users by email"
        value={search}
        onChange={async(e)=>{
          
          setSearch(e.target.value)
          if(search){
            setIsSearching(true)
          await fetchSearchResults(search)
          }
        }}
      ></input>
    </div>
    <div className='flex flex-wrap'>
    {participants?.map((participant:any,idx:number)=>(
    <div className="flex p-2 bg-blue-600 w-fit rounded-lg mr-2 mb-2" key={idx}>
      <p className='mr-2'>{participant?.name}</p>
      <svg onClick={()=>{
        participants.splice(idx,1)
        setParticipants([...participants])
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>))}
  
    </div>
    {search && <GroupUsersResults userData={SearchResult} isSearching={isSearching} setChats={setChats} participants={participants} setParticipants={setParticipants}/>}

                     
                    </div>
                  </div>
                </div>
                <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={async() => {
             
              if(window.confirm(`Do you want to create a group with name ${groupName} ?`)){
                const participantIds=participants.map((participant:any)=>participant.id)
                const message=await createChat(groupName,participantIds,true,session?.user?.email || "")
                if(message.success){
                  setChats(await fetchUserChats())
                  setOpen(false)
                }
                
                
              }
                    }}
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border-white bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-transparent sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
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
