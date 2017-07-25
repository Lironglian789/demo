var mysql=require('mysql');
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'admin',
	database:'homework'  
});
pool.getConnection(function(err,cont){
	if(err) throw err;
	//通过获取到的链接==》发送Js里面执行的对于数据库的操作
	//增加数据
	cont.query('insert into survey values(0,"某某某",120,"1996-08-08","不详","喝酒")',function(err,data){
		if(err) throw err;
		console.log(data);
	});
	//删除数据
	cont.query('delete from survey where id=11',function(err,data){
	if(err) throw err;
		console.log(data);
	});
	//修改数据
	cont.query('update survey set name="艾琳娜",favorite="exercise" where id=1',function(err,data){
	if(err) throw err;
		console.log(data);
	});
	//查询数据
	cont.query('select name,age,birth,sex,favorite from survey where id>4 && id<8',function(err,data){
	if(err) throw err;
		console.log(data);
	});
	cont.release(); 
});