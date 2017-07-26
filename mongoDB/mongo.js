var mongo=require('mongodb');
var assert=require('assert');
var MongoClient=mongo.MongoClient;
 var Url='mongodb://localhost:27017/mydata';
 MongoClient.connect(Url,function(err,db){
    assert.equal(err,null);
    //插入操作
    db.collection('li').insertMany([{"name":"皮皮蛋","age":"20","技能":"捣蛋"},{"name":"皮皮","age":"21","技能":"捣蛋"}],function(err,result){
        assert.equal(err,null);
    	console.log(result);
    	db.close();
    });
    //删除操作
    db.collection('li').deleteMany({"name":"皮皮蛋"},function(err,result){
    	assert.equal(err,null);
    	console.log(result);
    	db.close();
    });
   //修改操作
    db.collection('li').updateMany({"name":"皮皮"},{$set:{"name":"皮皮蛋","age":"100"}},function(err,result){
   	    assert.equal(err,null);
   	    console.log(result);
   	    db.close();
    });
    //查询操作
    db.collection('li').find({"age":{$gte:18}}).toArray(function(err,data){
    	assert.equal(err,null);  
   	    console.log(data);
   	    db.close();
    });
 })
