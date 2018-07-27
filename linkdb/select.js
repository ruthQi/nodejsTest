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
person.find({}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})

person.find({sex:"女"}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
/**
 * -_id name sex === {name:1,sex:1,_id:0}
 */
person.find({sex:"女"},{name:1,sex:1,_id:0}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})

person.find({sex:"女"},"-_id name sex", (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})

person.find({sex:"女"},"-_id name sex", {skip:2,limit:2}, (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})
/**
 * { sex: '女', age: 30, chat: '颖宝', __v: 0 }
 */
person.findById("5b5ae946b7539928582fd536", "-_id -name", (err, docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})

person.findOne({sex:"女"},"name",(err,docs)=>{
   if(!err){
      console.log(docs)
   }else{
      throw err;
   }
})

person.findOneAndRemove({sex:"女"}, (err, data)=>{
   if(!err){
      console.log(data)
   }else{
      throw err;
   }
})