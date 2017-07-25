var fs=require("fs");
//创建写入流
var writeStream=fs.createWriteStream("./module/note4.txt");  //流==水龙头
writeStream.on("open",function(){
	console.log("流的水龙头已打开");
});
//数据流入
writeStream.write("人生若只如初见","utf-8");  //分块写入的
writeStream.end();   //没有数据的时候，写完了，关闭水龙头
//监听事件  finish
writeStream.on('finish',function(){  //数据流不存在了
	console.log("流的水龙头已关闭");
});
console.log("代码执行完毕");


