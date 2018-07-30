//1.引入模块
let mongoose = require('mongoose');

let db = mongoose.connection;
//2.链接数据库
mongoose.connect('mongodb://localhost/m_data');

//监听数据库连接
db.once('open', ()=>{
   console.log('连接成功');
})

//创建数据库原型
let Schema = mongoose.Schema;
//创建Schema
let personSchema = new Schema({
   name:String,
   age:Number,
   sex:{
      type:String,
      default: "男"
   },
   chat:String
});
//创建collection
let person = mongoose.model('person', personSchema);


//4.增删改查
//4-3:改

//更新年龄为50岁
person.update({name:"周华健"},{$set:{age:50}}, (err, raw)=>{
   if(!err){
      //{ n: 1, nModified: 1, ok: 1 }
      console.log(raw)
   }else{
      throw err; 
   }
})
//这条更新语句不能起作用，不能添加friend字段
person.update({name:"周华健"},{$set:{friend:"好友"}}, (err, raw)=>{
   if(!err){
      //{ ok: 0, n: 0, nModified: 0 }
      console.log(raw)
   }else{
      throw err; 
   }
})

//删除年龄为40的sex字段
person.update({age: 40},{$unset:{sex:1}}, (err, raw)=>{
   if(!err){
      //{ n: 1, nModified: 1, ok: 1 }
      console.log(raw)
   }else{
      throw err; 
   }
})

//updateOne更新一条数据
person.updateOne({sex:"男"}, {$set:{age: 50}}, (err, raw)=>{
   if(!err){
      console.log(raw)
   }else{
      throw err;
   }
})

//updateMany更新多条数据
person.updateMany({sex:"男"}, {$set:{age: 51}}, (err, raw)=>{
   if(!err){
      //{ n: 3, nModified: 3, ok: 1 }
      console.log(raw)
   }else{
      throw err;
   }
})

//update+nulti:true === updateMany
person.update({sex:"女"}, {$set:{chat:"小公举"}},{multi: true}, (err, raw)=>{
   if(!err){
      //{ n: 5, nModified: 5, ok: 1 }
      console.log(raw)
   }else{
      throw err;
   }
}) 
