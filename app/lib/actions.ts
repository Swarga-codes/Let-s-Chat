


async function createChat(chatName:string,participants:string[],isGroupChat:boolean,GroupAdminEmail:string){
    const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/createChat`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            chatName,
            participants,
            isGroupChat,
            GroupAdminEmail
        }),
    })
    const data=await response.json()
    return data
}

async function fetchUserChats(){
    const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/myChats`)
    const data=await response.json()
    return data
}


async function sendMessage(chatId:string,content:string) {
    const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/sendMessage`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            chatId,
            content
        })
        
    })
    const data=await response.json()
    return data
}

async function fetchMessages(chatId:string) {
    const response=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/messages/${chatId}`)
    const data=await response.json()
   return data
    
}

export {createChat, fetchUserChats, sendMessage, fetchMessages}