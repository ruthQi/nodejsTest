/**
 * curl工具安装教程：https://blog.csdn.net/qq_21126979/article/details/78690960?locationNum=10&fps=1
 */
//引入模块
/**
执行：curl -v http://localhsot:8080
//TCP 3次握手
* Rebuilt URL to: http://localhost:8080/
*   Trying ::1...
* TCP_NODELAY set
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 8080 (#0)
//客户端向服务器发送的请求报文
> GET / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.61.0
> Accept: \* *//*
>
//服务器端发送的响应内容，包括响应头和响应体
< HTTP/1.1 200 OK
< Content-type: text/html;charset=UTF-8
< Date: Wed, 08 Aug 2018 03:22:13 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
<h1>鍝堝搱鍝堝搱</h1>缁撴潫鍓嶅
//结束会话的信息
* Connection #0 to host localhost left intact
 **/
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