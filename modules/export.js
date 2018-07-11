// exports = {
//    str: 'test',
//    fn: ()=>{
//       console.log('88888')
//    },
//    obj: {
//       name:'张三',
//       age: 19
//    }
// };
module.exports = {
   str: 'test',
   fn: ()=>{
      console.log('88888')
   },
   obj: {
      name:'张三',
      age: 19
   }
};

//exports与module.exports区别
let md = new Object();
md.exports = new Object();

let exp = md.exports;

exp.name="张三";
//如果exp接受的是对象，那exp与md.exports是分别指向堆的不同地址，就没有任何关系了
// exp = {
//    name:'王五'
// }
//exports是引用 module.exports的值。module.exports 被改变的时候，exports不会被改变
//nodejs只会导出module.exports的指向
md.exports = {
   name: '李四'
}

console.log(exp.name);//张三
console.log(md.exports.name);//张三

//模块导出的时候，真正导出的执行是module.exports，而不是exports
//导出后输出的是2
exports.fun = function(){
   console.log('fun');
}

module.exports = {
   fun:2
}

exports.fun = 1;

console.log(exports === module.exports);//false