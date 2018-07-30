let http = require('http');
let fs = require('fs');


http.createServer((req, res)=>{
   let url = req.url;
   if(url == "/get.html"){
      fs.readFile('./get.html', (err, data)=>{
         if(!err){
            res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"})
            res.end(data);
         }
      })
   }else if(url == "/post.html"){
      fs.readFile('./post.html', (err, data)=>{
         if(!err){
            res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"})
            res.end(data);
         }
      })
   }
}).listen(80, 'localhost')