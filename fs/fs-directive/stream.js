//var fs=require("fs");
//var rs=fs.createReadStream("./module/note4.txt");
//var data="";
//rs.on("data",function(chunk){
//	data+=chunk;
//});
//rs.on("end",function(){
//	console.log("数据读取完毕");
//	console.log(data);
//})

//var fs=require("fs");
//var ws=fs.createWriteStream("./module/note4.txt");
//ws.on("open",function(){
//	console.log("数据流开关打开");
//});
//ws.write("好吗？好的","utf-8");
//ws.end();
//ws.on("finish",function(){
//	console.log("数据流开关关闭");
//})

var fs=require("fs");
var rs=fs.createReadStream("./module/note4.txt");
var ws=fs.createWriteStream("./module/note5.txt");
rs.on("data",function(chunk){
	ws.write(chunk);
});
rs.on("end",function(){
	console.log("数据读取完毕");
	ws.end("finish",function(){
		console.log("数据写入完毕");
	})
})
