/**
 * 更新数据：update(),updateMany(),replaceOne(0)
 */
/**
 * 使用这种方式更新导致整条数据都被覆盖，有age字段，更新摸个字段，使用$set
 */
db.students.update({hobby: "游泳", sex: "女"}, {age: 40})
//更新第一条数据
//姓名为十二的用户年龄改为30
db.students.update({name: "十二"}, {$set: {age: 30}});
/**
 * 更新多条数据
 * 姓名为十二的用户修改朋友为十三（如果没有friend字段，则添加此字段并赋值十三，如果存在则更改为十三）
 */
db.students.updateMany({name: "十二"},{$set: {friend: "十三"}})
/**
 * 更新一条数据
 * 年龄为22，性别为女的数据，删除friend字段（$unset）
 */
db.students.update({age: 22, sex: "女"}, {$unset: {friend: 1}})

/**
 * 使用update()+multi:true实现updateMany()
 */
db.students.update({friend: "十三"}, {$set:{hobby:"游泳"}},{multi: true})

/**
 * replaceOne():替换一条数据；replaceOne()不能包括操作符$set,$unset等,只能整体替换
 */
db.students.replaceOne({friend:"驴友"},{name:"十二",age: 34, sex: "女",hobby:"旅游"})
