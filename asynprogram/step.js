//================================流程控制库Step==================

var Step = require('step');
var fs = require('fs');

//step接受任意数量的任务，所有的任务都将会串行依次执行
/**
 * ./file2.txt-->串行
   ./file2.txt I am file2.txt-->并行
   I am file2.txt-->串行
*/
//串行
// Step(
//    function readFile1(){
//       fs.readFile('file1.txt', 'utf8', this);
//    },
//    function readFile2(err, content){
//       console.log(content);//./file2.txt
//       fs.readFile('file2.txt', 'utf8', this);
//    },
//    function done(err, content){
//       console.log(content);//I am file2.txt
//    }
// );

//并行
/*parallel()使用时要小心，如果异步方法的结果传回的是多个参数，Step将只会取前两个参数（待验证）
./file2.txt I am file2.txt
I am file2.txt
I am file2.txt
I am file2.txt ./file2.txt
*/
Step(
   function readFile(){
      fs.readFile('file1.txt', 'utf8', this.parallel());
      fs.readFile('file2.txt', 'utf8', this.parallel());
      fs.readFile('file1.txt', 'utf8', this.parallel());
   },
   function done(error, content1, contnent2, content3){
      console.log(content1, contnent2, content3);//./file2.txt I am file2.txt ./file2.txt
      console.log(arguments)
   }
)

//group()结果分组:与parallel()区别是group()返回的数据保存在数组中
Step(
   function readFile(){
      var group = this.group();
      fs.readFile('file1.txt', 'utf8', group());
      fs.readFile('file2.txt', 'utf8', group());
   },
   function done(error, results){
      console.log(results);//[ './file2.txt', 'I am file2.txt' ]
      console.log(arguments)
   }
)