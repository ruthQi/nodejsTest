//1.引入模块
let mongoose = require('mongoose');
let db = mongoose.connection;

//2.连接数据库
mongoose.connect('mongodb://localhost/m_data');

db.once('open', ()=>{
   console.log('连接成功');
});

//3.创建schema和model
let Schema = mongoose.Schema;
let personSchema = new Schema({
   name:String,
   age:Number,
   sex:{
      type:String,
      default: "男"
   },
   chat:String
});

let person = mongoose.model('person', personSchema);

//4.增删改查

//4-2:查
//查询所有数据，docs中是一个包含所有数据的数组
person.find({}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
//查询性别为女的所有数据
person.find({sex:"女"}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
/**
 * 查询性别为女，并且只展示姓名和性别，不展示id
 * -_id name sex === {name:1,sex:1,_id:0}
 */
person.find({sex:"女"},{name:1,sex:1,_id:0}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
//查询性别为女，并且只展示姓名和性别，不展示id，另一种写法
person.find({sex:"女"},"-_id name sex", (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
//展示性别为女，只展示姓名和性别，从下标为2的数据开始，展示2条数据
person.find({sex:"女"},"-_id name sex", {skip:2,limit:2}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
/**
 * 根据id查询数据，不展示id和name
 * { sex: '女', age: 30, chat: '颖宝', __v: 0 }
 */
person.findById("5b5ae946b7539928582fd536", "-_id -name", (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
//查询性别为女的第一条数据，展示姓名
person.findOne({sex:"女"},"name",(err,docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
//查询性别为女的第一条数据并移除，返回的data为移除的这条数据
person.findOneAndRemove({sex:"女"}, (err, data)=>{
   if(!err){
      console.log(data)
   }else{
      throw err;
   }
})