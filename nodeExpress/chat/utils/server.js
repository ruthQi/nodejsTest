//1.引入包
let socket = require('socket.io');

const linkSocket = (server) => {
   //2.实例化
   let io = socket(server);
   //3.建立连接
   io.on('connection', (socket)=>{
      console.log('连接成功');
      //3.1:返回消息
      socket.emit('msg', '欢迎来找小撩聊天');
      //3.2 接收客户端的消息
      socket.on('message', (data)=>{
         console.log(data);
         //实现多页面通信
         //io.emit('msg', data);//与客户端on监听的消息一致
         //单页面通信
         let msg = backMsg(data);
         socket.emit('msg', msg)
      });

      //3.3关闭连接
      socket.on('disconnect', ()=>{
         console.log('连接已经关闭')
      })
   })

}

let backMsg = (data) => {
   let msg = '';
   switch (data) {
      case '你好':
         msg = '下午好';
         break;
      case '明天天气':
         msg = '北京市海淀区多云转小雨';
         break;
      case '吃饭了吗':
         msg = '正在努力改bug';
         break;
      case '我美吗':
         msg = '你没有我美';
         break;
      default:
         msg = '系统正在努力升级中...'
         break;
   }
   return msg;
}


module.exports = linkSocket;