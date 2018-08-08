let net = require('net');

let server = net.createServer((socket)=>{
   socket.on('data', (data)=>{
      socket.write(data + ',你好');
   });

   socket.on('end', ()=>{
      console.log('连接断开')
   });
   socket.write('欢迎光临')
});

server.listen(8124, 'localhost')