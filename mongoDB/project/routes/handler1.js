/**
 * Created by guowenqiang on 2016/10/22.
 */
//实现功能接口
var express = require('express'),
    router = express.Router(),
    handler = require('./dbhandler.js'),   //操作数据库的方法
    formidable = require('formidable'),    //上传的模块
    crypto = require('crypto');            //加密
// var StringDecoder = require('string_decoder').StringDecoder;
// var decoder = new StringDecoder('utf8');
// var images = require("images");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;  //处理mongoDB里的ID
function User(user) {
  this.id=user.id;
  this.name = user.name;
  this.password = user.password;
  this.veri = user.veri;
};
var flagInt = 0;
//迭代处理删除后的系统管理员各人员的tokenId
var recUpdate = function(req, res, collections,data){  // collections 对那个集合操作   data 修改谁
  //                                       collections==   "Administor",da=[2,3,4]   ===>[1 2 3]
  //第一遍
  if(data.length===0){   //如果 da 里面是空的说明
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"userName":data[0].userName},
      {$set:
      {
        "tokenId":data[0].tokenId-1
      }
      }
    ];
    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      data.shift();
     if(data.length!=0){
        //console.log(data);
        recUpdate(req, res, collections,data);
      }else{
        res.end('{"success":"更新成功"}');
      }
    });
  }
}

//迭代处理视频删除后的ID
var recUpdateID = function(req, res, collections,data,fn){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"_id":data[0]._id},
      {$set:
      {
        "ID":data[0].ID-1
      }
      }

    ];
    //console.log(fn);
    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      data.shift();
      if(dat.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else if(data.length!=0){
        //console.log(data);
        recUpdateID(req, res, collections,data,fn);
      }else{

        if(fn){
          fn();
        }else{
          res.end('{"success":"更新成功"}');
        }

      }
    });
  }
}
//迭代删除目录绑定的视频
/*
*  dirID:目录_id
*  proID:课程_id
*  VstateName:课程名称
*  data  需要处理的视频数据集
* */
var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
  var dirIDProName = dirID+proID ;
  if(data.length===0){
    fn();
  }else{
            req.query.action='find';
            //查询与课程ID对应的目录条数看与该课程绑定的目录是否只剩一条否则不改变videoList的Vstate字段
            handler(req, res, "directoryList", {"CDid":proID},function(set){
              //console.log(set);
              //拆分Vstate去除其中的已删除课程名
              var targetArrVstate = data[0].Vstate.split(",");
              if(set.length===1){
                var indexNumberVstate = (function(arr,val) {
                  for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) return i;
                  }
                  return -1;
                })(targetArrVstate,VstateName);
                targetArrVstate.splice(indexNumberVstate,1);
              }
              //拆分Vmosaic去除其中的dirIDProName
              var targetArrVmosaic = data[0].Vmosaic.split(",");
              var indexNumberVmosaic = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArrVmosaic,dirIDProName);
              targetArrVmosaic.splice(indexNumberVmosaic,1);

              var selectors = [
                {"_id":data[0]._id},
                {$set:
                {
                  "Vstate":targetArrVstate.join(","),
                  "Vmosaic":targetArrVmosaic.join(",")
                }
                }

              ];
              //console.log(selectors);
              req.query.action='update';
              //更新视频列表对应数据的Vstate与Vmosaic字段
              handler(req, res, "videoList", selectors,function(da){
                data.shift();
                if(data.length==0){
                  fn();
                }else if(data.length!=0){
                  delDirVideo(req, res, dirID,proID,data,fn);

                }
              });
            });

  }
}
//迭代删除课程绑定的目录
/*
 proID 课程的_id
* */
var delProDir = function(req, res,proID,fn){
    req.query.action = 'find';
  //查询productList，获取对应ID的课程信息的_id和课程名
  handler(req, res, "productList",{_id:proID} ,function(das){
    //获取对应课程_id的目录集directoryList
    handler(req, res, "directoryList",{CDid:proID} ,function(da){
      if(da.length!==0){
        /*
         * /*
         *  dirID:目录_id
         *  proID:课程_id的拼合串
         *  VstateName:课程名称
         *  data  需要处理的视频数据集
         *
         var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
         * */
        //获取第一个目录相关的视频集
        handler(req, res, "videoList",{ Vmosaic: { $regex: '.*'+da[0]._id+das[0]._id+'.*' } } ,function(daa){
          delDirVideo(req, res, da[0]._id,das[0]._id,das[0].Cname,daa,function(){
            //删除该目录
            req.query.action = 'delete';
            handler(req, res, "directoryList",{_id:da[0]._id} ,function(dat){
              req.query.action = 'find';
              //再次验证看该课程下是否还有目录，如果有就迭代处理
              handler(req, res, "directoryList",{CDid:proID} ,function(data){
                if(data.length===0){
                  fn();
                }else{
                  delProDir(req, res,proID,fn);
                }
              });
            });
          });

        });

      }else{
        fn();
      }
    });

  });


}
//判断对象是否为空
var isNullObj=function(obj){
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      // 说明对象不为空
      return false;
    }
  }
  return true;
}
//生成课程代码
var generateCode = function(){  
  var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var numbers = ['0','1','2','3','4','5','6','7','8','9'];
  var str = "";
  for(var i=0;i<8;i++){
    if(i<4){
      str+= letters.splice(parseInt(Math.random()*(letters.length)),1);
    }else{
      str+= numbers.splice(parseInt(Math.random()*(numbers.length)),1);
    }
  }
  return str;   //里面就包含随机出来的代码
}




