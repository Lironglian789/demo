var http=require("http");
http.createServer(function(req,res){
	//响应头
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.write("<div>早上好！</div>");
	res.write("<hr />");
	res.write("<h3>响应信息</h3>");
	res.write("<a href='#' onclick=alert('已点击')>请点击</a>");
	res.end("任务完成");
}).listen(88);
