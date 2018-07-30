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
//4-4:删

/**
 * deleteOne, deleteMany, remove
 */

//删除一条数据
person.deleteOne({name:"那英"}, (err)=>{
   if(!err){
      console.log('删除成功')
   }else{
      throw err;
   }
})

//移除数据
person.remove({age:{$lt: 20}}, (err)=>{
   if(!err){
      console.log('删除成功')
   }else{
      throw err;
   }
})

//删除多条数据
person.deleteMany({age:{$lte: 30}}, (err)=>{
   if(!err){
      console.log('删除成功')
   }else{
      throw err;
   }
})

//统计数据条数
person.count({age:51}, (err, count)=>{
   if(!err){
      //3
      console.log(count)
   }else{
      throw err;
   }
})