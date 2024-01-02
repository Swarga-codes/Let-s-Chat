import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from '@/app/lib/database'

const handler=NextAuth({
    providers:[GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })],
    callbacks:{
        async session({session}){
            return session
        },
        async signIn({profile}){
            console.log(profile)
          try{
            await connectDB()
            return true
          } catch(err){
            console.log(err)
            return false
          }
        }
        
    }
})

export {handler as GET, handler as POST}