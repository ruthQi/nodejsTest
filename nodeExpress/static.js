/**
 * express实现静态资源文件获取
 */

 let express = require('express');

 let app = express();

 //设置静态资源访问路径
 //app.use(express.static('./public'));
 //与static文件夹下的实现功能一致

/*
   如果app.get('/')在上，输出的是hello world;如果静态文件夹设置在上，输出的是index.html文件
   app.use(express.static(__dirname + '/public')); === app.use('/', express.static(__dirname + '/public')); 
*/

 //app.use(express.static(__dirname + '/public')); // 等价：app.use(express.static('./public'));

 //设置静态资源文件为其他路由
 //并且可以设置多个
 
 //访问http://localhost:3000/static/时才可访问到资源；此时访问http://localhost:3000/可以正常输出hello world
 app.use('/static', express.static('./public'));
 //访问http://localhost:3000/file/时可以获取file文件夹下的静态资源
 app.use('/file', express.static('./file'));

 app.get('/', (req, res)=>{
    res.send('Hello World');
 });

 app.listen(3000);