//配置好服务器所需要的路由
var express=require('express');
var router=express.Router();
var fs=require('fs');
router.get('/well',function(req,res){
	res.send('<h2>您好！欢迎进入首页</h2>');
});
router.get('/well/home',function(req,res){
	//开始查询文件
	fs.readFile('./public/baidu.html','utf-8',function(err,data){
		if(err) console.log("文件没找到");
		res.send(data);
	});
});
//重定向
router.get('/sub',function(req,res){
	return res.redirect('2.jpg');
});
//暴露文件
module.exports=router;
