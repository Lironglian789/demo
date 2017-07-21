//引用路由的入口文件
var express=require('express');
var router=require('./route/router2')
var app=express();
app.use('/',router);
app.listen(400);
