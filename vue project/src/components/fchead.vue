<template>
	<div class="bg">
		<div class="header_wrap">
			<div class="logo_wrap"><a href=""><img src="../assets/back_logo.png" /></a></div>
			<ul class="header_nav">
				<li><a><i class="fa fa_globe"></i>卓新思创</a></li>
				<li><a><i class="fa fa_comment"></i>在线客服</a></li>
				<li><a><i class="fa fa_book"></i>常见问题</a></li>
				<li @click="safeShow"><a><i class="fa fa_lock"></i>安全中心</a></li>
				<li @click="safeOut"><a><i class="fa fa_sign_out"></i>退出</a></li>
				<li><a><span @click="toLogin">{{userName}} </span><img style="float: right" src="../assets/touxiang.jpg"/></a></li>
			</ul>
		</div>
		<div v-show="isSwitch">
              <safealert @close="isClose()"></safealert>
              <!-- 父组件接收到 子组件发送过来的自定义事件
              父组件执行事件 isClose -->
		</div>
		<div>
			<div class="nav" id="nav">
				<ul>
					<li>
						<div class="navName">
							<i class="icon icon-user"></i>
							<span>用户管理</span>
						</div>
						<div class="navItem navItem1">
							<div class="Item">
								<i class="icon icon-user"></i>
								<span @click="system">系统人员</span>
							</div>
							<div class="Item">
								<i class="icon icon-user"></i>
								<span>学员管理</span>
							</div>
						</div>
					</li>
					<li>
						<div class="navName">
							<i class="icon icon-user"></i>
							<span>课程管理</span>
						</div>
						<div class="navItem navItem1">
							<div class="Item">
								<i class="icon icon-user"></i>
								<span>添加课程</span>
							</div>
							<div class="Item">
								<i class="icon icon-user"></i>
								<span>添加课程</span>
							</div>
							<div class="Item">
								<i class="icon icon-user"></i>
								<span>添加课程</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import safealert from './safeAlert.vue'
	export default{
		components:{safealert},
		data(){
			return{
				isSwitch:false,
				userName:"请登录"
			}
		},
		methods:{
      toLogin(){
        window.location.href='/'
      },
			isClose(){
               this.isSwitch=false;
			},
			safeShow(){
				// alert('修改密码')
				this.isSwitch=true
			},
			safeOut(){   // 退出功能
			// 用户登录的时候 用户信息会被记录到服务器上面一块特殊的地方叫做session 登录状态
			// 退出状态：清空服务器上面记录的登录用户的这个区域
			// 后台接口
			// 调用接口
				this.$axios({
					method:'get',
					url:'/VueHandler/AdminHandler?action=quit',
					//是否需要参数
				}).then(function(res){
	                if(res.data.success){  // 2. 找到成功的响应结果
	                   alert(res.data.success)
	                   window.location.href='/'   // 借助路由 跳转到登录页
	                }else{
	                   alert(res.data.err)
	                }
				}).catch(function(err){
	                alert(err)
				})
			},
      system(){
        window.location.href='/admin'
      }
		},
    mounted:function(){  //返回用户信息
      var _that=this
      this.$axios({
        method:'post',
        url:"/VueHandler/AdminHandler?action=returnuserinfo",
      }).then(function(res){
        // console.log(res)     // 用户信息的 trueName 字段
        if (res.data.success) {
          _that.userName=res.data.userName
        }else{
          alert(res.data.err)
        }
      }).catch(function(err){
        alert("请登录用户信息")
      })
    }
  }
</script>
<style>
  ul li {
    list-style: none;
  }

  .bg {
    background: url(../assets/images/index_body_bg.jpg);
    height: 100px;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .header_wrap {
    height: 50px;
    background: #222222;
    font-size: 12px;
  }

  .logo_wrap {
    margin: 4px 0 0 18px;
    float: left;
  }

  .header_nav {
    float: right;
    color: #9d9d9d;
  }

  .header_nav li {
    float: left;
    line-height: 50px;
    padding: 0 15px;
  }

  .header_nav li a:hover {
    color: #fff;
    cursor: pointer;
  }

  .header_nav li a {
    color: #9D9D9D;
    position: relative;
  }

  .header_nav li a .icon {
    top: 0;
    border: none;
    left: -20px;
  }

  .header_nav i, .header_nav .name {
    margin-right: 6px;
  }
  ul li {
    list-style: none;
  }

  .nav {
    width: 100%;
    height: 50px;
    background: url(../assets/images/white_opacity_bg.png);
    position: relative;
  }

  .nav ul {
    /*padding-left: 500px;*/
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
  }

  .nav ul li .navName {
    font-size: 16px;
    float: left;
    padding: 0 30px;
    color: whitesmoke;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    position: relative;
  }

  .nav ul li .navName i {
    margin-right: 10px;
  }

  /*  上下白   设置基本属性  用css 伪类 设置*/
  .nav ul li .navName::before, .nav ul li .navName::after {
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    transition: .3s ease;
    opacity: 0;
  }

  /* 设置位置 颜色 */
  .nav ul li .navName::before {
    top: 20px;
    left: 66px;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
  }

  .nav ul li .navName::after {
    bottom: 20px;
    right: 66px;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
  }

  /*白色的那个条*/
  .nav .navItem {
    position: absolute;
    z-index: 200;
    /*left: -80px;*/
    top: 50px;
    width: 100%;
    height: 144px;
    background-color: white;
    border: 1px solid #ececec;
    display: none;
  }

  /* 白条中内容 */
  .nav .navItem .Item {
    float: left;
    margin: 52px 40px;
    width: 249px;
    height: 40px;
    border: 1px solid #ececec;
    font-size: 15px;
    line-height: 42px;
    text-align: center;
    cursor: pointer;
    transition: .2s ease;
  }

  .nav .navItem .Item:hover {
    background: #4c5c9c;
    color: white;
    font-size: 16px;

  }

  .nav .navItem .Item i {
    margin-right: 13px;
  }

  /*控制显示的移入*/
  .nav ul li:hover > .navItem {
    display: block;
  }

  /* 鼠标移入时 显示的 上下白 */
  .nav ul li:hover > .navName::before {
    top: 2px;
    left: 2px;
    opacity: 1;
    /*transition: .3s ease;*/
  }

  .nav ul li:hover > .navName::after {
    bottom: 2px;
    right: 2px;
    opacity: 1;
    /*transition: .3s ease;*/
  }


	
</style>