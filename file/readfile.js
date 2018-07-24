//1.引入模块
const fs = require('fs');

//2.读文件
fs.readFile('message.txt', (err, data)=>{
   if(!err){
      console.log(data);//<Buffer e5 a5 bd e7 a5 9e e5 a5 87 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6>
      console.log(data.toString());
   }else{
      throw err;
   }
});
/**
 * 读取视频，图片等文件，获取的二进制数据，需要写入文件才能知道是不是正确，使用toString()乱码
 */
//3.读取图片文件
fs.readFile('../assets/poster.jpg', (err, data)=>{
   if(!err){
      console.log(data);
      fs.writeFile('poster.jpg', data, (err) => {
         if(!err){
            console.log('写入图片成功');
         }else{
            throw err;
         }
      })
   }else{
      throw err;
   }
});

//4.读取视频文件

fs.readFile('../assets/mint1year.mp4', (err, data)=>{
   if(!err){
      console.log(data);
      fs.writeFile('music.mp4', data, (err)=>{
         if(!err){
            console.log('写入视频文件成功');
         }else{
            throw err;
         }
      })
   }else{
      throw err;
   }
})

