/**
 * 区别：
 * 
nextTick()的回调函数执行的优先级要高于setImmediate();
process.nextTick()属于idle观察者,setImmediate()属于check观察者.在每一轮循环检查中,idle观察者先于I/O观察者,I/O观察者先于check观察者.

在具体实现上：
process.nextTick()的回调函数保存在一个数组中,
setImmediate()的结果则是保存在链表中.

在行为上：
process.nextTick()在每轮循环中会将数组中的回调函数全部执行完.
而setImmediate()在每轮循环中执行链表中的一个回调函数
 */

/**
正常执行L
nextTick延迟执行A
nextTick延迟执行B
nextTick延迟执行D
setImmediate延迟执行E
setImmediate延迟执行H
setImmediate延迟执行C
强势插入F
强势插入I
强势插入J
setImmediate延迟执行G
setImmediate延迟执行K
 */
process.nextTick(()=>{
   console.log('nextTick延迟执行A')
});
process.nextTick(()=>{
   console.log('nextTick延迟执行B');
   setImmediate(()=>{
      console.log('setImmediate延迟执行C')
   })
   process.nextTick(()=>{
      console.log('nextTick延迟执行D')
   })
});

setImmediate(()=>{
   console.log('setImmediate延迟执行E');
   process.nextTick(()=>{
      console.log('强势插入F');
   });
   setImmediate(() =>{
      console.log("setImmediate延迟执行G");
   });
})
setImmediate(() => {
   console.log("setImmediate延迟执行H");
   process.nextTick((err, result) => {
      console.log(err,result);
      console.log("强势插入I");
   });
   process.nextTick((err, result) => {
      console.log(err,result);
      console.log("强势插入J");
   });
   setImmediate(() => {
      console.log("setImmediate延迟执行K");
   });
});
console.log("正常执行L");
