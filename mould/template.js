let mongoose = require('mongoose');
let http = require('http');
let fs = require('fs');
let ejs = require('ejs');

//数据库链接
let db = mongoose.connection;

mongoose.connect('mongodb://localhost/template');

db.once('open', ()=>{
   console.log('连接成功')
})

let Schema = mongoose.Schema;

let listSchems = new Schema({
   title: String,
   count: Number,
   up:Number
});

let list = mongoose.model('list', listSchems);

list.find({},"-_id", (err, data)=>{
   console.log(data)
})

//创建服务器
http.createServer((req, res)=>{
   //方式1.服务器请求数据方式
   list.find({},(err, arr)=>{
      console.log(arr);
      if(!err){
         //2.读取ejs文件
         fs.readFile('views/index.ejs', (err, data)=>{
            let dataStr = data.toString();
            //获取模板绑定数据
            let tmp = ejs.render(dataStr, {lists:arr});
            res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
            //返回数据
            res.end(tmp);
         })
      }else{
         throw err;
      }
   })
   
}).listen(8080,"localhost")