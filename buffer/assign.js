/**
 * buffer的内存分配策略：
 * 在C++层面申请内存，在javascript层面，分配内存
 * 采用slab分配机制，slab是一种动态内存管理机制
 * Node以8KB为界限来区分Buffer是大对象还是小对象，8KB的值也是每个slab的大小值；在JavaScript层面，以它作为单位单元进行内存的分配
 * slab释放：
 * 由于一个slab可能分配给多个Buffer对象使用，只有这些小buffer对象在作用域释放并都可以收回是，slab的8KB空间才会被回收
 */
//=====================分配小的buffer对象==============================

var pool;//1.创建一个全新的slab单元
function allocPool(){
   pool = new Buffer.allocUnsafeSlow(Buffer.poolSize);
   pool.used = 0;
   console.log(Buffer.poolSize)
   console.log(pool)
}
let smallBuffer = new Buffer.alloc(1024);//2.创建小Buffer对象
console.log(smallBuffer.length)
if(!pool || pool.length - pool.used < smallBuffer.length){//3.如果slab没有被创建或者剩余大小不足放下新建的buffer对象，则再新建一个slab
   allocPool();
}

smallBuffer.buffer = pool;//4.将当前buffer对象指向创建的slab
smallBuffer.offset = pool.used;//5.记录下是从这个slab的那个位置开始使用
pool.used += smallBuffer.length;//6.slab对象自身也记录被使用了多少字节
console.log(smallBuffer, pool)
if(pool.used & 7){
   //console.log('000000000000000')
   pool.used = (pool.used + 8) & ~7;
}
/**
 * 所有正整数的按位取反是其本身+1的负数
   所有负整数的按位取反是其本身+1的绝对值
   零的按位取反是 -1（0在数学界既不是正数也不是负数） 
 */
console.log(~7);//-8

//==================================分配大buffer对象==============================
/**
 * 如果需要超过8kb的Buffer对象，将会直接分配一个allocUnsafeSlow作为slab单元，这个slab单元将会被这个大Buffer对象独占
 */