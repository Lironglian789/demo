//非覆盖方式写入
var fs=require("fs");
fs.appendFile("./module/note2.txt","阿弥陀佛么么哒",function(err){
	//appendFile===》末尾追加  （目标文件，写入（追加）的内容， fn）
	if(err) console.log(err);
	console.log("添加成功");
})
