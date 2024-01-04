import React from 'react'
import ChatLogo from '@/public/chat.png'
import Image from 'next/image'
function WelcomePage() {
  return (
    <div className='ml-auto flex flex-col items-center w-full justify-center h-full'>
        <Image
        src={ChatLogo}
        width={150}
        height={150}
        alt='App logo'
        />
        <h1 className='font-bold text-3xl mt-2'>Welcome to My Chat!</h1>
    </div>
  )
}

export default WelcomePage