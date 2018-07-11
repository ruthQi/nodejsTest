let str = "我是test";

let test = () => {
   console.log('今天是'+new Date());
}

//想在index中使用此文件的变量，需要进行exports

exports.str = str;
exports.test = test;

