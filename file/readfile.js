//1.引入模块
const fs = require('fs');

//2.读文件
fs.readFile('message.txt', (err, data)=>{
   if(!err){
      console.log(data);//<Buffer e5 a5 bd e7 a5 9e e5 a5 87 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6>
   }else{
      throw err;
   }
})