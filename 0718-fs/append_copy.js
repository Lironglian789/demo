var fs=require("fs");
fs.readFile("./module/note2.txt","utf-8",function(err,data){
	fs.appendFile("./module/note3.txt",data,function(err){
		if(err) throw err;
		console.log("添加成功");
	})
})