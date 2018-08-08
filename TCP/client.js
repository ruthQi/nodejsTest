/**
 * 启动client.js与server.js
 * 
client connected!
欢迎光临
world,你好
client disconnect
client close
 */
let net = require('net');

let client = net.connect({port:8124}, ()=>{
   console.log('client connected!');
   client.write('world');
})

client.on('data', (data)=>{
   console.log(data.toString());
   client.end();
})

client.on('end', ()=>{
   console.log('client disconnect')
})
client.on('close', ()=>{
   console.log('client close')
})