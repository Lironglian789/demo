var user=require("./user");
User.insertData({'id':0,'name':"Vivian",'age':'27','birth':'1990-12-12','sex':'女','favorite':'man'});
User.deleteData('birth=?',{condition:'1991-01-01'});
User.updateData('sex="男"','id=12');
User.selectData('*','id<?',{condition:7});


//var user=require("./user");
//User.insertUser({'id':0,'name':"Kary",'age':'20','birth':'1997-12-12','sex':'女','favorite':'playgame'});
//User.deleteUser('birth=1996-08-08');
//User.updateUser('favorite="nothing"','id=12');
//User.selectUser('*',"id>15");