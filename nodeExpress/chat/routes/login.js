let express = require('express');
let router = express.Router();
let user = require('../db');


router.get('/', (req, res, next)=>{
   res.render('login', {title:"登录"});
})

router.post('/', (req, res, next)=>{
   let username = req.body.username;
   let password = req.body.password;
   user.find({username}, (err, data)=>{
      if(!err){
         if(data.length == 0){
            res.send('请先注册再登录')
         }else{
            if(password == data[0].password){
               console.log('登录成功');
               res.redirect('/chat');
            }else{
               res.send('密码输入错误')
            }
         }
      }else{
         throw err;
      }
   })
})

module.exports = router;