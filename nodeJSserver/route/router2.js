var express=require("express");
var fs=require("fs");
var router=express.Router();

router.get('/demo',function(req,res){
	//编写逻辑
	fs.readFile('baidu.html','utf-8',function(err,data){
		//读取文件的路径,调用的入口文件所在的位置为标准
		//开始查询文件
		if(err){
			res.send("文件没找到");
		}else{
			res.send(data);
		}
	})
})
module.exports=router;




