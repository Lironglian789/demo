//index.js   入口文件
//引入  使用  配置好的路由文件
var express=require('express');
//引入路由文件
var router=require('./route/router')
var app=express();
//使用路由
app.use('/',router);  

app.listen(300);


/*
 * app.use('/',function(){console.log(111)})
 * 127.0.0.1:300  ==>执行回调函数
 * 同理
 * router是引入的模块
 * app.use('/',router)
 * 就是当访问到 127.0.0.1:300
 * 自动加载  路由文件
 */