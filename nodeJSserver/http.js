var http=require("http");   //http  ===>nodeJs自带的模块  服务器
//使用http模块创建服务器
http.createServer(function(request,response){
	//request ==>浏览器对服务器发出的请求
    //response ==>服务器将要对浏览器返回的数据 || 结果，都会在response里面
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
	//如果没有Head，<hr>会被渲染成文字<hr>
	response.write("服务器");
	response.end();  //结束请求，如果不写，浏览器会一直处于等待加载完成的状态
});

