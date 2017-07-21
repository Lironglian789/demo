//app.use访问静态资源
var express=require('express');
var path=require('path');
var app=express();
app.use(express.static(path.join(__dirname,'public')));
app.use('/img1',function(req,res){
	res.send('<a href="1.jpg">click</a>');
});
app.use('/img2',function(req,res){
	res.send('<a href="2.jpg">click</a>');
});
app.use('/html',function(req,res){
	res.send('<a href="baidu.html">click</a>');
});
app.listen(888);
