var mongo=require("mongodb");//@2.2.11
var MongoClient = mongo.MongoClient;
var assert = require('assert');

var Urls = 'mongodb://localhost:27017/administor';

//add一条数据
var add = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.insertMany([selector],function(err,result){
    assert.equal(err,null);
    fn(result);
    db.close();
  });
}
//delete
var deletes = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.deleteOne(selector,function(err,result){
    try{assert.equal(err,null)}catch(e){
      console.log(e);
    };
    //assert.equal(1,result.result.n);
    fn(result);
    db.close;
  });
};
//find
var find = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
    collection.find(selector).toArray(function(err,docs){
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        docs = [];
      }
      fn(docs);
      db.close();
    });

}
//  后期项目   ---》 项目 权限的  --》
MongoClient.connect(Urls, function(err, db) {
  find(db,"powers",null,function(d){
    console.log("123s");
    console.log(d.length);
  });
});

//update
var updates = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  console.log(selector);
  collection.updateOne(selector[0],selector[1],function(err,result){
    assert.equal(err,null);
    assert.equal(1,result.result.n);
    fn(result);
    db.close();
  });

}
var methodType = {  //methodType[find]=find
	// 项目所需
  login:find,
  //   type ---> 不放在服务器上面
  //  放入到服务器
  //  请求---> 根据传入进来的请求 数据库操作
  //  req.query    req.body
  show:find,
  haha:find,
  add:add,
  getpower:find,
  update:updates,
  delete:deletes,
  dele:deletes,
  updatepass:updates,
  adduser:add,
  usershow:find,
  getcategory:find,
  getcourse:find,
  find:find,
  state:find,
  top:find,
  AddDirectory:find,
  updateDirectory:updates,
  deleteDirectory:deletes,
  showlist:find,
  showdir:find
};
//主逻辑    服务器  ， 请求    --》 前端给咱么发送请求的时候， req.query
//req.query.action =='add'  'delete'   url    type ==> req.query
//  type  ==> 直接对数据库进行操作
// req.query ==》 前端的请求 可以直接操作你的数据库，  数据库就别要了
module.exports = function(req,res,collections,selector,fn){    //req,res====》type
  MongoClient.connect(Urls, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    methodType[req.query.action](db,collections,selector,fn);
    // 如何对应  发起请求的人员 要考虑的   req.query.action='haha'
    db.close();
  });

};

