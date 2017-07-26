var mongo=require('mongodb');
var assert=require('assert');
var MongoClient=mongo.MongoClient;
var Url='mongodb://localhost:27017/mydata';
//插入操作
var insertData=function(db,collection,selector,fn){
    db.collection(collection).insert(selector,function(err,result){
        assert.equal(err,null);
        fn(result)
    });
}
//删除操作
var deleteData=function(db,collection,selector,fn){
	db.collection(collection).deleteOne(selector,function(err,result){
       assert.equal(err,null);
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
		fn(result)
	})
}
//查询操作
var findData=function(db,collection,selector,fn){
	db.collection(collection).find(selector).toArray(function(err,result){
		assert.equal(err,null);
		fn(result)
	})
}

var methodType={
	//取值  methodType[add]===insertData
	add:insertData,
	delete:deleteData,
	update:updateData,
	find:findData
};

module.exports=function(type,collection,selector,fn){    //容器
	MongoClient.connect(Url,function(err,db){
	    assert.equal(err,null);
        methodType[type](db,collection,selector,fn);
	    db.close();
	})
}