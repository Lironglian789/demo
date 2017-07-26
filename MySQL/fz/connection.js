var mysql=require('mysql');
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'admin',
	database:'homework'
});
exports.query=function(){
	var args=arguments;
	var sqlStr=args[0];
	var params=args[1];
	var callback;
	
	
	/*
    *  传入两个参数的时候是什么样子
    *  传入三个参数是什么样子
    */
   
	//判断参数
	if(args.length===2 && typeof args[1] ==='function'){
        callback=args[1];
    }else if(args.length===3 && Array.isArray(args[1]) && typeof args[2] ==='function'){
       params=args[1];  
       callback=args[2];
    }else {
        throw  new Error('参数出错');
    }
	
	pool.getConnection(function(err,connection){
		if(err) throw err;
		connection.query(sqlStr,params,function(err,data){
			if(err) throw err;
			console.log(data);
		})
		connection.release();
	})
	
}

