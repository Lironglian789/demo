<template>
	<div class="content">
		<bg-canvas></bg-canvas>
		<div class="login_wrap">
			<img src="../assets/back_logo.png" class="logo" />
			<form>
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-user"></i>
					</span>
					<input ref="input_user" type="text" placeholder="用户名">
				</div>
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-lock"></i>
					</span>
					<input ref="input_pw" type="text" placeholder="密码">
				</div>
				<div class="oneinput_box">
					<span class="icon">
						<i class="fa fa-lock"></i>
					</span>
					<input ref="input_veri" type="text" placeholder="请输入验证码" style="width:310px">
					<veri ref="veriCode"></veri>
				</div>
			</form>
			<button class="btn btn-info" @click="findPw">忘记密码</button>
			<button class="btn btn-success" @click="login">登录</button>
		</div>
	</div>
</template>
<script>
	import bgCanvas from './bgCanvas.vue';
	import veri from './verification.vue';

	// ref  标识   
	// this. $refs.xxx.value

	export default{
		components:{bgCanvas,veri},
		mounted:function(){
			// alert(this.$refs.input_veri.value)
		},
		methods:{
      findPw:function(){
     	  alert('服务暂未开通')
      },
      login:function(){
         // alert(this.$refs.input_veri.value)      //获取到输入的验证码的值

         var veri= this.$refs.input_veri.value.trim();  // trim() 去除空格
         var userName= this.$refs.input_user.value.trim();
         var password= this.$refs.input_pw.value.trim();
         var _this=this;
         this.$axios({
         	method:'get',
         	// url:'http:localhost:3000',  //基础路径，入口文件已写 此处直接放接口
         	url:'/VueHandler/AdminLoginAndRegHandler?action=checkVerification',
         	params:{veri:veri}   // 参数   ~~~~~data
          }).then(function(response){
          	console.log(response)
         	    if(response.data.success){
                  // alert('验证码匹配成功')
                  // 验证号密码
                  _this.$axios({
                      method:'post',
                      url:'/VueHandler/AdminLoginAndRegHandler?action=login',
                      data:{
                      	userName:userName,
                      	password:password
                      }
                  }).then(function(res){
                  	if(res.data.success){
                  		alert('登陆成功')
                  		window.location.href='/home'
                  	}else{
                  		alert(res.data.err)
                  	}
                  }).catch(function(err){
                  	alert(err)
                  })
         	    }else{   // 验证码 匹配失败
         	    	alert(response.data.err)
         	    	// 重新获取验证码的方法 验证码组件
                  _this.$refs.veriCode.changeVeri()


         	    }
          }).catch(function(err){
              alert(err)
          })

      }
		}
	}
</script>
<style scoped>    /*scoped  只在当前组件有效*/
  *{
	margin: 0;
	padding: 0;
   }
  .content {
    background: #0d1953;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .content img {
    border: none;
  }

  .content bg-cavas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .login_wrap {
    width: 560px;
    height: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -180px;
    margin-left: -280px;
    z-index: 3;
    color: #fff;
  }

  .login_wrap .logo {
    margin-left: 180px;
    margin-bottom: 29px;
  }

  .login_wrap form {
    margin-left: 50px;
  }

  .login_wrap input {
    background: #0d1953;
    width: 413px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #3c498a;
    margin-left: 0px;
    padding-left: 5px;
    color: #fff;
  }

  input:focus {
    outline: none;
  }

  .oneinput_box {
    position: relative;
    margin-bottom: 25px;
    overflow: hidden;
    width: 457px;
    padding-left: 10px;
  }

  .oneinput_box * {
    float: left;
  }

  .oneinput_box span {
    background: #0d1953;
    border: 1px solid #3c498a;
    padding: 11px 9px;
    border-right: none 0;
    height: 12px;
    width: 10px;
    padding-left: 10px;
    overflow: hidden;

  }

  .oneinput_box .icon {
    top: 0;
    left: 10px;
    font-size: 10px;
    width: 9px;
    height: 12px;
  }

  .oneinput_box .fa-lock {
    top: 0;
    left: 10px;
    font-size: 10px;
    width: 9px;
    height: 12px;
    z-index: 1000000000;
  }

  .erwei_code {
    width: 91px;
    height: 34px;
    float: right;
    cursor: pointer;
  }

  .btn {
    width: 113px;
    height: 34px;
    line-height: 34px;
    border: none;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .btn-info {
    background: #3cadcf;
    float: left;
  }

  .btn-info:hover {
    background: #1f8fb0;
  }

  .btn-success {
    background: #5cb85c;
    float: right;
  }

  .btn-success:hover {
    background: #449d44;
  }
</style>