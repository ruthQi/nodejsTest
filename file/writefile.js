//1.引入依赖
const fs = require('fs');
//==================================同步处理文件=======================

//2.打开文件
let fd = fs.openSync('hello.txt', 'w');//写入hello.txt文件，如果没有txt文件的话创建txt文件

//3.写入内容
fs.writeFileSync(fd, '今天天气很好！gdfgdfg');

//4.关闭文件
fs.closeSync(fd);

//=============================异步处理文件==========================
/**s:同步模式，+读写，x:如果存在则打开失败
 * a:打开文件用于追加，如果文件不存在，创建文件
 * ax:和a相同，但是，文件已经存在的话运行报错:EXIST: file already exists, open 'E:\workspace\nodejsTest\buffer\message.txt'
 * a+:打开文件进行读取和追加，如果不存在则创建文件；Open file for reading and appending. The file is created if it does not exist.
 * ax+:打开文件进行读取和追加，如果路径存在则失败；Like 'a+' but fails if the path exists.:Error: EEXIST: file already exists, open 'E:\workspace\nodejsTest\buffer\message.txt'
 * as:Open file for appending in synchronous mode. The file is created if it does not exist:此处使用as报错
 * as+: Open file for reading and appending in synchronous mode. The file is created if it does not exist.
 * r:读取文件，文件不存在则出现异常；Open file for reading. An exception occurs if the file does not exist.
 * r+:读写文件，文件不存在则出现异常；Open file for reading and writing. An exception occurs if the file does not exist.
 * rs:在同步模式下打开文件用于读取；Open file for reading in synchronous mode.
 * rs+:在同步模式下打开文件用于读写；Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
 * w:打开文件用于写操作，如果不存在则创建，如果存在则截断；Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 * wx:打开文件用于写操作，如果存在则打开失败；Like 'w' but fails if the path exists.//Error: EEXIST: file already exists, open 'E:\workspace\nodejsTest\buffer\message.txt'
 * w+:打开文件用于读写，如果不存在则创建，如果存在则截断；Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
 * wx+: 打开文件用于读写，如果存在则打开失败；Like 'w+' but fails if the path exists.
 */
//2.打开文件
//异步方法，结果返回都在回调函数中
fs.open('message.txt', 'w', (err, fd)=>{//写入message.txt，文件不存在的话，创建message.txt
   if(!err){
      //写入内容
      fs.writeFile(fd, '好神奇哦哦哦哦哦哦', (err)=>{
         if(!err){
            console.log('写入成功');
            fs.close(fd, (err)=>{
               if(!err){
                  console.log('关闭成功')
               }else{
                  throw err;
               }
            })
         }else{
            throw err;
         }
      })
      //=======================r============
      // fs.readFile(fd, (err, data)=>{
      //    if(!err){
      //       console.log(data);//<Buffer e5 a5 bd e7 a5 9e e5 a5 87 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 a5 bd e7 a5 9e e5 a5 87 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 a6 e5 93 ... >
      //       console.log(data.toString())//好神奇哦哦哦哦哦哦好神奇哦哦哦哦哦哦好神奇哦哦哦哦哦哦
      //    }else{
      //       throw err;
      //    }
         
      // })
   }else{
      throw err;
   }
})
