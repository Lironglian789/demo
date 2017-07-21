//配置静态资源
var express=require('express');
var path=require('path');
var app=express();
console.log(path.join(__dirname,'public'));
var url=path.join(__dirname,'public');
app.use(express.static(url));
app.listen(777);
