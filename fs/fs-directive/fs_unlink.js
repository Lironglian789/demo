var fs=require("fs");
//删除文件
fs.unlink("./module/note.txt",function(err){
	if(err) throw err;
	console.log("删除成功")
});

/*
 * 1.有目标
 * 2.回调函数
 *   里面的参数      err
 */