router.get('/hello',function(req,res){
  // res.send('{"success":"请求成功"}');
  //如果想在一个接口中 根据传递的参数不同，响应不同的数据
  if(req.query.action==="fcxy"){
    //req.query 从请求头中得到参数
    res.send('{"success":"请求数据成功"}');
  } else{
     res.send('{"fail":"没有当前接口"}');
  }
});

// 1.获取验证码
// /VueHandler/AdminLoginAndRegHandler?action=verification
router.get('/AdminLoginAndRegHandler',function(req,res){
  if(req.query.action==="verification"){
    //生成四位随机的数字加字母
    var randomNum=function(min,max){
      return Math.floor(Math.random()*(max-min));
    };
    var str='QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    var returnStr='';
    for(var i=0;i<4;i++){
      var txt=str[randomNum(0,str.length)];
       returnStr+=txt;
    };
    //生成了随机数字到前台===》后台也要有一个地方储存生成验证码
    //后台也应该有一个储存用户登陆信息和验证码部分 session
    var newUser=new User({
      name:'',
      password:'',
      id:'',
      veri:returnStr   //生成的验证码
    })
    req.session.user=newUser;
    console.log(req.session);
    res.send('{"success":"成功","data":"'+returnStr+'"}');
  // 2.校验验证码
  // /VueHandler/AdminLoginAndRegHandler?action="checkVerification"
  }else if(req.query.action==="checkVerification"){
     if(req.query.veri==req.session.user.veri){
      //前端发送过来的验证码      后台储存的验证码
      res.end('{"success":"验证码正确"}');
     }else{
      res.end('{"err":"输入的验证码不正确"}');
     }
  }
})

//1.如何得到前端发送的数据  2.添加系统人员信息到数据库？？

