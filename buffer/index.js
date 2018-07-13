//历史使用方式
//不推荐使用此方式：因为存在安全隐患：分配到的内存可能还存储着旧数据
let buffer = new Buffer(10);
console.log(buffer);//<Buffer 00 00 00 00 00 00 00 00 00 00>

//新的方式（常用Buffer.alloc(),Buffer.from()）

//Buffer.from(string[, encoding]):encoding默认utf-8
let str = 'www.it666.com';//77表示一个英文，一个英文占一个字节，在buffer中以16进制存放
let buffer1 = new Buffer.from(str)
console.log(buffer1);//<Buffer 77 77 77 2e 69 74 36 36 36 2e 63 6f 6d>
console.log(buffer1.length);//13
console.log(str.length);//13
console.log(buffer1.toString())//www.it666.com

let str1 = '我喜欢';
let buffer2 = new Buffer(str1);//e6 88 91表示一个中文，一个中文占3个字节
console.log(buffer2);//<Buffer e6 88 91 e5 96 9c e6 ac a2>
//英文时buffer与str长度相同，但是中文长度则不同
console.log(buffer2.length);//9
console.log(str1.length);//3

/**
 *  十进制：0-255；
 *  二进制：00000000 - 11111111；
 *  十六进制：0-ff;
 *
 *  1byte = 8bit;
 *  1KB = 1024byte;
 *  1MB = 1024KB;
 *  1GB = 1024MB;
 *  1TB = 1024GB
 */

//Buffer.alloc(size[, fill[, encoding]])
//初始化：必须要有一个确定的长度，不能动态增加或减少，溢出不处理

let buffer3 = new Buffer.alloc(10);//10个字节
console.log(buffer3);//<Buffer 00 00 00 00 00 00 00 00 00 00>
buffer3[0] = 10;
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 00>
buffer3[10] = '0xff';
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 00>溢出不处理
buffer3[9] = '0xff';
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 ff>
buffer3[7] = 256;
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 ff>超出数值范围不赋值
buffer3.forEach((item, index)=>{
   console.log(`${index}:${item}`)
})
/**
 * 
0:10
1:0
2:0
3:0
4:0
5:0
6:0
7:0
8:0
9:255
 */




