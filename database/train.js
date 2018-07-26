//1.创建并进入book数据库
use book
//2.向数据库的colleges集合中插入6个文档（Html5,Java,Pathon,区块链，K12,<PHP，"世界上最好的编程语言">）
db.colleges.insert([
   {name:"HTML5"},
   {name:"Java"},
   {name:"Python"},
   {name:"区块链"},
   {name:"K12"},
   {name:"PHP", intro:"世界上最好的变成语言"}
])
//3.查询colleges集合中的文档
db.colleges.find();
//4.向数据库的colleges集合中插入一个文档（Golang）
db.colleges.insert({
   name: "Golang"
})
//5.统计数据库colleges集合的文档数量
db.colleges.find().count();
//6.查询数据库colleges集合中name为Html的文档
db.colleges.find({name:"HTML5"});
//7.向数据库colleges集合中name为Html的文档，添加一个intro属性，属性值为“打通全栈任督二脉”
db.colleges.update({name:"HTML5"},{$set:{intro:"打通全栈任督二脉"}});
//8.使用{name:"大数据"}替换name为K12的文档
db.colleges.update({name:"K12"},{$set:{name:"大数据"}});
//9.删除name为PHP的文档的intro属性
db.colleges.update({name:"PHP"}, {$unset:{intro:1}});
//10.向name为Html5的文档中，添加一个classes:{base:["h5+c3","js","jQuery","abc"],core:["三大框架","node.js"]}
db.colleges.update({name:"HTML5"},{$set:{classes:{base:["h5+c3","js","jQuery","abc"],core:["三大框架","node.js"]}}})
//11.查询有核心课程为三大框架的文档
db.colleges.find({"classes.core":"三大框架"});
//12.向name为Html5的文档中，添加一个新的核心课程“微信小程序”
/**
 * $push:把value追加到field里
 * $addToSet：加一个值到数组中，而且只有当这个值不在数组中内才增加
 */
db.colleges.update({name:"HTML5"}, {$push:{"classes.core":"微信小程序"}})
db.colleges.update({name:"HTML5"}, {$addToSet:{"classes.core":"公众号开发"}})
//不存在classes字段则创建并添加数据
db.colleges.update({name:"Golang"}, {$addToSet:{"classes.core":"公众号开发"}})
//13:向name为Html的文档中，删除基础课程“abc”
/**
 * $pull:从数组field内删除一个等于value的值。
 * $pullAll:一次可以删除组内多个值
 */
db.colleges.update({name:"HTML5"}, {$pull:{"classes.base":"abc"}})
db.colleges.update({name:"HTML5"}, {$pullAll:{"classes.base":["jQuery","js"]}})
//14:删除colleges集合
db.colleges.remove({});
db.colleges.drop();





//15.向集合demos中插入10000个文档
/**
 * 插入10000次，I/O太过频繁，所以要一起插入
 */
var arr = [];
for(var i = 0; i< 10000; i++){
    arr.push({counter:i});
}
db.demos.insert(arr)
//16.查询demos中counter为666的文档
db.demos.find({counter:666});
//17.查询demos中counter小于666的文档
db.demos.find({counter:{$lt:666}});
//18.查询demos中counter大于666的文档
db.demos.find({counter:{$gt:666}})
//19.查询demos中counter大于66小于666的文档
db.demos.find({counter:{$gt:66,$lt:666}})
//20.查询demos集合中的前10条数据
db.demos.find({counter:{$lt:10}});
db.demos.find().limit(10);
db.demos.find().skip(0).limit(10);
//21.查看demos集合中的第11条到20条数据
/**
 * skip()略过多少条数据
 * limit()限制展示多少条数据
 */
db.demos.find().skip(10).limit(10)
db.demos.find().skip(20).limit(20)//展示20条数据
//22.查看demos集合中的第21条到30条数据
db.demos.find().skip(20).limit(10)

//23.创建company数据库，将colleges和section集合导入到数据库中
use company
db.section.insert([
   {name:"胡雪",job:"辅导员",wages:10000,cno:"1001",bonus:1668},
   {name:"赵乐乐",job:"讲师",wages:20000,cno:"1001",bonus:2600},
   {name:"冯璐璐",job:"辅导员",wages:12000,cno:"1001"},
   {name:"赵晓雪",job:"辅导员",wages:12000,cno:"1002",bonus:1668},
   {name:"孙芙蓉",job:"讲师",wages:13000,cno:"1002",bonus:1288},
   {name:"胡霍恋",job:"辅导员",wages:11000,cno:"1003",bonus:2688},
   {name:"张思琪",job:"班主任",wages:9000,cno:"1003"},
   {name:"王红叶",job:"辅导员",wages:8000,cno:"1002",bonus:1675},
   {name:"叶子奇",job:"高级讲师",wages:30000,cno:"1001",bonus:2345},
   {name:"高伟伟",job:"辅导员",wages:17000,cno:"1002",bonus:1345}   
])
db.colleges.insert([
   {cno:"1001",name:"HTML学院"},
   {cno:"1002",name:"Python学院"},
   {cno:"1003",name:"Java学院"},
   {cno:"1004",name:"Go学院"}
])
//24.查询HTML5学院的所有老师
var cno = db.colleges.findOne({name:"HTML学院"}).cno
db.section.find({cno: cno})
//25.查询Java学院的所有员工
var cno = db.colleges.findOne({name:"Java学院"}).cno
db.section.find({cno: cno})
//26.查询工资大于20000的员工
db.section.find({wages:{$gt:20000}})
//27.查询工资在10000-20000之间的员工
db.section.find({wages:{$gt:10000,$lt:20000}});
db.section.find({$and:[{wages:{$gt:10000}}, {wages:{$lt: 20000}}]});
//28.查询工资小于10000或大于25000的员工
db.section.find({$or:[{wages:{$lt:10000}}, {wages:{$gt: 25000}}]});
//29.为所有薪资低于10000的员工增加工资1000元
/**
 * $inc:对一个数字字段的某个field增加value
 */
db.section.updateMany({wages:{$lt:10000}}, {$inc:{wages:1000}});