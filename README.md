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


