//配置好服务器所需要的路由
var express=require('express');
var router=express.Router();   //创建路由

//配置路由
router.get('/',function(req,res){     //‘/’代表当前路径
	//router  创建的路由  .get我使用的get方式发出请求‘/’
	//我回去执行后面的函数
	//根据不同的情况写入不同的数据===》具体的逻辑
	//fs 模块读取静态文件（音乐、视频、图片、html、css）
	res.send('<h3>首页</h3>')   //发送的是数据
});
router.get('/a',function(req,res){
	res.send('<h3>A页面</h3>')
});
router.get('/a/b',function(req,res){
	res.send('<h3>我是app.use显示不出来的子页面</h3>')
});
module.exports=router
//完成了配置好的路由暴露出去的动作
//找个服务器===》引入，使用（app.use）

