/**
 * url.parse(req.url, true);
 */
let http = require('http');
let url = require('url');

http.createServer((req, res)=>{
   /*parse()方法parseQueryString <boolean> 如果为 true，
   则 query 属性总会通过 querystring 模块的 parse() 方法生成一个对象。 
   如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串。 默认为 false。*/
   //设置为true,获取的是对象的格式
   let parseUrl = url.parse(req.url, true);
   //{ name: 'erew', age: '20', sex: '女' }
   console.log(parseUrl.query);
   let query = parseUrl.query;
   console.log(query.name);
   console.log(query.age);
   console.log(query.sex);
   res.end('GET')
}).listen(8080, 'localhost')