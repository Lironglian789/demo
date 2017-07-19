var fs=require("fs");
var FS={
	//读取文件     readFile
	read:function(target){
		fs.readFile(target,"utf-8",function(err,data){
			if(err) console.log(err);
			console.log("读取成功!");
			console.log(data);
	    })
	},
	//覆盖式写入文件     writeFile
	write:function(url){
		var content="在这点上，我很幸运，在困难面前我很少摇摆，经常是一拍脑袋就做决定了。因为我上高中的时候，就想清楚了我这辈子要干什么。我不想要进到一个仰人鼻息的单位去，我就梦想着要开个自己的电脑公司编软件，自己安排生活和命运，而且做好了，很多人都用，这样很有成就感。";
		fs.writeFile(url,content,function(err){
		    if(err) console.log(err);
			console.log("写入成功!");
	    })
	},
	//复制文件
	copy:function(readUrl,writeUrl){
		fs.readFile(readUrl,"utf-8",function(err,data){
			if(err) console.log("出现错误");
			fs.writeFile(writeUrl,data,function(err){
				if(err) throw err;
				console.log("复制成功!");
			})
		})
	},
	//删除文件   unlink
	del:function(url){
		fs.unlink(url,function(err){
			if(err) throw err;
	        console.log("删除成功!");
		})
	},
	//创建文件夹  mkdir
	create:function(name){
		fs.mkdir(name,function(err){
			if(err) console.log(err);
			console.log("创建成功!");
		})
	},
	//重命名   rename
	rename:function(oldname,newname){
		fs.rename(oldname,newname,function(err){
			if(err) console.log(err);
			console.log("修改成功!");
		})
	},
	//非覆盖式写入===》末尾追加   append
	append:function(url,content){
		fs.appendFile(url,content,function(err){
			if(err) console.log(err);
			console.log("添加成功!");
		})
	},
	//关于文件状态   exists  stat
	fileState:function(target){
		fs.exists(target,function(result){   //判断文件是否存在
			if(result){
				fs.stat(target,function(err,data){
					console.log(data);         //打印文件的所有信息
					if(data.isDirectory()){     //判断式文件还是文件夹
				        console.log("这是一个文件夹");
					}else{
						console.log("这是一个文件");
					}
				})
			}else{
				console.log("文件不存在!");
			}
		});
	},
	//关于文件描述符   flag
	flag:function(url){
		fs.writeFile(url,"你好吗？？？？",{flag:"w"},function(err,data){
			if(err) throw err;
			console.log("写入成功");
		});
	},
	//追加  复制       
	appendCopy:function(readUrl,writeUrl){
		fs.readFile(readUrl,"utf-8",function(err,data){
			if(err) console.log("出现错误");
			fs.appendFile(writeUrl,data,function(err){
				if(err)  console.log("出现错误");
				console.log("复制成功!");
			});
		});
	},
	//使用流读取文件
	readStream:function(url){
		var data="";
		var rs=fs.createReadStream(url);
		rs.setEncoding("utf-8");
		rs.on("data",function(chunk){
			data+=chunk;
		});
		rs.on("end",function(){
			console.log("数据读取完毕");
			console.log(data);
		});
	},
	//使用流写入文件
	writeStream:function(url){
		var ws=fs.createWriteStream(url);
		ws.on("open",function(){
			console.log("流的开关已打开");
		});
		ws.write("======人生若只如初见","utf-8");
		ws.end();
		ws.on("finish",function(){
			console.log("流的开关已关闭")
		});
	},
	//使用流复制文件
	copyStream:function(readUrl,writeUrl){
		var rs=fs.createReadStream(readUrl);
		var ws=fs.createWriteStream(writeUrl);
		rs.on("data",function(chunk){
			ws.write(chunk);
		});
		rs.on("end",function(){
			console.log("数据读取完毕");
			ws.end("finish",function(){
				console.log("数据写入完毕");
			});
		});
	}
}
//暴露文件
module.exports=FS;
