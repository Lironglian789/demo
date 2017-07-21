var express=require('express');
var app=express();  //搭建服务器
console.log('这是我的服务器');

//app.use()===>中间件，处理http请求的 小工具
//app.use()===>当请求进入，服务器返回响应之前  运行的所有的函数
//回调函数 ==》next==>顺序的结束
app.use('/a',function(req,res,next){
	//当请求的是现在这个服务器 的/a 路径的时候    执行该函数
	res.end('<h1>hello</h1>');
	next();
});
app.use('/b',function(req,res,next){
	res.end('<h1>word</h1>');
	next();
});
app.use('/',function(req,res){
	res.send('<h2>首页</h2>');      //res.send()发送请求
	res.end(); //不适合发送数据//res.write()  
	                    //res.send   发送数据
});
app.listen(2000);


/*res.send()===>服务器返回数据到客户端
 * res.json（）
res.end()===>响应尾
*如果res.end("abd") 返回数据   ===>err
argument must be a string or Buffer
Buffer:16     16*16=256  255  0 开始
计算内存  ==>app
Buffer:缓存区
*/


//use逻辑：
//function use(a,b){  //www.fcjy.com/user  ===》执行处理函数
//	//第一位参数 ===》‘路径’
//	if(方法||函数传入的第一个参数的类型(typeof)是function){
//		加载传入的函数
//	}else{
//		解析传入的第一个参数
//	}
//}



