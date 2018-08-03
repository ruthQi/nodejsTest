/**
 * path.normalize(path):规范化给定的 path
 * path.extname(path):获取path的扩展名
 */
let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');


//1.创建服务器
http.createServer((req, res)=>{
   //1.获取url地址
   let pathUrl = url.parse(req.url);
   let pathName = pathUrl.pathname;
   
   //2.获取资源路径
   if(pathName.lastIndexOf('.') == -1){//文件夹
      pathName += '/index.html';
   }
   pathName = './' + path.normalize('./public/'+pathName);
   //3.获取文件后缀名
   let extName = path.extname(pathName);
   //4.读取资源文件内容
   fs.readFile(pathName, (err, data)=>{
      if(!err){
         console.log(data)
         //通过后缀名获取渲染的文件类型
         getContentType(extName, (contentType)=>{
            console.log(contentType)
            res.writeHead(200, {"Content-Type":`${contentType};charset=UTF-8`});
            res.end(data);
         })  
      }else{
         res.writeHead(404, {"Content-Type":"text/html;charset=UTF-8"});
         res.end('<h1>您的页面飞走了</h1>');
      }
   })
}).listen(8080,"localhost");

function getContentType(extName, callBack){
   fs.readFile('./mime.json', (err, data)=>{
      if(!err){
         let mimeJson = JSON.parse(data);
         let contentType = mimeJson[extName];
         callBack(contentType);
      }
   })
}