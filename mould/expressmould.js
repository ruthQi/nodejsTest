/**
 * 与jsondata.js文件实现的功能相同
 * 此处使用express模板实现
 */
let express = require('express');
let app = express();
let fs = require('fs');

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
   getJsonData((jsonData)=>{
      res.render('index', jsonData);
   })
})

const getJsonData = (callBack) => {
   fs.readFile('./data.json', (err, data)=>{
      if(!err){
         let jsonData = JSON.parse(data);
         callBack(jsonData);
      }
   })
}
app.listen(3000);