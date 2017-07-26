var connection=require('./connection.js');
function User(){};
//插入操作
User.insertData=function(data){
	var insertSql='insert into survey (id,name,age,birth,sex,favorite) values(?,?,?,?,?,?)';
	connection.query(insertSql,[data.id,data.name,data.age,data.birth,data.sex,data.favorite],function(err,result){
		if(err) throw err;
		console.log(result);
	});
};
//删除操作
User.deleteData=function(condition,data){
	var deleteSql='delete from survey where'+' '+condition;
	connection.query(deleteSql,[data.condition],function(err,result){
		if(err) throw err;
		console.log('删除成功！');
	});
};
//修改操作
User.updateData=function(filedValue,condition){
	var updateSql='update survey set '+filedValue+' where '+condition;
	connection.query(updateSql,function(err,result){
		if(err) throw err;
		console.log(result);
	})
}
//查询操作
User.selectData=function(field,condition,data){
	var selectSql='select'+' '+field+' '+'from survey where'+' '+condition;
	connection.query(selectSql,[data.condition],function(err,result){
		if(err) throw err;
		console.log(result);
	})
}
//暴露文件
module.exports=User;


//第二遍
// var Link=require('./connection.js');
// function User(){};
// //插入操作
// User.insertUser=function(data){
// 	var insertSql='insert into survey (id,name,age,birth,sex,favorite) values(?,?,?,?,?,?)';
// 	Link.query1(insertSql,[data.id,data.name,data.age,data.birth,data.sex,data.favorite],function(err,result){
// 		if(err) throw err;
// 		console.log(result);
// 	});
// };
//删除操作
//User.deleteUser=function(condition){
//	var deleteSql='delete from survey where'+' '+condition;
//	Link.query1(deleteSql,function(err,result){
//		if(err) throw err;
//		console.log('删除成功！');
//	});
//};
////修改操作
//User.updateUser=function(filedValue,condition){
//	var updateSql='update survey set '+filedValue+' where '+condition;
//	Link.query1(updateSql,function(err,result){
//		if(err) throw err;
//		console.log(result);
//	})
//}
////查询操作
//User.selectUser=function(field,condition){
//	var selectSql='select'+' '+field+' '+'from survey where'+' '+condition;
//	Link.query1(selectSql,function(err,result){
//		if(err) throw err;
//		console.log(result);
//	})
//}
////暴露文件
//module.exports=User;