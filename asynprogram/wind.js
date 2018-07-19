var Wind = require('wind');
var Task =  Wind.Async.Task;
var fs = require('fs');

var compare = function(x, y){
   return x - y;
}
var swapAsync = eval(Wind.compile("async", function(a, i, j){
   $await(Wind.Async.sleep(20));
   var t = a[i];
   a[i] = a[j];
   a[j] = t;
   console.log(a);
}));
//eval(Wind.compile('async', function(){})):定义异步任务
//$await():任务结束后才可执行后续任务
var bubbleSort = eval(Wind.compile("async", function(array){
   for(var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length - i - 1; j++) {
         if(compare(array[j], array[j+1])>0){
            $await(swapAsync(array, j, j+1));
         }
         
      }  
   }
}));
/**
[ 4, 5, 3, 2, 1 ]
[ 4, 3, 5, 2, 1 ]
[ 4, 3, 2, 5, 1 ]
[ 4, 3, 2, 1, 5 ]
[ 3, 4, 2, 1, 5 ]
[ 3, 2, 4, 1, 5 ]
[ 3, 2, 1, 4, 5 ]
[ 2, 3, 1, 4, 5 ]
[ 2, 1, 3, 4, 5 ]
[ 1, 2, 3, 4, 5 ]
 */
bubbleSort([5,4,3,2,1]).start();

//并发

var readFileAsync = function(file,encoding){
   return Task.create(function(t){
      fs.readFile(file,encoding, function(err, file){
         if(err){
            t.complete('failure', err);
         }else{
            t.complete('success', file);
         }
      }) 
   })
}
var parallel = eval(Wind.compile('async', function(){
   var result = $await(Task.whenAll({
      // file1: fs.readFile('file1.txt', 'utf8', function(err, file){
      //    console.log(file)
      // }),
      // file2: fs.readFile('file2.txt', 'utf8', function(err, file){
      //    console.log(file)
      // })
      //使用上面方式，result报错，使用下面方式可以
      file1: readFileAsync('file1.txt', 'utf8'),
      file2: readFileAsync('file2.txt', 'utf8')

   }))
   console.log(result);//{ file1: './file2.txt', file2: 'I am file2.txt' }
   console.log(result.file1);//./file2.txt
   console.log(result.file2);//I am file2.txt
}))
parallel().start();
