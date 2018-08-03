let http = require('http');
/**
 * 处理表单数据插件
 * https://github.com/felixge/node-formidable
 * 
 * util.inspect()将对象转化为字符串
 */
let formidable = require('formidable');

let util = require('util');


/**
 * html表单中应设置enctype="multipart/form-data"，否则此处获取不到上传文件的数据
 */
http.createServer((req, res)=>{
   let linkUrl = req.url;
   if(linkUrl == '/postmsg' && req.method.toLowerCase() == 'post'){
      let form = new formidable.IncomingForm();
      //中文乱码设置此处的encoding不好使，得需要设置res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});中的charset
      form.encoding = 'utf-8';
      console.log(form)
      form.uploadDir = './uploads/';
      //设置此属性保持后缀
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
         console.log(fields);
         console.log(files)
         if(!err){
            res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
            res.write('received upload:\n\n');
            //util.inspect()将对象转化为字符串
            res.end(util.inspect({fields: fields, files: files}));
         }else{
            throw err;
         }
         
      });
   }
}).listen(8080, "localhost")