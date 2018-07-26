/**
 * 数据库删除
 */

db.test.insertMany( [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
] );
/**
 * deleteOne()：删除一条数据
 */
db.test.deleteOne({status:"A"});
db.test.remove({status:"A"},{justOne: true});

/**
 * deleteMany()：删除多条数据
 */
db.test.deleteMany({status: "D"});
db.test.remove({status:"D"});

/**
 * 删除所有数据
 */
db.test.deleteMany({});
db.test.remove({});

/**
 * 删除用户评论全过程
 * 删除并非真的删除，而是改变标志位的状态
 */
//插入数据
db.test.insertMany([
   {name:"张三",content:"今天心情很差！",isDel:0},
   {name:"张三",content:"今天心情很好！",isDel:0}
])

db.test.find()
//删除指定评论
db.test.update({"_id" : ObjectId("5b59700d9d28d1d4420aee30")}, {$set: {isDel: 1}})
//只查询标志位为0的，这个用户的数据
db.test.find({name:"张三",isDel:0})

