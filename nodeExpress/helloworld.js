let express = require('express');
let app = express();
/**
 * 路由：
 * app.METHOD(path, callback)
 * METHOD是一个HTTP的请求方法（get, post, put, head, delete等），path是服务器上的路径，callback是当路由匹配时要执行的函数
 * 
 * req.params.name：通过params参数获取传递的路径参数，:xxx => req.params.xxx
 */
app.get('/',(req, res)=>{
   res.send('Hello World!!!')
});

app.get('/html/:name', (req, res)=>{
   //console.log();
   let name = req.params.name
   res.send(name)
})
//监听在3000端口
app.listen(3000);