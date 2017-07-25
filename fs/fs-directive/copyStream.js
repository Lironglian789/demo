//使用流完成复制
var fs=require("fs");
//创建流
var rs=fs.createReadStream("./module/note4.txt");
var ws=fs.createWriteStream("./module/note5.txt");
//读取数据
rs.on("data",function(chunk){
	ws.write(chunk);
});
//当读取流里没有数据时
rs.on("end",function(){
	console.log("数据读取完毕");
	ws.end("完成",function(){   //关闭水龙头
		console.log("数据写入完毕");
	});
})
