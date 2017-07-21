//搭建一个服务器
var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.write("<div>作业时间</div>");
	res.write("<a href='#' onclick=alert('已点击')>请点击</a>");
	res.end("报告，任务已完成！");
}).listen(666);
