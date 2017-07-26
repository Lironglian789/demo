//调用封装的模块
var handler=require('./mongodb');

handler('add','li',{"name":"天线宝宝","age":"12","技能":"放电"},function(){
	console.log('插入成功');
});