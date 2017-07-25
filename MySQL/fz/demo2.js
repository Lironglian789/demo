/**
 * Created by Administrator on 2017/7/24.
 */
//  这里才是真正的调用者
// 引入封装好的 js 文件  ==》 对数据库进行操作
// 我为什么要封装  user   ---》 调用者 使用的时候
var todo=require('./user');
console.log(todo);
//todo.saveUser({'id':2,'name':'复活的小明','sex':1,birth:'2000-01-01'});
todo.deleteUser('name',{haha:'复活的小明'});


