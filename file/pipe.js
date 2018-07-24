//1.引入模块
const fs = require('fs');

//2.创建读写流
let rs = fs.createReadStream('../assets/mint1year.mp4');
let ws = fs.createWriteStream('pipe.mp4');

//管道方式实现读写文件，pipe()方法封装了readstream.js文件的详细实现
rs.pipe(ws);