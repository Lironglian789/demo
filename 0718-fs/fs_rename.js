var fs=require("fs");
fs.rename("./module/note3.txt","./module/note1.txt",function(err){
	if(err) console.log(err);
	console.log("修改成功");
})
