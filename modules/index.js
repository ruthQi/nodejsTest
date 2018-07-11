//模块化思想：被引入文件需要exports,引入的文件需要require
//想要使用test.js文件的变量，需要引入文件
let test = require('./test.js');//此处文件引用在一个文件夹下使用./test.js而不是使用test.js

console.log(test.str);
test.test();



/*
运行：
node index.js
我是test
今天是Wed Jul 11 2018 11:23:13 GMT+0800 (中国标准时间)
*/
//文件模块
let fun = require('./fun');
console.log(fun);//{ sum: [Function], avg: [Function] }

console.log(fun.sum(1,2,3,4));//10
console.log(fun.avg(1,2,3,4));//2.5

console.log(fun.testStr);//呵呵呵呵呵（后面覆盖前面的）

//核心模块
//node自带的模块：http://nodejs.cn/api/
let fs = require('fs');
let http = require('http');

//==========================================================
//验证module.exports与exports区别
let exportFun = require('./export');
//使用exports暴露，输出{}
//使用module.exports暴露，输出{ str: 'test', fn: [Function: fn], obj: { name: '张三', age: 19 } }
console.log(exportFun);

console.log(exportFun.fun)