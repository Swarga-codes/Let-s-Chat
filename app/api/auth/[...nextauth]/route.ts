import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

 const authOptions={
  providers:[GoogleProvider({
    clientId:process.env.AUTH_GOOGLE_ID??"",
    clientSecret:process.env.AUTH_GOOGLE_SECRET??""
  })],
  callbacks:{
    async signIn({user,account}:any){
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
    
   
    
     
     }
     catch(err){
      console.log(err)
     }
    }
      return user
    },
    async jwt({token,account}){
      token.accessToken=account?.access_token
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
}
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}