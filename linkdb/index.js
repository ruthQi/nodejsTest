//1.引入模块
let mongoose = require('mongoose');

//2.连接数据库（默认端口号27017，如果改变端口，这块要写上端口）
mongoose.connect('mongodb://localhost/m_data');

let db = mongoose.connection;

//3.监控数据库连接
db.once('open', ()=>{
   console.log('连接成功');
})

db.on('error', ()=>{
   console.log('连接失败');
})

db.once('close', ()=>{
   console.log('连接关闭')
});

//4.创建Schema模块
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

//创建Model(没有new)(此处创建person的集合，实则数据库创建的是复数people)
let person = mongoose.model('person', personSchema);

//插入文档
person.create({
   name:"谢霆锋",
   age:40,
   chat:"xietingfeng1990"
}, (err)=>{
   if(!err){
      console.log('插入成功');
   }else{
      console.log('插入失败');
   }
})
person.create({
   name:"王菲",
   age:48,
   sex:"女",
   chat:"wangfei1990"
}, (err)=>{
   if(!err){
      console.log('插入成功');
   }else{
      console.log('插入失败');
   }
})

