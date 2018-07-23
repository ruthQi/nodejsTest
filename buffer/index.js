//历史使用方式
//不推荐使用此方式：因为存在安全隐患：分配到的内存可能还存储着旧数据
let buffer = new Buffer(10);
console.log(buffer);//<Buffer 00 00 00 00 00 00 00 00 00 00>

/**
 * Buffer对象类似于数组，它的元素为16进制的两位数，即0-255的数值；
 * 不同编码的字符串占用的元素个数各不相同，在utf-8编码下，中文占3个元素，字母和半角标点符号占用1个元素
 */

//新的方式（常用Buffer.alloc(),Buffer.from()）

//Buffer.from(string[, encoding]):encoding默认utf-8
let str = 'www.it666.com';//77表示一个英文，一个英文占一个字节，在buffer中以16进制存放
//字符串转buffer
let buffer1 = new Buffer.from(str)
console.log(buffer1);//<Buffer 77 77 77 2e 69 74 36 36 36 2e 63 6f 6d>
console.log(buffer1.length);//13
console.log(str.length);//13
//buffer转字符串
console.log(buffer1.toString())//www.it666.com

let str1 = '我喜欢';
let buffer2 = new Buffer.from(str1);//e6 88 91表示一个中文，一个中文占3个字节
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
//初始化：必须要有一个确定的长度，不能动态增加或减少，超过255溢出不处理

let buffer3 = new Buffer.alloc(10);//10个字节
console.log(buffer3);//<Buffer 00 00 00 00 00 00 00 00 00 00>
buffer3[0] = 10;
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 00>
buffer3[10] = '0xff';
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 00>溢出不处理
buffer3[9] = '0xff';
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 00 00 ff>
buffer3[7] = 300;//2c
/**
 * 赋值小于0，将该值逐次加256，直到得到一个0-255之间的整数；
 * 赋值大于255，就逐次减256，直到得到0-255区间内的值；
 * 如果是小数，舍弃小数部分，保留整数
 */
console.log(buffer3);//<Buffer 0a 00 00 00 00 00 00 2c 00 ff>
buffer3.forEach((item, index)=>{
   console.log(`${index}:${item}`)
})
/** 
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

//Buffer转换
let buffer4 = new Buffer.alloc(1024);
buffer4.used = 0;
let str41 = 'Hello World';
let subBuf1 = new Buffer.from(str41);
buffer4.used += subBuf1.length;
buffer4.write(str41);
console.log(buffer4.length);

let str42 = '我喜欢Nodejs';
let subBuf2 = new Buffer.from(str42);
buffer4.write(str42, buffer4.used);
buffer4.used += subBuf2.length;
console.log(buffer4);

let str43 = '我喜欢';
let subBuf3 = new Buffer.from(str43);
buffer4.write(str43, buffer4.used);
buffer4.used += subBuf3.length;
//拼接
console.log(Buffer.concat([buffer4, subBuf3], buffer4.used));//<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 e6 88 91 e5 96 9c e6 ac a2 4e 6f 64 65 6a 73 e6 88 91 e5 96 9c e6 ac a2>
console.log(buffer4)


let buffer5 = new Buffer.from('哈哈哈');
buffer5.write('久久', 10);//报错：Attempt to write outside buffer bounds
console.log(buffer5);

console.log(Buffer.isEncoding('GBK'));//false,判断编码是否支持转换




