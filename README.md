######################################目录结构########################################

############################深入浅出nodejs###################

#assets:静态资源文件（图片视频）
#asynapi:非I/O的异步API:nextTick(),setImmediate()等
#asyncprogram:异步编程
#buffer:buffer
#memory:内存溢出
#modules:模块机制

#############################数据库##########################

#databse:mongoDB数据库增删改查命令
#linkdb:node中操作数据库moongose

#############################file############################

#file:文件的读写操作

##############################HTTP############################

#form:form表单操作：图片处理，参数接收等
#http:http中的路由，req.url()等
#static：静态资源读写
#mould：模板引擎



##########################################################################################

# nodejsTest
#lesson14:命令行
cd nodejsTest:进入nodejsTest文件夹;
dir: 查看文件夹下所有文件；
md lesson14: 创建lesson14文件夹；
cd le(文件夹字母)+tab键: 补全文件名称；
cd.>index.js: 创建index.js文件；
cd ..: 返回上级目录；
cd .: 当前目录；
rd del: 删除del文件夹;
cls: 清屏；
exit: 退出命令行

#lesson17:运行node文件
命令行方式运行：cmd下执行文件(1.cmd窗口下输入文件路径找到文件；2.文件夹下找到文件，在当前文件目录下输入cmd,回车；)
执行命令：node xxx(文件名称)

#lesson22:模块结构剖析
当node在执行模块中的代码时，它会首先在代码的最顶部，添加如下代码function (exports, require, module, __filename, __dirname) {；
在代码的最底部添加一个}；
所以模块中的代码都是包在一个函数中执行的，并且在函数执行的同时传递进了5个实参

exports：该对象用来将函数内部的局部变量或局部函数暴露到外部；
require：用来引入外部的模块；
module:代表的是当前模块本身，exports是module的属性；我们即可以使用exports输出，又可以使用module.exports输出
__filename:当前模块的完整路径
__dirname:当前模块所在文件夹的完整路径

#lesson23:modules.exports与exports的区别
exports：只能使用.语法来向外暴露内部变量
module.exports：既可以通过.语法，也可以直接赋值一个对象
原因：
exports对象是通过形参的方式传入的，直接赋值形参会改变形参的引用，但并不能改变作用域外的值；module.exports不会改变形参的引用
exports仅仅是module.exports的一个地址引用。
nodejs只会导出module.exports的指向，如果exports指向变了，那就仅仅是exports不再指向module.exports，于是不会再被导出
NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports

#lesson26:包和包管理器
包管理器(npm):
常用命令：
npm -v:查看npm版本
npm version:查看所有模块的版本
npm search 包名：搜索包
npm init:初始化package.json文件
npm install/i 包名：安装包
npm remove/r 包名：删除包
npm install/i 包名 --save:安装包并添加到依赖中
npm install:根据package.json下载当前项目所依赖的包
npm install 包名 --g:全局安装包
npm ls:分析出当前路径下能够通过模块路径找到的所有包，并生成依赖树

**如果在页面中引入node_modules中某个模块，优先从当前目录引入（node_modules），如果没有，则往上级node_modules查找，直到根目录node_modules

cnpm: 阿里团队创建的中国本地的npm包管理：https://npm.taobao.org/

require.extensions:获取系统中已有的扩展加载方式
module.paths:模块的查找路径

#lesson28:Buffer
buffer：一个二进制数据容器
Node中的buffer是一个二进制数据容器,用于node中数据存放
**Buffer在node中可以直接使用，不需要引入


#MongoDB数据库操作：
> show dbs                                                            --->展示所有的数据库
admin   0.000GB
config  0.000GB
local   0.000GB
> db                                                                  --->显示当前所在的数据库
student
> use school                                                          --->没有school则创建，存在则进入
switched to db school
> db
school
> db.students.insert({id:'001', name:'hahah', age:'18', sex: 'nan'}); --->当前数据库的student集合，如果存在则进入，不存在则创建；并插入一条数据
WriteResult({ "nInserted" : 1 })
> db.students.find();                                                 --->查询当前数据库，students集合所有的数据
{ "_id" : ObjectId("5b5833f8a073641655adafd1"), "id" : "001", "name" : "hahah",
"age" : "18", "sex" : "nan" }

##########################################Express############################################
express不对Node.js已有的特性进行二次抽象，我们只是在它之上扩展了web应用所需要的基本功能

##########################################################################################
应用生成器：
express-generator:
1.全局安装generator:npm install express-generator -g
2.express -h:列出所有可用的命令行选项
3.安装依赖包：npm install
4.设置视图模板：express --view=ejs demo1(项目名称为demo1,使用ejs模板)
5.启动应用：set DEBUG = myapp & npm start

自动生成generator工程：
1.express --ejs generator;
2.cd generator;
3.npm install;
4.npm start;(启动工程)

#########################路由
//设置路由，routes为express.Router()设置的路径
#
 * app.get('/', (req, res)=>{
 *    
 * })
 * app.use('/test',routes):use设置中间件，匹配路由所有以/test开始，如/test,/test/:name,/test/hahah等等都会走use配置的路由中间件（routes）。
 * app.get('/test', ()=>{}):get指定的路径是什么就会匹配什么，只会匹配/test,不会匹配/test/:name,/test/hahah等
#

######################################################################################################
socket.io通信

1.服务器端：

1-1：引入包：let socket = require('socket.io);
1-2: 创建socket实例：let io = socket(http.createServer(app));//app = express()
1-3: 建立连接：io.on('connection', (socket)=>{

})
1-4: 服务器监听消息：socket.on('msg', ()=>{

})
1-5:服务器端发送消息：socket.emit('msg', xxxxxx);
1-6:服务器监控连接断开：socket.on('disconnect', ()=>{})


2.客户端


2-1：引入文件：<script src="/socket.io/socket.io.js"></script>
2-2：建立连接：
   let url = 'http://localhost:3000';
   let socket = io.connect(url);

2-3：socket.on('connect', ()=>{})

2-4: 打开通道：socket.emit('open');

2-5:客户端发送消息：socket.emit('msg', value);

2-6：接受服务器发送的信息：socket.on('msg', ()=>{})

2-7: 断开连接: socket.disconnect();






