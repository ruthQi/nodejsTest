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

//4-1:增
//方式1：
person.create([
   {name:"胡可可", age:18, sex:"女", chat:"可可公主"},
   {name:"刘德华", age:58, chat:"华仔"},
   {name:"那英", age:50, sex:"女", chat:"我是那英"},
   {name:"周杰伦", age:38, chat:"jaychou"}
], (err, data)=>{
   if(!err){
      console.log('插入成功');
      console.log(data);
      /**
       * [ { sex: '女',
            _id: 5b5ae77d655fea20a0dc51c4,
            name: '胡可可',
            age: 18,
            chat: '可可公主',
            __v: 0 },
         { sex: '男',
            _id: 5b5ae77d655fea20a0dc51c5,
            name: '刘德华',
            age: 58,
            chat: '华仔',
            __v: 0 },
         { sex: '女',
            _id: 5b5ae77d655fea20a0dc51c6,
            name: '那英',
            age: 50,
            chat: '我是那英',
            __v: 0 },
         { sex: '男',
            _id: 5b5ae77d655fea20a0dc51c7,
            name: '周杰伦',
            age: 38,
            chat: 'jaychou',
            __v: 0 } ]
       */
   }else{
      console.log('插入失败');
   }
});
//方式2：
person.create({name:"林妙可", age:19, sex:"女", chat:"可可小公主"},{name:"关晓彤", age:20, sex:"女", chat:"彤彤"},(err,data1,data2)=>{
   if(!err){
      console.log('插入成功');
      /**
       * { sex: '女',
            _id: 5b5ae86660ed4027dcca7302,
            name: '林妙可',
            age: 19,
            chat: '可可小公主',
            __v: 0 }
         { sex: '女',
            _id: 5b5ae86660ed4027dcca7303,
            name: '关晓彤',
            age: 20,
            chat: '彤彤',
            __v: 0 }
       */
      console.log(data1);
      console.log(data2);
   }else{
      console.log('插入失败')
   }
})
//方式3：
person.insertMany([
   {name:"周华健",age:60,chat:"健健"},
   {name:"赵丽颖",age:30,sex:"女", chat:"颖宝"}
], (err, docs)=>{
   if(!err){
      console.log('插入成功');
      /**
       * [ { sex: '男',
            _id: 5b5ae946b7539928582fd535,
            name: '周华健',
            age: 60,
            chat: '健健',
            __v: 0 },
         { sex: '女',
            _id: 5b5ae946b7539928582fd536,
            name: '赵丽颖',
            age: 30,
            chat: '颖宝',
            __v: 0 } ]
       * 
       */
      console.log(docs);
   }else{
      console.log('插入失败');
   }
})


