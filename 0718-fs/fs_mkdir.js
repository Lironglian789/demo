var fs=require("fs");
//创建文件夹
fs.mkdir("./module/note",function(err){
	if(err) throw err;
	console.log("创建成功");
});