//文件流

//1.引入fs
const fs = require('fs');

//2:创建文件流通道
let ws = fs.createWriteStream('stream.txt');
console.log(ws);

//监听通道开启与关闭
ws.once('open', ()=>{
   console.log('通道已打开')
});

ws.once('close', ()=>{
   console.log('通道已关闭')
})

//写入内容
ws.write('我在马路边');
ws.write('捡到一分钱');
ws.write('买了一把刀');
ws.write('杀死一头牛');

//关闭通道
ws.end();



