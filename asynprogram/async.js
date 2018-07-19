//======================流程控制库async======================

var fs = require('fs');
var async = require('async');
/**
=================1531987315686
--------------------1531987315689
[ './file2.txt', 'I am file2.txt' ]
--------------------1531987315692
[ './file2.txt', 'I am file2.txt' ]
=================1531987315693
 */
//series实现一组任务的串行执行,parallel比series快
console.log('================='+new Date().getTime())
async.series([
   function(callback){
      fs.readFile('file1.txt', 'utf8', callback)
   },
   function(callback){
      fs.readFile('file2.txt', 'utf8', callback)
   }
], (err, results)=>{
   console.log(results);//[ './file2.txt', 'I am file2.txt' ]
   console.log('================='+new Date().getTime())
});

//parallel:用以并行执行一些异步操作
console.log('--------------------'+new Date().getTime())
async.parallel([
   function(callback){
      fs.readFile('file1.txt', 'utf8', callback)
   },
   function(callback){
      fs.readFile('file2.txt', 'utf8', callback)
   }
], (err, results)=>{
   console.log(results);//[ './file2.txt', 'I am file2.txt' ]
   console.log('--------------------'+new Date().getTime())
})

//waterfall():当前一个的结果是后一个调用的输入，后者依赖前者
async.waterfall([
   function(callback){
      fs.readFile('file1.txt', 'utf8', callback)
   },
   function(arg1, callback){
      console.log(arg1);//./file2.txt
      fs.readFile(arg1, 'utf8', callback)
   }
], (err, result)=>{
   console.log(result);//I am file2.txt
})

//auto()：根据依赖自动分析，以最佳的顺序执行业务逻辑

var defs = {
   task1: function(callback){
      console.log('task1');
      callback(null, 'task11');
   },
   task2: function(callback){
      console.log('task2');
      callback(null, 'task12');
   },
   task3: ['task1','task2', function(results, callback){
      console.log('task3');
      console.log(results);
      //第一个参数为results,第二个参数为callback
      callback();
   }],
   task4: ['task3', function (reaults, callback) {
      console.log('task4');
      callback();
   }]
}

async.auto(defs, (err, results)=>{
   /**
    * { task1: 'task11',
      task2: 'task12',
      task3: undefined,
      task4: undefined }
    */
   console.log(results);
});