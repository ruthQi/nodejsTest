let express = require('express');
let router = express.Router();
let user = require('../db');

router.get( '/', (req, res, next)=>{
   res.render('modify', {title:'修改密码'});
})

router.post('/', (req, res, next)=>{
   let oldPassword = req.body.oldpassword;
   let newPassword = req.body.newpassword;
   let username = req.body.username;


   user.find({username}, (err, data)=>{
      console.log(oldPassword == data[0].password)
      if(!err){
         if(data.length == 0){
            res.send('用户不存在');
         }else{
            if(oldPassword == data[0].password){
               user.update({username}, {$set:{password: newPassword}}, (err)=>{
                  if(!err){
                     console.log('密码修改成功')
                     res.redirect('/login');
                  }
               })
            }else{
               res.send('输入的旧密码不一致')
            }
         }
      }
   })
})

module.exports = router;