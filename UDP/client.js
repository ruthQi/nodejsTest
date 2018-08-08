let dgram = require('dgram');
let message = new Buffer('深入浅出Node.js');
let client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 41234, "localhost", (err, bytes)=>{
   console.log(bytes);
   client.close();
})