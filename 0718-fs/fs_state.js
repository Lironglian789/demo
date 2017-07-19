var fs=require("fs");
fs.exists("./module/note1.txt",function(result){
	//result 得到的结果，文件存在
	if(result){
		fs.stat("./module/note1.txt",function(err,data){ //获取文件信息
			//如果文件不存在err
			//如果不报错 返回一个文件信息 data
			console.log(data);  //data里有stats===》包含所有的文件信息
			if(data.isDirectory()){
			//isDirectory  是nodeJS封装的一个方法，用来判断是否为文件夹 true false
				console.log("这是一个文件夹");
			}else{
				console.log("这是一个文件");
			}
		})
	}else{
		console.log("文件不存在");
	}
})
