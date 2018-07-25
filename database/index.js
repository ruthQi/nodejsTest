/**
 * 插入数据：insert()   insertMany()
 * 
 */
//展示所有数据库
show dbs
//显示当前所在的数据库
db
//指到school数据库，没有school则创建，存在则进入
use school
//当前数据库的student集合，如果存在则进入，不存在则创建；并插入一条数据
db.students.insert({id:'001', name:'hahah', age:'18', sex: 'nan'});
//查询当前数据库students集合的所有文档数据
db.students.find(); 
//插入多条数据
db.students.insertMany([
   {name:"李四", age: 21, sex: "nan"},
   {name:"王五", age: 21, sex: "nan"},
   {name:"赵六", age: 21, sex: "nan"},
   {name:"孙七", age: 21, sex: "nan"},
   {name:"周八", age: 21, sex: "nan"},
   {name:"吴九", age: 21, sex: "nan"}
]);
db.students.insertMany([
   {name:"十二",age:22, sex:"男",layout:{w:60,h:160}},
   {name:"十二",age:22, sex:"女",layout:{w:58,h:155}},
   {name:"十二",age:22, sex:"男",layout:{w:64,h:170}},
   {name:"十二",age:22, sex:"男",layout:{w:55,h:165}},
   {name:"十二",age:22, sex:"女",layout:{w:70,h:175}}
])
//===================================查询=============================================
/**
 * 查询数据：find(), findOne(), find({key: value})
 */
//查询所有数据
db.students.find();
//查询满足条件的数据
db.students.find({"_id" : ObjectId("5b5833f8a073641655adafd1")});
/**
{ "_id" : ObjectId("5b583c58f9d3694104791ce7"), "name" : "张三", "age" : 20, "sex" : "女" }
{ "_id" : ObjectId("5b584381f9d3694104791cee"), "name" : "郑十", "age" : 20, "sex" : "女" }
{ "_id" : ObjectId("5b5843b0f9d3694104791cef"), "name" : "十一", "age" : 19, "sex" : "女" }
 */
db.students.find({sex: "女"})
/**
 * {
    "_id" : ObjectId("5b583c58f9d3694104791ce7"),
    "name" : "张三",
    "age" : 20,
    "sex" : "女"
}
 */
db.students.findOne({sex: "女"});
//查询年龄小于等于20的数据
db.students.find({age: {$lte:20}});
//查询身高小于等于160cm
db.students.find({"layout.h":{$lte:160}})

/**
 * 身高大于160，体重小于等于60
 * ObjectId("5b584913f9d3694104791cf3"), "name" : "十二", "age" : 22, "sex" : "男", "layout" : { "w" : 55, "h" : 165 } }
 */
db.students.find({"layout.h":{$gt:160}, "layout.w":{$lte:60}})
/**
 * 身高大于160，小于165，体重小于等于60
 * 无数据
 */
db.students.find({"layout.h":{$gt:160, $lt:165}, "layout.w":{$lte:60}});
/**
 * 查询年龄大于20的文档数据，只展示name和age字段
{ "_id" : ObjectId("5b583da5f9d3694104791ce8"), "name" : "李四", "age" : 21 }
{ "_id" : ObjectId("5b583da5f9d3694104791ce9"), "name" : "王五", "age" : 21 }
{ "_id" : ObjectId("5b583da5f9d3694104791cea"), "name" : "赵六", "age" : 21 }
{ "_id" : ObjectId("5b583da5f9d3694104791ceb"), "name" : "孙七", "age" : 21 }
{ "_id" : ObjectId("5b583da5f9d3694104791cec"), "name" : "周八", "age" : 21 }
{ "_id" : ObjectId("5b583da5f9d3694104791ced"), "name" : "吴九", "age" : 21 }
{ "_id" : ObjectId("5b584913f9d3694104791cf0"), "name" : "十二", "age" : 22 }
{ "_id" : ObjectId("5b584913f9d3694104791cf1"), "name" : "十二", "age" : 22 }
{ "_id" : ObjectId("5b584913f9d3694104791cf2"), "name" : "十二", "age" : 22 }
{ "_id" : ObjectId("5b584913f9d3694104791cf3"), "name" : "十二", "age" : 22 }
{ "_id" : ObjectId("5b584913f9d3694104791cf4"), "name" : "十二", "age" : 22 }
 */
