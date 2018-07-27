/**
 * 排序：sort()传入一个对象，1表示升序，-1表示降序
 */
//按wages升序,相同值时按id升序排列
db.section.find().sort({wages: 1});

//按wages降序，相同值时按id升序排列
db.section.find().sort({wages: -1})
//按wages降序，相同值时按id降序排列
db.section.find().sort({wages: -1, _id: -1})

//查询指定的字段（只查名称与薪资）
db.section.find({},{name:1, _id:0, wages:1})

db.section.find({},{name:1, _id:0, wages:1}).sort({wages:1})

