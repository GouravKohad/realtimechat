const express = require('express');
const app = express();
const http = require('http');
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let home = path.resolve('./public/index.html')
app.get('/',(req,res)=> {
  res.sendFile(home)
})
let users={}
io.on('connection', (socket) => {
  socket.on('new-user',name=> {
    console.log(name)
    users[socket.id]=name
    socket.broadcast.emit('new-user-found',name)
  })
  socket.on('new-chat',(data)=> {
    socket.broadcast.emit('create-chat',{name:data.name, message:data.message})
  })
  
});

server.listen(8700, () => {
  console.log('listening on *:8700');
});