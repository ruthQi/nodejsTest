//1.引入模块
let http = require('http');
let fs = require('fs');

//2.创建服务器
//res最后写入都要使用res.end(),使用res.write()一直转圈
let server = http.createServer((req, res)=>{
   let url = req.url;
   if(url == "/test1.html"){
      fs.readFile("test1.html", (err, data)=>{
         if(!err){
            res.end(data);
         }
      })
   }else if(url == "/test2.html"){
      fs.readFile("test2.html", (err, data)=>{
         if(!err){
            res.end(data);
         }
      })
   }else if(url == "/"){
      res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
      res.end("Hello World");
   }else if(url == "/css/index.css"){
      fs.readFile("./css/index.css", (err, data)=>{
         if(!err){
            res.writeHead(200, {"Content-Type":"text/css"});
            //此处使用res.write()导致页面一直转圈
            res.end(data);
         }
      })
   }else if(url == "/assets/poster.jpg"){
      fs.readFile("../assets/poster.jpg", (err, data)=>{
         if(!err){
            res.writeHead(200, {"Content-Type":"image/jpg"});
            //此处使用res.write()导致页面一直转圈
            res.end(data);
         }
      })
   }else if(url == "/assets/mint1year.mp4"){
      fs.readFile("../assets/mint1year.mp4", (err, data)=>{
         if(!err){
            res.writeHead(200, {"Content-Type":"video/mpeg4"});
            res.end(data);
         }
      })
   }else{
      res.writeHead(404, {"Content-Type":"text/html;charset=UTF-8"});
      res.end("您访问的页面飞走了");
   }
});

//3.监听
server.listen(8080,"localhost");