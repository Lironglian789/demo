var express=require("express");
var router=express.Router();
router.get('/a',function(req,res){
	return res.redirect('baidu.html')
	//redirect  相当于a标签的href ===》静态资源
	
})
module.exports=router;