//引入模块
let http = require('http');

//创建服务器
let server = http.createServer((req, res)=>{
   //使用utf-8编码；解析html输出
   res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
   //文本形式输出
   //res.writeHead(200, {"Content-type":"text/plain;charset=UTF-8"})
   res.write("<h1>哈哈哈哈</h1>");
   res.end("结束前夕");
   //res.end只能使用一次，end后面的内容无法输出
   res.end('Hello world');

   //req 输出 /
   console.log(req.url);//路由
});


//监听端口号和主机
server.listen(8080, "localhost");