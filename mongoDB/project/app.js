//  引入所有需要的模块   入口文件
// 搭建一个服务器
// 引入配置好的路由---》 app.use('/') 加载
// 设置一个静态资源的路径  个人喜好
var express = require('express');  //引入 express
var path = require('path');   //引入 模块 path    路径优化 =--》使用
// 介绍模块的作用  每个模块都有着自己的功能
var favicon = require('serve-favicon');
//  log   处理 网站的log  可能我的网站要涉及的log的使用 --》 引入这个模块
var logger = require('morgan');
// 日志    http请求  localhost:8000  输出一个日志   你访问了我的服务器，用了什么样的方法访问的
var cookieParser = require('cookie-parser');
// 浏览器  有 cookie  --》请求中的cookie-->  进入到服务器
//  处理 cookie   请求中的cookie--> js
var bodyParser = require('body-parser');
// 解析请求   body 部分   ---》 为了 有 post数据进入服务器里面的时候  ，我有地方去解析post请求
// get    头   post {数据} body   一个请求  头是必须存在的 但是 body不一定
// 引入的这两个文件里面 其实是配置好的路由文件
var session=require('express-session');
/*  cookie  ---> 浏览器
*  当cookie 发送到服务器
*  对 cookie进行处理  cookieParser ---》东西
* session   汉译会话
*  session ---》
*  1.解析 依赖与 cookieParser    先从 cookie 读取加密的 connect.sid
*  通过  cookieParser   解析  对应的       ---》 session.id
* session.id 记录用户信息  --> 保存到 res.sessionID
*  **  浏览器 --》cookie --》服务器 --》cookieParser ---》session
*   cookieParser  的加载应该 放在 session 前面
*
*   登录 ， 退出   session   储存登陆的用户信息
* */
var index = require('./routes/index');   // 定义了一个变量， 引入的index
var handler = require('./routes/handler1');  // 定义了一个变量， 引入的users
var flash=require('connect-flash');
// 他是 session里面的一块特殊的区域 ---》 一次性
// 登录 --》 用户的信息
// 消息写入 flash 中，在跳转页面里面 显示 消息，之后就没有之后了
var url=require('url');
// path --> 路径 c:data/file     url    地址--》 浏览器
var app = express();       // 创建一个服务器
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 这之下的 其实是加载开头引入的模块
app.use(logger('dev'));  //使用日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 body   --》 使用 app.use（）  ，明天
app.use(cookieParser());    // session  --> 用户信息----》 登录功能
// 处理 cookie
app.use(flash());  // 先 cookieParser 后 flash
app.all('*', function(req, res, next) {
// app.all  所有请求过来的时候 都使用我这里面的 function
//    function  --> 处理跨域
//    处理跨域  --》 只需要设置请求头  ，其他去要的部分 都在底层处理完毕
//    以后 工作  -》
//     项目里面 不涉及
    var oriRefer;
    if(req.headers.referer){
        oriRefer= req.headers.referer.substring(0,req.headers.referer.indexOf("/",10));
    }
    var MIME_TYPE = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };
    var filePath;
    if(req.url==="/"){
        filePath =  "index.html";
    } else if(req.url==="/www/"){
        filePath =  "index.html";
    }else{
        filePath = "./" + url.parse(req.url).pathname;
    }
    var ext = path.extname(filePath);
    ext = ext?ext.slice(1) : 'unknown';
    var contentType = MIME_TYPE[ext] || "text/plain";
    res.header("Access-Control-Allow-Origin", oriRefer?oriRefer:"*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", contentType+";charset=utf-8");
    next();
});
// 用户
app.use(session({
    secret:'FCXYHT',               //设置 session 签名
    name:'FCXYHT',
    cookie:{maxAge:80000000000}, // 储存的时间
    resave:false,             // 每次请求都重新设置session
    saveUninitialized:true   //
}));
// 验证用户登录
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    //   响应     =    req.session.user  用户的登录的账号
    var error = req.flash('error');  //  登录
    res.locals.error = error.length ? error : null;
   //res.locals.error  是否为空
    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});

// 重点
app.use('/', index);               //  lochost:3000   ---> 加载 index（已经配置好的路由文件）
app.use('/VueHandler',handler);  // 业务逻辑
//   lochost:3000/VueHandler   --》 handler  已经配置好的路由文件
//特殊图片请求，不由express的静态服务管理
//  后面项目   涉及到图片上传


app.get('/DownLoadPicHandler',function(request,response){
    // localhost:8000/DownLoadPicHandler
    // 图书图片的处理
    var arr = request.originalUrl.split("="); // 接口   get  /? asdjaisd=asndiasidja
    console.log(arr);
    var host="localhost";
    var port="27017";
    var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
    var db=new mongo.Db("administor",server,{safe:true});//创建数据库对象
    db.open(function (err,db) {//连接数据库
        if(err)
            console.log(err);
        else{
            db.collection('coverList', function (err,collection) {
                if (err){  response.end('{"err":"抱歉，上传图片失败"}');}
                else {
                    collection.find({pathName:arr[arr.length-1]}).toArray(function (err, docs) {

                        if (err||!docs[0]){

                            console.log('234566');
                            response.end('{"err":"抱歉，上传图片失败"}');
                        }
                        else {
                            db.close();
                            response.end(docs[0].contents.buffer);
                        }
                    });
                }
            });
        }
    });
    db.on("close", function (err,db) {//关闭数据库
        if(err) throw err;
        else console.log("成功关闭数据库.");
    });

});

//  设置静态资源路径    public
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

//module.exports=app;    //  node ./bin/www   ||  npm start

//  工具  ----》 使用方法  不一样的   自行车  汽车  --》 启动方式
//  exprees -generator  工具  --》  启动方式   npm start || node ./bin/www
//  原理
// 暴露的 app ---》 启动文件里面    ./bin/www ---> 启动当前的服务器
//  node 文件  ---》 nodeJS 进行启动   node ./bin/www
// npm start      ----> npm start   ---》node ./bin/www      package.json
app.listen(8000)     //  node app.js       err node ./bin/www   ||  npm start
