//入口文件     引入  使用  配置好的路由文件
var express=require('express');
var router=require('./public/router');
var path=require('path');
var app=express();
app.use('/',router);
//设置静态资源
app.use(express.static(path.join(__dirname,'public')));

app.listen(999);
