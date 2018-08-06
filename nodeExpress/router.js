/**
 * res.status(404).send('Bad Request');
 */
let express = require('express');

let app = express();

app.get('/', (req, res)=>{
   /**
    * res.send()只能发送一次请求，写2个send()报错Can't set headers after they are sent.
    */
   // res.send('Hello World');
   // res.send('next');

   /**
    * res.status(404)设置状态
    */
   //res.status(404).send('Bad Request');


   /*
   报错Can't set headers after they are sent.
   res.write('iiiiiiiiiiii');
   res.write('kkkkkkkkkkkkkk');
   res.write('qqqqqqqqqqqqq');
   res.send('xxxxxxxxxxxxx');*/

   /**
    * 发送多次
    */
   res.write('ewrwer');
   res.write('345454');
   res.end('34534543');//如果没有end，会一直加载中
 
});


app.get('/:name', (req, res)=>{
   let name = req.params.name;
   res.send(name)
})

app.get('/:name/:age', (req, res)=>{
   let name = req.params.name;
   let age = req.params.age;
   //或
   let name1 = req.params['name'];
   let age1 = req.params['age'];

   res.send({name1, age1})
})

app.listen(3000);