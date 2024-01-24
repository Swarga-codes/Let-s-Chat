import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {redirect} from 'next/navigation'
const handler=NextAuth({
  providers:[GoogleProvider({
    clientId:process.env.AUTH_GOOGLE_ID??"",
    clientSecret:process.env.AUTH_GOOGLE_SECRET??""
  })],
  callbacks:{
    async signIn({user,account}){
      if(account.provider==='google'){
     try{
      const res=await fetch('http://localhost:3000/api/authLogic',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name: user.name,
          email: user.email,
          profilePic: user.image
        })
      })
    
    if(res.ok){
      return user
    }
    
     
     }
     catch(err){
      console.log(err)
     }
    }
      return user
    }
  }
})

export {handler as GET, handler as POST}