// 3.添加管理员
// /VueHandler/AdminLoginAndRegHandler?action=add
router.post('/AdminLoginAndRegHandler',function(req,res){
  //对于数据库进行操作
  //1.确定数据库的操作方法是什么
  if(req.query.action==='add'){  //执行注册功能
    //1.执行数据库操作首先要确定对于数据库操作方法
    //注意，有请求 就要有响应====》否则前端浏览器会崩溃
    req.query.action='find';  //确定数据库操作方法
    handler(req,res,"Administor",null,function(arr){
      var md5=crypto.createHash('md5');   //crypto 加密
      //组织用户信息   ===》进一步处理
      var userInfos={};
      userInfos.tokenId=arr.length+1;
      userInfos.createAt=new Date();
      //req.body===》获取post方法放在body里面发送过来的数据
      userInfos.isdelete=/^fcgl$/.test(req.body.turename)?false:true;
      userInfos.power=req.body.power;
      userInfos.success="成功";
      userInfos.upDateAt=new Date();
      userInfos.userName=req.body.userName==""?'false':req.body.userName;
      userInfos.tureName=req.body.turename==""?'false':req.body.turename;
      userInfos.password=md5.update(req.body.password).digest('base64');
      userInfos.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:false;
      userInfos.powerCode=req.body.power=='系统管理员'?1:2;
      //验证手机号、账号、密码不能为空
      if(userInfos.phone!='false' && userInfos.userName!='false' && userInfos.tureName!='false'){
        //验证成功之后，才能执行数据库操作
        req.query.action='find';
        // 判断数据库是否存在
        handler(req,res,"Administor",{"userName":req.body.username},function(data){    //req,res==》'add'
            if(data.length==0){
              req.query.action='add';  //用来定义数据库操作方法
              handler(req,res,'Administor',userInfos,function(data){
                if(data.length==0){
                  res.end('{"err":"抱歉注册失败"}');
                }else{
                  res.end('{"success":"注册成功"}');
                }
              })
            }else{
              res.end('{"err":"用户已存在"}');
            }
        })
      }else{
        res.end('{"err":"抱歉，手机、姓名、账号不能为空"}');
      }
    })
// 4.登录功能
// /VueHandler/AdminLoginAndRegHandler?action=login
  }else if(req.query.action=='login'){  //post req.query.action 获取
    //req.query.action=='login' 同时也确定了数据库的操作方法
    var md5=crypto.createHash('md5');
    var password=md5.update(req.body.password).digest('base64');
    //根据前端发送的数据对比数据库里面的信息 判断登陆
    handler(req,res,"Administor",{"userName":req.body.userName,"password":password},function(data){
      console.log(data);
      if(data.length==0){
        res.end('{"err":"用户不存在"}');
      }else{
        //登录功能  把所有的登录信息 保存在session.user
        req.session.user.name=req.body.userName;
        req.session.user.password=password;
        req.session.user.id=data[0]._id;
        //此时，服务器才拥有了完整的登录信息
        console.log(req.session);
        //掌握session是什么结构，user是什么样
        console.log(req.session.user);
        res.end('{"success":"登陆成功"}');
      }
    })
  }else{
  	res.end('{"err":"抱歉，没有此路由"}')
  }
});
// 5. 退出登录
// /VueHandler/AdminHandler?action=quit
router.get('/AdminHandler',function(req,res){
   if(req.query.action==='quit'){
    if(req.session.user){
      req.session.user={};
      //先获取验证码===》登陆====》退出
    }
    res.end('{"success":"退出成功！"}');
  // 查询数据
  // /VueHandler/AdminHandler?action=show
  }else if(req.query.action=='show'){
    handler(req,res,'Administor',null,function(arr){   //查询数据库里面的所有数据
      // var selector={"tokenId":{$gte:arr.length}};
      // 在处理前端请求第几页数据的时候，我怎么知道要给他什么数据？   tokenId 取值范围       
      ////简便算法:  ====》正序
      // var selector={"tokenId":{$gt:3*(parseInt(req.query.pageStart)-1),$lte:3*parseInt(req.query.pageStart)}}; 
      
      //// *****复杂算法:  ====》倒序
      // var selector={"tokenId":{$gt:arr.length-(parseInt(req.query.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.query.pageStart)*3-3)}};
      //  arr.length  数据库数据总长度      pageStart 当前页  
      
      // 根据关键字查找
      // var selector={tureName:{$regex:'.*'+req.query.searchText+'.*',$options:'i'}};
      //          使用正则：'.*'  ===》  '.*'+星+'.*'  $options:'i' 不区分大小写

      //综合  ===》关键字查询 || 模糊查询  ===》pagestart
      var selector=!req.query.searchText?{"tokenId":{$gt:3*(parseInt(req.query.pageStart)-1),$lte:3*parseInt(req.query.pageStart)}}:{tureName:{$regex:'.*'+req.query.searchText+'.*',$options:'i'}};

      handler(req,res,'Administor',selector,function(data){
        if(data.length==0){
          res.end('{"err":"系统里没有该用户"}');
        }else{
          var obj={
            data:{
              pageSize:3,   //每页显示的数量
              count:arr.length,
              list:data     //按条件查询到是的数据.
            }
          }
          var str=JSON.stringify(obj);
          res.end(str);
        }
      })
    })
  // 删除管理员
  }else if (req.query.action=="delete"){ //1.确定接口  2.定义数据库的操作方法 req.query.action 适用于 gte post  ==> url head 
    handler(req,res,"Administor",{tokenId:parseInt(req.query.tokenId),isdelete:true},function(data){
      //  isdelete :false 无法删除  ==》fcg1 数据是无法删除的 具有最高权限
      if (data.result.n==0) {
        res.end('{"err":"删除失败"}');
      }else {
        req.query.action='find';
        handler(req,res,"Administor",{tokenId:{$gt:parseInt(req.query.tokenId)}},function(da){
           //        da  ==> 就是我获取的 》 当前的删除结果  假设 tokenID =1  da{2 ，3 ，4 }    
           recUpdate(req,res,"Administor",da); // 1.2 操作的操作  要迭代数据 da ==> 待处理集合
        })
        res.end('{"success":"删除成功"}');
      }
    })
  // 删除学员
  }else if (req.query.action=="dele") {      //1.确定接口  2.定义数据库的操作方法 req.query.action 适用于 gte post  ==> url head 
    handler(req,res,"studentList",{tokenId:parseInt(req.query.tokenId)},function(data){
      if (data.result.n==0) {
        res.end('{"err":"删除失败"}');
      }else {
        req.query.action='find';
        handler(req,res,"studentList",{tokenId:{$gt:parseInt(req.query.tokenId)}},function(da){
          recUpdate(req,res,"studentList",da); 
        })
        res.end('{"success":"删除成功"}');
      }
    })
  }
})

