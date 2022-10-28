const path=require('path');
const http = require('http');
const express= require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const app=express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
  console.log(" New  connection . . .");
    //Welcome current user 
  socket.emit('message',"Welcome to My_Chat_Site");

  //Runs When Client Disconnects
  socket.broadcast.emit('message',"A new User Joined the chart . . ");
  //
  socket.on('disconnect',()=>{
      io.emit('message'," One User Has Left the Chat Room . .");
  });

  //Listen for chat message
socket.on('chatMessage',msg=>{
  io.emit('message',msg);
 });

});

const PORT=4500 || process.env.PORT;
server.listen(PORT,()=>console.log("server Started . . ."));