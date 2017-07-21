//引用路由的入口文件
var express=require('express');
var router=require('./route/router3');
var path=require('path');
var app=express();
app.use('/',router);
//设置静态资源
app.use(express.static(path.join(__dirname,'public')));
app.listen(500);
//
