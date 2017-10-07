<template>
	<div :style="alertStyle">  <!-- 遮罩层 -->
		<div :style="alertAll">  <!-- 放置修改密码的弹窗的容器 -->
			<div class="alert-head">
				&nbsp<span class="head-title">修改密码</span>
				<img src="../assets/images/x.png" @click="close()"/>
			</div>
			<ul class="alert-body">
				<li>
					<span>当前密码：</span>
					<input type="text"  ref="old_pass"/>
				</li>
				<li>
					<span>新密码：</span>
					<input type="text" ref="new_pass"/>
				</li>
				<li>
					<span>确定密码：</span>
					<input type="text" ref="confirm_pass"/>
				</li>
			</ul>
			<div class="btn_wrap">
				<button @click="confirm()">确定</button>
			    <button @click="close()">取消</button>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default{
        data(){
         	return{
         		alertStyle:{  // 遮罩层
                   'width':window.innerWidth+'px',
                   'height':window.innerHeight+'px',
                   'position':'absolute',
                   'z-index':3,
                   'top':0,
                   'left':0,
                   'background':'white',
                   'opacity':0.9
         		},
         		alertAll:{
         			'width':'410px',
         			'height':"200px",
         			'position':"relative",
         			'top':window.innerHeight/2-200/2+"px",
         			'left':window.innerWidth/2-410/2+"px",
         			'border':"5px solid #4f66bb",
         			'background':'#fff'
         		}
         	}
        },
        methods:{
         	close(){  //关闭弹窗
         	// 弹窗显示是在父组件里的isSwitch=true
         	// 弹窗隐藏 ===》 父组件里的isSwitch=false
               this.$emit('close'); //自定义事件
         	},
         	confirm(){
         		var oldPass=this.$refs.old_pass.value;
         		var newPass=this.$refs.new_pass.value;
         		var confirmPass=this.$refs.confirm_pass.value;
         		if(confirmPass==newPass){
	         		this.$axios({
	                	method:'post',
	                	url:'/VueHandler/AdminHandler?action=updatepass',
	                	data:{
	                        userPwd:oldPass,
	                        newPwd:newPass
	                	}
	                }).then(function(res){
	                	if(res.data.success){
                           alert(res.data.success);
                           window.location.href="/";
	                	}else{
	                		alert(res.data.err);
	                	}
	                }).catch(function(err){
	                    alert(err);
	                })
         		}else{
         			alert('确认密码失败')
         		}
                
         	}
        }
	}
</script>
<style scoped>
	.alert-head{
		width: 410px;
		height: 30px;
		color: white;
		background: #4f66bb;
	}
	.alert-head img{
        float: right;
	}
	.alert-body{
		width: 280px;
		text-align: right;
		margin: 0 auto;
		margin:20px auto;
	}
	.alert-body li{
		margin-bottom: 10px;
	}
	.btn_wrap{
		width: 280px;
		margin-left: 80px;
	}
	button{
		width:70px;
		height:25px;
		color: white;
		border: none;
		outline: none;
		cursor: pointer;
	}
	button:nth-child(1){
		float: left;
		background: #6CBF6C;
	}
	button:nth-child(2){
		float: right;
		background: #50B5D5;
	}
</style>