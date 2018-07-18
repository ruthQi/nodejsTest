var events = require('events');
var util = require('util');
var EventProxy = require('eventproxy');

function Stream(){
   events.EventEmitter.call(this);
}
//[Function: Stream]
console.log(Stream);
//Stream继承events.EventEmitter
util.inherits(Stream, events.EventEmitter)
/**
 * { [Function: Stream]
  super_:
   { [Function: EventEmitter]
     EventEmitter: [Circular],
     usingDomains: false,
     defaultMaxListeners: [Getter/Setter],
     init: [Function],
     listenerCount: [Function] } }
 */
console.log(Stream);

//====================================================
//发布/订阅模式--events.EventEmitter
var emitter = new events.EventEmitter();
emitter.once('done', (data)=>{
   console.log(data);//hahhha
})

emitter.emit('done', 'hahhha');

//发布/订阅模式--eventproxy

var ep = new EventProxy();
console.log(ep);
//all()方法用来订阅多个事件，当每个事件都被触发之后，侦听器才会执行
/**
 * all()与tail()的区别：
 * all()方法的侦听器在满足条件之后只执行一次；在侦听器中返回数据的参数列表与订阅组合事件的事件列表是一致对应的
 * tail()方法的侦听器则在满足条件时执行一次之后，如果组合事件中的某个事件被再次触发，侦听器会用最新的数据继续执行
 */
/**
 * wo shi tpl wo shi data
 */
ep.all('tpl', 'data', (tpl, data)=>{
   console.log(tpl, data);//wo shi tpl wo shi data
});
/**
tail--wo shi tpl--wo shi data
tail--wo shi tpl2--wo shi data
tail--wo shi tpl2--wo shi data2
 */
ep.tail('tpl', 'data', (tpl, data)=>{
   console.log(`tail--${tpl}--${data}`)
})
ep.emit('tpl', 'wo shi tpl');
ep.emit('data', 'wo shi data');

ep.emit('tpl', 'wo shi tpl2');
ep.emit('data', 'wo shi data2');
