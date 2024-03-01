interface Participants{
    createdAt:string,
    email:string,
    name:string,
    profilePic:string,
    updatedAt:string,
    _id:string,
    
}
interface GroupChatParticipants{
    _id:string,
    name:string
}
interface Chats{
    GroupAdmin:string,
    GroupPhoto:string,
    chatName:string,
    createdAt:string,
    isGroupChat:boolean,
    lastMessageId:Message,
    participants: Participants[],
    updatedAt:string,
    _id:string
}

interface Message{
    chatId:Chats,
    content:string,
    createdAt:string,
    sender:Participants,
    updatedAt:string,
    _id:string
}
type SetChatsType = React.Dispatch<React.SetStateAction<Chats[]>>;
type SetMessagesType = React.Dispatch<React.SetStateAction<Message[]>>;
type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>;
type SetParticipantsType = React.Dispatch<React.SetStateAction<Participants[]>>;
type SetGroupChatParticipantsType = React.Dispatch<React.SetStateAction<GroupChatParticipants[]>>;
type SetMessageInputType = React.Dispatch<React.SetStateAction<string>>;


export type{Participants,Chats,Message,GroupChatParticipants,SetChatsType,SetMessagesType,SetOpenType,SetParticipantsType,SetGroupChatParticipantsType,SetMessageInputType}