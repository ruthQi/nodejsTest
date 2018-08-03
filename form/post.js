/**
 * querystring.parse():该方法会把一个 URL 查询字符串 str 解析成一个键值对的集合。
 */
let http = require('http');
//let url = require('url');
let querystring = require('querystring');

http.createServer((req,res)=>{
   let linkUrl = req.url;
   if(linkUrl == '/postmsg' && req.method.toLowerCase() == "post"){
      console.log('888888888')
      let allData = '';
      req.on('data', (data)=>{
         console.log(data.toString());//name=fsfss&age=435&sex=%E7%94%B7&college=Python&college=Java&upload=rank-arrow.png
         allData += data;//data有buffer转为字符串
      })
      req.once('end', ()=>{
         //name=sdf&age=12&sex=%E5%A5%B3&college=HTML5&college=Java&file=no5.png
         console.log(allData)
         let dataObj = querystring.parse(allData);
         /**
          * { name: 'sdf',
               age: '12',
               sex: '女',
               college: [ 'HTML5', 'Java' ],
               file: 'no5.png' }
          */
         console.log(dataObj)  
         res.end(allData);  
      })
      
   }
}).listen(8080, "localhost");