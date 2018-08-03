//引入模块
let http = require('http');
let url = require('url');
let {URL} = require('url');
/**
 * 如果url为完整路径，使用new URL()方式，如果不完整，使用url.parse()方式
 */
http.createServer((req, res)=>{
   //方式1(最佳)
   let myUrl = url.parse(req.url);//url对象
   //undefined;myUrl.query:test=1不是个对象，不能使用.来获取test;url.parse(url,true)可以把字符串转化为对象，用.来调用
   console.log(myUrl.query && myUrl.query.test);
   console.log(myUrl.search);
   console.log(myUrl.hash);//null
   //WHATWG API,使用这种方式new URL(req.url)，报错,因为req.url是从path开始的，路径不完整，最好使用url.parse()方式
   //let myUrl1 = new URL(req.url);
   let myUrl1 = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
   console.log(myUrl1)
   res.end('Hello World');
   
}).listen(8080,'localhost');
