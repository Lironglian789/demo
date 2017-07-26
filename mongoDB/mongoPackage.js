var mongo=require('mongodb');
var assert=require('assert');
var MongoClient=mongo.MongoClient;
var Url='mongodb://localhost:27017/mydata';
//插入操作
var insertData=function(db,collection,data,fn){
    db.collection(collection).insert(data,function(err,result){
        assert.equal(err,null);
        // console.log(result);
        fn(result)
    });
}
//删除操作
var deleteData=function(db,collection,condition,fn){
	db.collection(collection).deleteOne(condition,function(err,result){
       assert.equal(err,null);
       // console.log(result);
       fn(result)
	})
}
//修改操作
var updateData=function(db,collection,selector,fn){
	/*
	* selector=[{"name":"屁屁猪7"},{"age":"10"}]
	*/
	db.collection(collection).update(selector[0],selector[1],function(err,result){
		assert.equal(err,null);
		// console.log(result);
		fn(result)
	})
}
//查询操作
var findData=function(db,collection,condition,fn){
	db.collection(collection).find(condition).toArray(function(err,result){
		assert.equal(err,null);
		// console.log(result);
		fn(result)
	})
}

MongoClient.connect(Url,function(err,db){
    insertData(db,'li',{"name":"赖皮","age":"300","技能":"你猜"},function(result){
    	console.log(result);
    });
    deleteData(db,'li',{"name":"皮皮蛋"},function(result){
    	console.log(result);
    });
    updateData(db,'li',[{"name":"爱皮皮"},{$set:{"技能":"捣蛋"}}],function(result){
    	console.log('修改成功');
    });
    findData(db,'li',{"name":"赖皮"},function(result){
    	console.log(result);
    });

})