/**
 * 1.分配用户昵称 nameResult
 * 2.加入房间 joinResult
 * 3.处理消息 message
 * 4.修改昵称 nameAttempt
 * 5.修改房间 join
 */
let socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

exports.listen = (server) => {
   io = socketio.listen(server);
   //io.set('log level', 1);
   //监听用户连接
   io.sockets.on('connection', (socket)=>{
      //赋予连接用户访客名称
      guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
      //加入聊天室Lobby
      joinRoom(socket, 'Lobby');
      //处理用户消息
      handleMessageBroadcasting(socket, nickNames);
      //更改用户名
      handleNameChangeAttempts(socket, nickNames, namesUsed);
      //聊天室的创建与变更
      handleRoomJoining(socket);
      //用户发出请求，向其提供已经被占用的聊天室的列表
      socket.on('rooms', () => {
         socket.emit('rooms', io.sockets.adapter.rooms);
      });
      //用户断开连接后的清除逻辑
      handleClientDisconnection(socket, nickNames, namesUsed);
   })
}

function assignGuestName(socket, guestNumber, nickNames, namesUsed){
   let name = 'Guest' + guestNumber;
   nickNames[socket.id] = name;
   //用户昵称
   socket.emit('nameResult', {
      success: true,
      name: name
   });
   namesUsed.push(name);
   return guestNumber + 1;
}

function joinRoom(socket, room) {
   socket.join(room);
   currentRoom[socket.id] = room;
   socket.emit('joinResult', {
      room
   });
   socket.broadcast.to(room).emit('message', {
      text: nickNames[socket.id] + 'has joined ' + room + '.'
   });
   let usersInRoom = io.sockets.adapter.rooms[room];
   var length = (usersInRoom && Object.keys(usersInRoom).length) || 0;
   if(length > 1){
      let usersInRoomSummary = 'Users currently in ' + room + ': ';
      for(let index in usersInRoom.sockets){
         let userSocketId = index;
         if(userSocketId != socket.id){
            if(index > 0){
               usersInRoomSummary += ', ';
            }
            usersInRoomSummary += nickNames[userSocketId];
         }
      }
      usersInRoomSummary += '.';
      socket.emit('message', {text: usersInRoomSummary})
   }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed){
   socket.on('nameAttempt', (name)=>{
      if(name.indexOf('Guest') == 0){
         socket.emit('nameResult', {
            success: false,
            message: 'Names cannot begin with "Guest".'
         })
      }else{
         if(namesUsed.indexOf(name) == -1){
            let previousName = nickNames[socket.id];
            let previousNameIndex = namesUsed.indexOf(previousName);
            namesUsed.push(name);
            nickNames[socket.id] = name;
            delete namesUsed[previousNameIndex];
            socket.emit('nameResult', {
               success: true,
               name: name
            })
            socket.broadcast.to(currentRoom[socket.id]).emit('message', {
               text: previousName + ' is now known as ' + name + '.'
            })
         }else{
            socket.emit('nameResult', {
               success: false,
               message: 'That name is already in use'
            })
         }
      }
   })
}

function handleMessageBroadcasting(socket, nickNames){
   socket.on('message', (message)=>{
      socket.broadcast.to(message.room).emit('message', {
         text: nickNames[socket.id] + ': ' + message.text
      })
   })
}

function handleRoomJoining(socket){
   socket.on('join', (room)=>{
      socket.leave(currentRoom[socket.id]);
      joinRoom(socket, room.newRoom);
   })
}

function handleClientDisconnection(socket, nickNames, namesUsed){
   socket.on('disconnect', ()=>{
      let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
      delete namesUsed[nameIndex];
      delete nickNames[nameIndex];
   })
}