// 返回用户信息
// /VueHandler/AdminHandler?action=returnuserinfo
router.post('/AdminHandler',function(req,res){
	if(req.query.action==='returnuserinfo'){
//		res.end('{"success":"接口走通了"}');
        var sessionId=new ObjectID(req.session.user.id);
        req.query.action='find';
		handler(req,res,"Administor",{"_id":sessionId},function(data){
			if(data.length==0){
				res.end('{"err":"抱歉你没有登录"}');
			}else{
				console.log(data);
				var str=JSON.stringify(data[0]);
				res.end(str);
			}
		})

  // 修改密码
  // /VueHandler/AdminHandler?action=updatepass
	}else if(req.query.action=='updatepass'){
    //   前端传进密码 ==》 对于数据库来说 （加密）
    var md5=crypto.createHash('md5');
    var passwordMd5=md5.update(req.body.userPwd).digest('base64');
    //判断 手动输入的原始密码 和登录的密码是否一致
    if(req.session.user.password!=passwordMd5){
    	res.end('{"err":"你输入的密码不正确"}')
    }else{
    	var md56=crypto.createHash("md5");
    	//服务器===》储存用户的登录信息的地方===》密码
    	var newPwd=req.session.user.password=md56.update(req.body.newPwd).digest('base64');
    	var selector=[
    	  {"_id":new ObjectID(req.session.user.id)},
    	  {$set:{"password":newPwd,"upDateAt":new Date()
    	  }}
    	];
    	handler(req,res,"Administor",selector,function(data){
    		if(data.length==0){
    			res.end('{"err":"密码修改失败"}');
    		}else{
    			res.end('{"success":"密码修改成功"}');
    		}
    	})
     }
    // 修改用户
    // /VueHandler/AdminHandler?action=update
   }else if(req.query.action=='update'){  
      var selector=[
        {"tokenId":parseInt(req.body.tokenId)},
        {$set:{
          "userName":req.body.userName,
          "turename":req.body.turename,
          "phone":req.body.phone,
          "power":req.body.power,
          "upDateAt":new Date()
      }}
      ];
      handler(req,res,'Administor',selector,function(data){
        if(data.length==0){
          res.end('{"err":"更新失败"}');
        }else{
          res.end('{"success":"更新成功"}');
        }
      })

  //学员注册
  }else if(req.query.action=='adduser'){
    req.query.action='find';
    handler(req,res,'studentList',null,function(arr){
      var student={};
      student.tokenId=arr.length+1;
      student.createAt=new Date();
      student.userName=req.body.userName==""?'false':req.body.userName;
      student.userPwd="123456";
      student.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:'false';
      // /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      student.email=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(req.body.email)?req.body.email:'false';
      student.isstate=false;
      student.upDateAt=new Date();
      student.success="成功";
      req.query.action='add';
      //判断手机号、姓名、用户名是否为空
      if(student.userName!='false' && student.phone!='false' && student.email!='false'){
        req.query.action='find';
        // 判断用户名是否存在
        handler(req,res,'studentList',{"userName":req.body.userName},function(data){
          if(data.length==0){
            req.query.action='add';
            //添加数据库
            handler(req,res,'studentList',student,function(data){
              if(data.length==0){
                res.end('{"err":"学员注册失败"}');
              }else{
                res.end('{"success":"学员注册成功！"}');
              }
            });
          }else{
            res.end('{"err":"该用户已存在"}');
          }
        })
      }else{
        res.end('{"err":"用户名、手机号、邮箱均不能为空"}');
      }
    });

    //  小学生之家
    // /VueHandler/AdminHandler?action=xxs
  }else if(req.query.action=='xs'){
    req.query.action='find';
    handler(req,res,'studentMin',null,function(arr){
      var studentInfos={};
      studentInfos.tokenId=arr.length+1;
      studentInfos.createAt=new Date();
      studentInfos.userName=req.body.userName==""?"false":req.body.userName;
      studentInfos.need="青铜四以上";
      studentInfos.dsc=req.body.dsc;    // 这个字段可以传空
      if(studentInfos.userName!="false"){
        req.query.action='add';
        handler(req,res,'studentMin',studentInfos,function(data){
          if(data.length==0){
            res.end('{"err":"小学生不容易啊"}');
          }else{
            res.end('{"success":"小学生组织创建成功"}');
          }
        })
      }else{
        res.end('{"err":"姓名不能为空"}');
      }
    })
  }
})

