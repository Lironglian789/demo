<template>
	<div :style='alertStyle'>
		<div :style="alertAll">
			<div class="alert-head">
				&nbsp<span class="head-title">添加管理员</span>
				<img src="../assets/images/x.png" @click="close"/>
			</div>
			<ul class="alert-body">
				<li>
					<span>用户名：</span>
					<input type="text"  v-model="userInfor.userName"/>
				</li>
				<li>
					<span>姓名：</span>
					<input type="text" v-model="userInfor.trueName"/>
				</li>
				<li>
					<span>手机号：</span>
					<input type="text" v-model="userInfor.phone"/>
				</li>
				<li>
					<span>权限选择：</span>
					<select v-model="userInfor.power">
						<option>系统管理员</option>
						<option>课程管理员</option>
					</select>
				</li>
			</ul>
			<div class="btn_wrap">
				<button @click="enter">确定</button>
			    <button @click="close">取消</button>
			</div>
		</div>
	</div>
</template>
<script>
    import adminData from '../vuex/adminListStore'
	export default{
		data(){
			return{
				alertStyle:{
					'width':window.innerWidth+'px',
					'height':window.innerHeight+'px',
					'position':'absolute',
					'top':0,
					'left':0,
					'background':'rgba(255,255,255,0.8)'
				},
				alertAll:{
					'position':'relative',
					'width':'410px',
					'height':'250px',
					'top':window.innerHeight/2-250/2+"px",
					'left':window.innerWidth/2-410/2+"px",
					'background':"#fff",
					'border':"5px solid #4f66bb"
				}
			}
		},
		methods:{
			close(){
				this.$adminListStore.commit('setAddBtnFlag','none')    // 方法一：
				// adminData.commit('setAddBtnFlag','none')            // 方法二： 

				this.$adminListStore.commit('setUserInfor','none')     //  清空数据 
			},
			enter(){ //点击添加时没有数据传入 ，点击编辑时有值传入
				// console.log(this.userInfor)
				// 根据点击的添加还是编辑使用不同的接口
				var url='';
				var data={  // 准备通过请求发送给服务器的数据
					userName:this.userInfor.userName,
					trueName:this.userInfor.trueName,
					phone:this.userInfor.phone,
					power:this.userInfor.power
					// password:'123456'   //写死
				};
				if(this.userInfor.tokenId){  // 编辑时才有tokenId的值
					// 只能根据tokenId 进行修改 因为后台是根据tokenId进行修改的
					data.tokenId=this.userInfor.tokenId;
					url="/VueHandler/AdminHandler?action=update"
				}else{
					//添加功能
					// 密码
					data.password="123456";
					url="/VueHandler/AdminLoginAndRegHandler?action=add"
				}
				// console.log(data)
				var _this=this;
				this.$axios({
					method:'post',
					url:url,
					data:data
				}).then(function(res){
					if(res.data.success){
						alert(res.data.success)
						_this.close()    // 调用关闭弹窗函数清空数据并关闭
						adminData.state.tableList.getListData()
					}else{
						alert(res.data.err)
					}
				}).catch(function(err){
					alert(err)
				})
			}
		},
		computed:{
			userInfor(){
				return this.$adminListStore.state.userInfor
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
		width: 270px;
		text-align: right;
		margin: 0 auto;
		margin:20px auto;
	}
	.alert-body li{
		margin-bottom: 10px;
	}
	select{
		display: inline-block;
		width: 175px;
		height: 25px;
	}
	.btn_wrap{
		width: 270px;
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