db.students.find({age: {$gt:20}}, {name:1,age:1})
/**
{ "name" : "李四", "age" : 21 }
{ "name" : "王五", "age" : 21 }
{ "name" : "赵六", "age" : 21 }
{ "name" : "孙七", "age" : 21 }
{ "name" : "周八", "age" : 21 }
{ "name" : "吴九", "age" : 21 }
{ "name" : "十二", "age" : 22 }
{ "name" : "十二", "age" : 22 }
{ "name" : "十二", "age" : 22 }
{ "name" : "十二", "age" : 22 }
{ "name" : "十二", "age" : 22 }
*/
db.students.find({age: {$gt:20}}, {name:1,age:1,_id:0})
/**
 * 查询null字段
{ "_id" : ObjectId("5b5833f8a073641655adafd1"), "id" : "001", "name" : "hahah", "age" : "18", "sex" : "nan" }
{ "_id" : ObjectId("5b583c58f9d3694104791ce7"), "name" : "张三", "age" : 20, "sex" : "女" }
{ "_id" : ObjectId("5b583da5f9d3694104791ce8"), "name" : "李四", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b583da5f9d3694104791ce9"), "name" : "王五", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b583da5f9d3694104791cea"), "name" : "赵六", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b583da5f9d3694104791ceb"), "name" : "孙七", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b583da5f9d3694104791cec"), "name" : "周八", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b583da5f9d3694104791ced"), "name" : "吴九", "age" : 21, "sex" : "nan" }
{ "_id" : ObjectId("5b584381f9d3694104791cee"), "name" : "郑十", "age" : 20, "sex" : "女" }
{ "_id" : ObjectId("5b5843b0f9d3694104791cef"), "name" : "十一", "age" : 19, "sex" : "女" }
 */
db.students.find({layout: null});
//查询数据的文档有几条
db.students.find({sex: "女"}).count();//3
db.students.find({sex: "女"}).length();//3

/**
 * 创建包含数组的文档数据
 */
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
   { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
   { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
   { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);
/**
 * 查询tags:["red", "blank"]的数据，精确匹配
 * { "_id" : ObjectId("5b585066f9d3694104791cf6"), "item" : "notebook", "qty" : 50, "tags" : [ "red", "blank" ], "dim_cm" : [ 14, 21 ] }
 */
db.inventory.find({tags:["red", "blank"]});
/**
 * 查询所有包含["red", "blank"]的数据
{ "_id" : ObjectId("5b585066f9d3694104791cf5"), "item" : "journal", "qty" : 25, "tags" : [ "blank", "red" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("5b585066f9d3694104791cf6"), "item" : "notebook", "qty" : 50, "tags" : [ "red", "blank" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("5b585066f9d3694104791cf7"), "item" : "paper", "qty" : 100, "tags" : [ "red", "blank", "plain" ], "dim_cm" : [ 14, 21 ] }
{ "_id" : ObjectId("5b585066f9d3694104791cf8"), "item" : "planner", "qty" : 75, "tags" : [ "blank", "red" ], "dim_cm" : [ 22.85, 30 ] }
 */
db.inventory.find({tags:{$all:["red", "blank"]}});
/**
 * 查询数组个数为3个的
 * { "_id" : ObjectId("5b585066f9d3694104791cf7"), "item" : "paper", "qty" : 100, "tags" : [ "red", "blank", "plain" ], "dim_cm" : [ 14, 21 ] }
 */
db.inventory.find({tags:{$size:3}});


db.inventory.insertMany( [
   { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
   { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
   { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
   { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);
/**
 * { "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
 */
db.inventory.find({instock: { warehouse: "A", qty: 5 }});
/**
{ "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfb"), "item" : "notebook", "instock" : [ { "warehouse" : "C", "qty" : 5 } ] }
 */
db.inventory.find({"instock.0.qty": { $lte: 10}});

/**
{ "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfb"), "item" : "notebook", "instock" : [ { "warehouse" : "C", "qty" : 5 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfd"), "item" : "planner", "instock" : [ { "warehouse" : "A", "qty" : 40 }, { "warehouse" : "B", "qty" : 5 } ] }

 */
db.inventory.find({"instock.qty": { $lte: 10}});


/**
 * { "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
 */
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } );

/**
{ "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfc"), "item" : "paper", "instock" : [ { "warehouse" : "A", "qty" : 60 }, { "warehouse" : "B", "qty" : 15 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfe"), "item" : "postcard", "instock" : [ { "warehouse" : "B", "qty" : 15 }, { "warehouse" : "C", "qty" : 35 } ] }
 */
db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

/**
{ "_id" : ObjectId("5b58523bf9d3694104791cfa"), "item" : "journal", "instock" : [ { "warehouse" : "A", "qty" : 5 }, { "warehouse" : "C", "qty" : 15 } ] }
{ "_id" : ObjectId("5b58523bf9d3694104791cfd"), "item" : "planner", "instock" : [ { "warehouse" : "A", "qty" : 40 }, { "warehouse" : "B", "qty" : 5 } ] }
 */
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )

//查询不存在id字段的文档数据
db.students.find({id:{$exists: false}});
