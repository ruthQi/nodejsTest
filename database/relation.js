/**
 * 一对一
 * 通过内嵌文档的形式实现
 */
db.aAndb.insert([
   {name:"杨过",wife:{name:"小龙女",sex:"女"},sex:"男"},
   {name:"令狐冲",wife:{name:"任盈盈",sex:"女"},sex:"男"}
]);
db.aAndb.find();
 /**
  * 一对多
  * 多集合实现
  */
//创建微博
db.weibo.insert([
   {weibo:"世界那么大，我想去看看！"},
   {weibo:"我怎么那么帅！"},
])
//创建评论
db.comments.insert([
   {
       weibo_id:ObjectId("5b5ac61bceae600004c689b7"),
       list:[
           "你有钱吗？",
           "一个人太孤单",
           "准了"
       ]
   },
   {
       weibo_id:ObjectId("5b5ac61bceae600004c689b8"),
       list:[
           "太自恋",
           "这样好吗？"
       ]
   }
])

db.comments.remove({"_id" : ObjectId("5b5ac778ceae600004c689be")})
//查询
var weibo_id = db.weibo.findOne({"weibo" : "世界那么大，我想去看看！"})._id;
db.comments.find({weibo_id: weibo_id});

/**
 * 多对多
 */

db.teachers.insert([
   {name:"陶行知"},
   {name:"苏轼"},
   {name:"郭沫若"}
])
db.students.insert([
   {
       name:"赵雪莲",
       t_id:[
          {id:ObjectId("5b5acbc2ceae600004c689bf")},
          {id:ObjectId("5b5acbc2ceae600004c689c1")}
       ]
   },
   {
   name:"胡汉三",
       t_id:[
           {id:ObjectId("5b5acbc2ceae600004c689bf")},
           {id:ObjectId("5b5acbc2ceae600004c689c1")},
           {id:ObjectId("5b5acbc2ceae600004c689c0")}
       ]
   }
])

var id = db.teachers.findOne({name:"陶行知"})._id;
db.students.find({"t_id.id":id})

//或

db.students.insert([
   {
       name:"赵雪莲",
       t_id:[
           ObjectId("5b5acbc2ceae600004c689bf"),
           ObjectId("5b5acbc2ceae600004c689c1")
       ]
   },
   {
   name:"胡汉三",
       t_id:[
           ObjectId("5b5acbc2ceae600004c689bf"),
           ObjectId("5b5acbc2ceae600004c689c1"),
           ObjectId("5b5acbc2ceae600004c689c0")
       ]
   }
])

var id = db.teachers.findOne({name:"陶行知"})._id;
db.students.find({"t_id":id})