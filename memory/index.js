/**
 * Node的内存构成主要由通过V8进行分配的部分和Node自行分配的部分；受V8的垃圾回收限制的主要是指V8的堆内存
 */
var os = require('os');
//闭包
var bar = function () {
   var local = "局部变量";
   return function () {
      console.log('9999999')
      return local;
   };
};
var baz = bar();
console.log(baz());//局部变量

//查看内存情况
/**
 * 单位都是字节
 { rss: 21213184,--->进程的常驻内存部分
  heapTotal: 7159808,--->堆内总共申请的内存量
  heapUsed: 4460152,--->堆中使用中的内存量
  external: 8224 }
 */
console.log(process.memoryUsage());
console.log(os.totalmem());//8461426688
console.log(os.freemem());//3191955456

var showMem = function(){
   var mem = process.memoryUsage();
   var format = function(bytes) {
      return (bytes/1024/1024).toFixed(2)+'MB';
   }
   console.log('Process: heapTotal ' + format(mem.heapTotal) +
   ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
   console.log('-----------------------------------------------------------');
}

var useMem = function () {
   var size = 20 * 1024 * 1024;
   var arr = new Array(size);
   for (var i = 0; i < size; i++) {
      arr[i] = 0;
   }
   return arr;
};
//堆外内存：不通过V8分配的内存
var useMemB = function(){
   var size = 200 * 1024 * 1024;
   var arr = new Buffer(size);
   for (var i = 0; i < size; i++) {
      arr[i] = 0;
   }
   return arr;
}
var total = [];
for (var j = 0; j < 15; j++) {
   showMem();
   console.log('8888888888888'+j)
   total.push(useMemB());//正常执行（Buffer）
   total.push(useMem());//FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
}
showMem();

