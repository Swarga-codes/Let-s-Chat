import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
const app=express()
const server=createServer(app)
const io=new Server(server,{
    pingTimeout:60000,
    cors:'http://localhost:3000'
})

io.on('connection',socket=>{
    console.log('User joined',socket.id)
})

server.listen(8000,()=>console.log('Listening...'))