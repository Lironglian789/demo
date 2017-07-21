//静态资源管理
var express=require("express");
var path=require("path");//===>对于 “文件”路径的处理
var app=express();
//express.static(),搭建一个静态资源管理器
console.log(path.join(__dirname,'img'));   //处理完成


//中间件 ===》处理请求进入的服务器到服务器作出响应
//express上    里面都是中间件

var url=path.join(__dirname,'img');  //文件所在的文件夹路径
app.use(express.static(url))  //告诉express的服务器，静态资源被放到了哪里
//使用app.use加载已经搭建好的静态资源路径

app.listen(100);
