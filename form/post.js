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