let http = require('http');
let fs = require('fs');
let ejs = require('ejs');

http.createServer((req, res)=>{
   //读取json文件获取数据
   getJsonData((jsonData)=>{
      //读取ejs文件
      fs.readFile('./views/index.ejs', (err, data)=>{
         if(!err){
            let ejsData = data.toString();
            //绑定ejs文件和数据
            let tmp = ejs.render(ejsData, jsonData);
            res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
            //返回数据
            res.end(tmp);
         }else{
            res.writeHead(500, {"Content-Type":"text/html;charset=UTF-8"});
            res.end('读取文件失败');
         }
      })
   })
}).listen(8080,"localhost");

const getJsonData = (callback) => {
   fs.readFile('./data.json', (err, data)=>{
      if(!err){
         let jsonData = JSON.parse(data.toString());
         callback(jsonData);
      }else{
         throw err;
      }
      
   })
}