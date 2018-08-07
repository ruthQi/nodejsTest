var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var loginRouter = require('./routes/login');
var regRouter = require('./routes/reg');
var modifyRouter = require('./routes/modify');
var chatRouter = require('./routes/chat');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置路由，routes为express.Router()设置的路径
/**
 * app.get('/', (req, res)=>{
 *    
 * })
 * app.use('/test',routes):use设置中间件，匹配路由所有以/test开始，如/test,/test/:name,/test/hahah等等都会走use配置的路由中间件（routes）。
 * app.get('/test', ()=>{}):get指定的路径是什么就会匹配什么，只会匹配/test,不会匹配/test/:name,/test/hahah等
 */
app.use('/', routes);
app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/modify', modifyRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
