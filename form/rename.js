let http = require('http');
/**
 * 处理表单数据插件
 * https://github.com/felixge/node-formidable
 * 随机名称生成插件
 * https://github.com/broofa/node-uuid
 * path.extname():获取扩展名称
 * fs.rename()：替换文件名称
 * 
 */
let formidable = require('formidable');
let util = require('util');
let uuidV1 = require('uuid/v1');
let path = require('path');
let fs = require('fs');


/**
 * html表单中应设置enctype="multipart/form-data"，否则此处获取不到上传文件的数据
 */
http.createServer((req, res)=>{
   let linkUrl = req.url;
   if(linkUrl == '/postmsg' && req.method.toLowerCase() == 'post'){
      let form = new formidable.IncomingForm();
      
      //中文乱码设置此处的encoding不好使，得需要设置res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});中的charset
      form.encoding = 'utf-8';
      form.uploadDir = './uploads/';
      
      form.parse(req, (err, fields, files) => {
         
         //获取uuid随机数
         let fileName = uuidV1();
         
         //替换名称（此处的files.upload的upload是html的file的name字段，name起名是什么这里的files下就对应什么）
         console.log(files.upload)
         let name = files.upload.name;

         //path.extname()截取后缀名
         let ext = path.extname(name);

         //设置路径
         let oldPath = __dirname + "/" +files.upload.path;
         let newPath = __dirname + "/" + "uploads/" + fileName + ext;
         //改名
         fs.rename(oldPath, newPath, (err)=>{
            if(!err){
               res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
               res.write('received upload:\n\n');
               //util.inspect()将对象转化为字符串
               res.end(util.inspect({fields: fields, files: files}));
               console.log('写入成功')
            }else{
               throw err;
            }
         })
         
         
      });
   }
}).listen(8080, "localhost")