//上传视频 || 图片
// /VueHandler/UpLoadVideoHandler
router.post('/UploadVideoHandler',function(req,res){
  // 此路由 仅供视频上传单独使用
  // 上传  ===》 模块    使用的时候 使用表单   ===》 我就可以使用这个来做上传功能
  var form=new formidable.IncomingForm();
  // 配置 ==》 限制
  form.encoding='utf-8';
  //关于上传的路径 ===》 以服务器所在的路径为准 app.js
  form.uploadDir='temporary/video/';
  form.keepExtensions=true;          //保留文件尾缀
  form.maxFilesSize=200*1024*1024;   //上传文件最大值
  form.maxFiles=2000;                //上传文件数量
  form.parse(req,function(err,fields,files){
    console.log('*****************************');
    console.log(fields); //==={} 因为上传的表单不止只有上传的文件，还有其他文本信息，用这个参数获取
    console.log('*****************************');
    console.log(files);
    console.log(files.hhh.path); // 方法一：hhh 前端写死  需要前端上传和后端获取的name值一致
    console.log(files[Object.getOwnPropertyNames(files)[0]].path); // 方法二： 动态获取
    if(!err){
      // 一系列处理===》把上传的文件路径返回给前端
      var obj={
        cacheName:files[Object.getOwnPropertyNames(files)[0]].path,
        seccess:"恭喜您，上传成功"
      }
      res.send(obj);
    }else{
      var obj={
         err:"sorry,您所上传内容包含不健康信息"
      }
      res.send(obj);
    }
  })
});
// 添加视频
// /VueHandler/VideoHandler/?action=add
router.post('/VideoHandler',function(req,res){
  if(req.query.action=='add'){
    req.query.action='find'; //tokenId
    handler(req,res,'videoList',null,function(arr){
    var videos={};   // 信息的组织校验
      videos.Vname=req.body.Vname; 
      videos.Vtime=req.body.Vtime;
      videos.Vurl=req.body.Vurl;
      videos.ID=arr.length+1;
      videos.Vstate='';
      videos.createAt=new Date();
      videos.uoDateAt=new Date();
      videos.isFinish=false;
      videos.isViewed=false;
      if(videos.Vname && videos.Vtime && videos.Vurl){
        req.query.action='add';
        handler(req,res,'videoList',videos,function(data){
          if(data.length==0){
            res.end('{"err":"视频添加失败"}')
          }else{
            var obj={
              ID:parseInt(data.ops[0].ID),
              Vurl:data.ops[0].Vurl,
              success:"成功"
            }
            var str=JSON.stringify(obj);
            res.end(str);
          }
        })
      }
    })
  }else if(req.query.action=='update'){
    // 根据ID 进行修改
    req.query.action='find';
    handler(req,res,"videoList",{ID:parseInt(req.body.ID)},function(data){
      if(data.length==0){
        res.end('{"err":"没有找到相关视频"}');
      }else{
        //如果前端发送过来的修改数据Vurl
        if(data[0].Vurl!=req.body.Vurl){
          // 删除源路径指向的视频
          fs.unlink(data[0].Vurl,function(err){
            if(err) return console.log(err);
          })
        }
        var selector=[
        {"ID":parseInt(req.body.ID)},
        {$set:
         {Vname:req.body.Vname,
          Vtime:req.body.Vtime,
          Vurl:req.body.Vurl,
          upDateAt:new Date()}}
        ];
        req.query.action="update";
        handler(req,res,"videoList",selector,function(da){
          if(da.length==0){
            res.end('{"err":"更新失败"}');
          }else{
            res.end('{"success":"更新成功"}');
          }
        })
      }
    })

  }else if(req.query.action=='showlist'){  // showlist===》find
    // 查询条件 1. 按页数 2. 按名字
    var selector={};
    if(req.body.searchText){  // 如果搜索框内有数据的话
      selector.Vname={$regex:'.*'+req.body.searchText+'.*'}
    }
    handler(req,res,'videoList',null,function(arr){
      // 方法一：三目运算
      //（1) 正序
      // var selector=!req.body.searchText?{"ID":{$gt:3*(parseInt(req.body.pageStart)-1),$lte:3*parseInt(req.body.pageStart)}}:{Vname:{$regex:'.*'+req.body.searchText+'.*',$options:'i'}};
      // (2) 倒序
      // var selector=!req.body.searchText?{"ID":{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
      
      // 方法二：正则判断
      if(isNullObj(selector)){  // 使用这个方法判断selector是否为空
        //如果对象为空 说明 selector的searchText 为空
        // 则按照也数来查询
        var selector={"ID":{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
      }

      handler(req,res,"videoList",selector,function(data){
        if(data.length==0){
          res.end('{"err":"系统中没有该视频"}');
        }else{
          var obj={
            data:{
              pageSize:3,
              count:arr.length,
              list:data,   //当前页该显示的数据内容
              pageStart:req.body.pageStart

            }, 
            success:"查询成功"
          }
          var str=JSON.stringify(obj);
          res.end(str);
        }
      })
    })
  }
})

//删除    数据+服务器里的视频
router.get('/VideoHandler',function(req,res){
  if(req.query.action=='delete'){ 
    // 1.删除服务器里面对应的视频  2.删除集合里面的数据（迭代）
    // 获取我删除的视频的 Vurl 方便我删除服务器里面的视频  （ 确定我删除的文件 ）
    req.query.action='find';
    handler(req,res,'videoList',{ID:parseInt(req.query.ID)},function(data){
      console.log(parseInt(req.query.ID))
      if(data.length==0){

        res.end('{"err":"系统中找不到视频"}');
      }else{
        // 删除服务器里的视频  Vurl
        fs.unlink(data[0].Vurl,function(err){
          if(err) return console.log(err);
        });
        // 视频已经删除，下面需要删除的是集合里面的数据
        req.query.action='delete';
        handler(req,res,'videoList',{ID:parseInt(req.query.ID)},function(data){
          if(data.result.n==0){
            res.end('{"err":"删除失败"}');
          }else{
            // 视频是删除了 但是 ID 值还没有改变呢    迭代 ID-1
            // 查询 查询到我要修改的数据(删除的视频的>ID) 有多少
            req.query.action='find';
            handler(req,res,'videoList',{ID:{$gt:parseInt(req.query.ID)}},function(da){
              recUpdateID(req,res,'videoList',da);
            })
            res.end('{"err":"删除成功"}');
          }
        })
      }
    })
  }
})
module.exports=router;
