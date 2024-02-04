import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
const app=express()
const server=createServer(app)
const io=new Server(server,{
    // pingTimeout:60000,
    cors:'http://localhost:3000'
})

io.on('connection',socket=>{
    console.log('connected to socket')
    socket.on('setup',userData=>{
        socket.join(userData._id)
        // console.log(userData._id);
        socket.emit("user connected")   
        socket.on('join chat',room=>{
            socket.join(room)
            console.log('Joined room',room)
        })
        socket.on('new message',(newMessage)=>{
            let chat=newMessage.chatId
            if(!chat.participants) return console.log('chat.participants is not defined')
            chat.participants.forEach(user=>{
        if(user._id==newMessage.sender._id) return
        socket.in(user._id).emit('message received',newMessage)
            })
        })
    })
})

server.listen(8000,()=>console.log('Listening...'))