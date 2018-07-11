
//求和
exports.sum = (...numbers) => {
   let result = 0;
   numbers.forEach((item)=>{
      result += item;
   });
   return result;
}
//求平均
exports.avg = (...numbers) => {
   let result = 0;
   numbers.forEach((item)=>{
      result += item;
   });
   return result/numbers.length;
}
//在node中window并不是全局变量
//console.log(window.exports);//window is not defined
//在node中全局变量为global,与window类似，但是验证exports不是全局变量
console.log(global.exports);//undefined

//caller是函数对象的一个属性，该属性保存着调用当前函数的函数，即当前函数的父函数。如果没有父函数，则为null。
//callee是arguments对象的一个成员，它的值为“正被执行的Function对象”。
//arguments.callee是指向参数arguments对象的函数
console.log(arguments.callee);//[Function]
console.log(arguments.callee + "");//[Function]
//验证可知每一个node的js文件，都是一个函数，exports和require是函数中的参数
/**
function (exports, require, module, __filename, __dirname) {
   //求和
   exports.sum = (...numbers) => {
      let result = 0;
      numbers.forEach((item)=>{
         result += item;
      });
      return result;
   }
   //求平均
   exports.avg = (...numbers) => {
      let result = 0;
      numbers.forEach((item)=>{
         result += item;
      });
      return result/numbers.length;
   }
   //在node中window并不是全局变量
   //console.log(window.exports);//window is not defined
   //在node中全局变量为global,与window类似，但是验证exports不是全局变量
   console.log(global.exports);//undefined

   console.log(arguments.callee);//[Function]
   console.log(arguments.callee + "");//[Function]
}
 */

/**
   exports：该对象用来将函数内部的局部变量或局部函数暴露到外部；
   require：用来引入外部的模块；
   module:代表的是当前模块本身，exports是module的属性；我们即可以使用exports输出，又可以使用module.exports输出
   __filename:当前模块的完整路径
   __dirname:当前模块所在文件夹的完整路径
*/

// exports.testStr = function(){
//    console.log('testStr')
// }
exports.testStr = '哈哈哈哈哈哈哈';
module.exports.testStr = '呵呵呵呵呵';

console.log(module.exports === exports);//true
console.log(__filename);//E:\workspace\nodejsTest\modules\fun.js
console.log(__dirname);//E:\workspace\nodejsTest\modules