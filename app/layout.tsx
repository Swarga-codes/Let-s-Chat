import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/app/ui/Providers'
import SideNav from '@/app/ui/SideNav'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata:Metadata={
  title:"Let's Chat",
  description:'It is a chatting platform where you can sign in with google search for users and chat with them in realtime.',
  icons:'../public/chat.png'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{overflow:'hidden'}}>
        <Providers>
        <div><Toaster/></div>
       {children}
          </Providers></body>
    </html>
  )
}
