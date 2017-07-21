
//res.write(数据 而不是 标签)
//静态页面==>数据
//fs.readFile===>data
var http=require("http");
var fs=require("fs");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
	fs.readFile('baidu.html','utf-8',function(err,data){
		if(err) throw err;
		res.end(data);
	})
}).listen(90);




