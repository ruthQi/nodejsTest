let express = require('express');
let router = express.Router();
let user = require('../db');

router.get('/', (req, res, next)=>{
   res.render('reg', {title: "注册"})
})

router.post('/', (req, res, next)=>{
   console.log(req.body)
   let username = req.body.username;
   let password = req.body.password;
   console.log(username)
   user.find({username: username}, (err, data)=>{
      console.log(data)
      if(!err){
         if(data.length == 0){
            user.create(req.body, (err, data)=>{
               if(!err){
                  console.log('注册成功');
                  res.redirect('/login');
               }
            })
         }else{
            console.log('用户名已存在，请登录');
            console.log(data)
            res.redirect('/login');
         }
         
      }
   })
})

module.exports = router;