/**
 * 
 * Promise支持链式执行：
 * 1.将所有回调存入队列中；
 * 2.Promise完成时，逐个执行回调，一旦检测返回新的Promise对象，停止执行，
 * 然后将当前Deferred对象的promise转化为新的Promise对象，并将队列中余下的回调转给它
 */
var fs = require('fs');
var Deferred = function(){
   this.promise = new Promise();
};
//完成态
Deferred.prototype.resolve = function (obj) {
   var promise = this.promise;
   var handler;
   while ((handler = promise.queue.shift())) {
      if (handler && handler.fulfilled) {
      var ret = handler.fulfilled(obj);
      if (ret && ret.isPromise) {
         ret.queue = promise.queue;
         this.promise = ret;
         return;
         }
      }
   }
};
//失败
Deferred.prototype.reject = function (err) {
   var promise = this.promise;
   var handler;
   while ((handler = promise.queue.shift())) {
      if (handler && handler.error) {
         var ret = handler.error(err);
         if (ret && ret.isPromise) {
            ret.queue = promise.queue;
            this.promise = ret;
            return;
         }
      }
   }
};
// 生成回调函数
Deferred.prototype.callback = function () {
   var that = this;
   //Node在处理异常时形成了一种约定，讲一场作为回调函数的第一个实参返回，如果为null，表示没有异常抛出
   return function (err, file) {
      if (err) {
         return that.reject(err);
      }
      that.resolve(file);
   };
};
var Promise = function () {
   //队列用于储存待执行的回调函数
   this.queue = [];
   this.isPromise = true;
};
Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
   var handler = {};
   if (typeof fulfilledHandler === 'function') {
      handler.fulfilled = fulfilledHandler;
   }
   if (typeof errorHandler === 'function') {
      handler.error = errorHandler;
   }
   this.queue.push(handler);
   return this;
};

// var readFile1 = (file, encoding) => {
//    var deferred = new Deferred();
//    fs.readFile(file, encoding, deferred.callback());
//    return deferred.promise;
// }

// var readFile2 = (file, encoding) => {
//    var deferred = new Deferred();
//    fs.readFile(file, encoding, deferred.callback());
//    return deferred.promise;
// }

// readFile1('./file1.txt', 'utf8').then((file1) => {
//    console.log(readFile2(file1.trim(), 'utf8'))
//    return readFile2(file1.trim(), 'utf8')
// }).then((file2) => {
//    console.log(file2);//I am file2.txt
// })
//上面注释部分的优化
var smooth = function(method){
   return function(){
      var deferred = new Deferred();
      var args = Array.prototype.slice.call(arguments, 0, 2);
      args.push(deferred.callback());
      method.apply(null, args);
      return deferred.promise;
   }
}

var readFile = smooth(fs.readFile);

readFile('./file1.txt', 'utf8').then((file1) => {
   //console.log(readFile(file1.trim(), 'utf8'))
   return readFile(file1.trim(), 'utf8')
}).then((file2) => {
   console.log(file2);//I am file2.txt
})