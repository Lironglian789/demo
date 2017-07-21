var express=require("express");
var path=require("path");
var app=express();
//搭建并且使用静态资源管理
app.use(express.static(path.join(__dirname,'public')));
app.use('/a',function(req,res){               
	res.send('<a href="1.jpg">点击</a>');
	//href  改变url ==》   /1.jpg   ===>被静态资源管理的路径     此时app.use是并列关系 不需要next
});
app.use('/b',function(req,res){
	res.send('<a href="baidu.html">点击</a>');  
});
app.listen(200);

//坑
//当一个app.use("/a",function(){})
//当一个app.use("/a/b",function(){})
//app.use===>有事找爸爸    无法访问子路径
//导致：
//访问一个路径时， www.souhu.com/ruanjian/pinyin      只访问主页面，子路径没有用到过
// 解决办法：路由===》 访问的路径是什么，就跳转到那一个页面
//express路由     前端访问什么路径，服务器就返回什么数据
