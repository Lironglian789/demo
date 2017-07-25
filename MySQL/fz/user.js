/**
 * Created by Administrator on 2017/7/24.
 */

// 不同的部分  ==》 需要做成参数的部分
/* db.js 里面 需要的内容 == . 我我都会在这个文件里面补全
*  补全的东西  --------------》  参数
*
*
* */
var lianjie=require('./db.js');
// 引入了公共部分 --》 链接数据库，进行操作  缺少 sqlStr  parms
//  我的操作是什么 --》 具体的部分
function User(){   // 容器 -->

};
// 插入操作的时候 -->
User.saveUser=function(user){
//user 扮演的角色 就是传送具体的操作数据的
    // 我在这里 放置的 就是 lianjie这个文件缺失的
    // 具体的MySQL的操作语句 ， 具体的 MySQL的操作数据
    //MySQL的操作数据 --》 原因 因为插入的数据 根据不同情况 插入的不一样
    // 所以 ==》       MySQL的操作数据--》又作为了一个参数 user  从外面传进来
    //   外面 ===》 真正的调用部分 会传进来
    var saveSql='insert into kk (id,name,sex,birth) values(?,?,?,?)';
    // db.js 里面 暴露出来的一个函数 名字 叫做 query
    // lianjie.query1  ==》 是咱们封装的 链接数据库 公共部分（主体）
    lianjie.query1(saveSql,[user.id,user.name,user.sex,user.birth],function(err,result){
        if(err) throw err;
    //     执行什么 看情况编写逻辑
    })
};

// 删除操作
User.deleteUser=function(a,user){
  var delSql='delete from kk where ';  // 需要进行的MySQL的语句
    lianjie.query1(delSql+a+'=?',[user.haha],function(err,result){
   if(err) throw err;
        console.log(result);
    });
};
//User.deleteUser('name',{haha:'小明4'}); // 1 删除某个字段 2.删除的字段是什么

// 查询操作：
//User.getUserByid=function(user){
//     var selecSql='select * from kk where id=?';
//    // 1
//    lianjie.query1(selecSql,[1],function(){
//        console.log('你好')
//    })
//};
/*
*   1. 如果 能够看懂的话
*     尝试去写出  修改的 方法
*     var updateSql='update kk set name=? where id=?';
*
*   2. 手打 --》getUserByid  deleteUser
*   3. 找到调用验证的时候  --》 实参  --对位到设计的函数里面
* */

User.updateByid=function(user){
     var updateSql='update kk set name="画" where id=1';
    lianjie.query1(updateSql,[],"",function(err,data){
        if(err){
            throw err
        }else {
            console.log('修改成功')
        }
    })
};
User.updateByid({name:'大明',id:1});




module.exports=User;

/* 脑补？
* 我在另外一个文件里面调用
* var user=require('./user');
* 假如当前文件里面需要使用数据库操作
*
*  user.deleteUser('name',{haha:'小明4'})
* */
/*
*  fs.readFile()  ===>  方法 --》 读取文件
*  =》 名字，  参数
*
* */