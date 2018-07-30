let http = require('http');
//let url = require('url');
let querystring = require('querystring');

http.createServer((req,res)=>{
   let linkUrl = req.url;
   if(linkUrl == '/postmsg' && req.method.toLowerCase() == "post"){
      console.log('888888888')
      let allData = '';
      req.on('data', (data)=>{
         allData += data;
      })
      req.once('end', ()=>{
         console.log('结束');
         console.log(allData)
         let dataObj = querystring.parse(allData)
         console.log(dataObj)    
      })
      res.end('post');
   }
}).listen(8080, "localhost");