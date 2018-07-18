/**
 * 
执行完成
nextTick延时执行1
nextTick延时执行2
nextTick延迟执行3
非I/O的异步API,setTimeout
setImmediate延迟执行1
setImmediate延迟执行2
强势插入
setInterval1
setInterval2
setInterval3
setInterval4
      .
      .
      .
 * 
 */

setTimeout(()=>{
   console.log('非I/O的异步API,setTimeout');
}, 0);
let i = 0;
// setInterval(()=>{
//    i++;
//    console.log('setInterval'+ i);
// },100);


process.nextTick(()=>{
   console.log('nextTick延时执行1');
})
process.nextTick(()=>{
   console.log('nextTick延时执行2');
   process.nextTick(()=>{
      console.log('nextTick延迟执行3')
   })
})

setImmediate(()=>{
   console.log('setImmediate延迟执行1');
   process.nextTick(()=>{
      console.log('强势插入');
   })
})

setImmediate(()=>{
   console.log('setImmediate延迟执行2');
})
console.log('执行完成');


