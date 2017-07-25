/**
 * Created by Administrator on 2017/7/24.
 */

// 封装  ==》 提取公共部分

var mysql=require('mysql');

var pool=mysql.createPool({
    host:'localhost',
    user:'root',  // 我的MySQL里面没有 rootest 的这个账号
    password:'yu5515818',
    database:'mydata1'
});
//query1 这个方法  --》 暴露出去了一个连接数据库，并且只要给了操作语句和数据
// 就可以操作的 函数
exports.query1=function(){
    // 链接mysql数据库 ，执行具体数据
//     封装的MySQL的逻辑 都放在这里
    var args=arguments;   //  arguments  收集传入方法里面的参数
    //selecSql='select * from kk where id=?';
    // 1
    var sqlStr=args[0];  // sqlStr  --》 执行的mysql语句
    var params=[];  // params --》 操作的数据
    var callback;

    // --> js  函数（函数创建、参数的使用） --》 作用域链  闭包
    //if(){}
    /*
    *  传入两个参数的时候是什么样子
    *  传入三个参数是什么样子
    * */

    if(args.length===2&& typeof args[1] ==='function'){
    //     我在调用方法的时候 只传入了两个参数
    //    很有可能我在以后开发的时候， 只传入 MySQL的固定语句
        callback=args[1];
    }else if(args.length===3 && Array.isArray(args[1]) && typeof args[2] ==='function'){
    //    三个参数  第一个参数 --》 MySQL语句 第二个参数 []  操作的数据
    //    第三个参数  回调函数 function

       params=args[1];  // 只有当判断出来，我传入的参数是三个的时候，我才能给params 赋值  = agrs[1]
       callback=args[2];

    }else {
        throw  new Error('参数有问题');
    }







    pool.getConnection(function(err,connection){  // 链接数据库
        if(err) throw err;
        connection.query(sqlStr,params,function(err,data){
            if(err) throw err;
            console.log(data);
            connection.release();
        })
    })
};


/*
*  sqlStr 、params  ===》 它代表的值 是怎样得到的？？
*     方法 ---》 arguements 收集外部的传进来的参数
*
*
*  connection.query(sqlStr,params,function(){})   ??
*  nodeJS- 链接数据库的公共部分代码
*  里面需要传入的值因为需要看调用者的心情进行传入，   不确定性
*  直接做成参数  ==》
* */



