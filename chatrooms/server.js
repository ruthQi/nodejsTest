let http = require('http');
let path = require('path');
let fs = require('fs');

let mime = require('mime');
let cache = {};//缓存文件对象
let chatServer = require('./lib/chat_server');

//发送文件数据及错误响应
function send404(res){
   res.writeHead(404, {'Content-Type': 'text/plain'});
   res.write('Error 404: resource not found');
   res.end();
}

//发送文件
function  sendFile(res, filePath, fileContents) {
   res.writeHead(200, {'Content-Type': mime.getType(path.basename(filePath))});
   res.end(fileContents);
}

//访问静态文件
function  serveStatic(res, cache, absPath) {
   if(cache[absPath]){
      sendFile(res, absPath, cache[absPath]);
   }else{
      //文件是否存在
      fs.access(absPath, (err)=>{
         if(!err){
            fs.readFile(absPath, (err, data)=>{
               if(!err){
                  cache[absPath] = data;
                  sendFile(res, absPath, data);
               }else{
                  send404(res);
               }
            })
         }else{
            send404(res);
         }
      })
   }
}

//创建服务器
let server = http.createServer((req, res)=>{
   let filePath = false;
   if(req.url == '/'){
      filePath = '/index.html';
   }else{
      filePath = req.url;
   }
   let absPath = './public' + filePath;
   serveStatic(res, cache, absPath);
});
chatServer.listen(server);
server.listen(3000);