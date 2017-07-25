//关于流
var fs=require("fs");
//读取流
var data="";  //使用流的方式读取文件的时候，用来收集每次读取的内容的容器
//创建一个可读流
var readStream=fs.createReadStream("./module/note1.txt");
readStream.setEncoding("utf-8");
//监听流里面的数据
readStream.on("data",function(chunk){  //监听data事件==》有数据流入里面
	//chunk  流入的数据
	data+=chunk;
});
//如果数据读取完毕？？？
readStream.on("end",function(){   //end 流里面没有数据 ===》  数据读取完毕的时候
	//读取完毕
	console.log("数据读取完毕");
	//输出到cmd
	console.log(data);
});
console.log("代码执行完毕");
