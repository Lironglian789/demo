<template>
	<div>
		<div><fchead></fchead></div>
		<div class="adminListContent">
			<span style="color:#2880E4">首页/ </span><span>用户管理/ </span><span>系统人员</span>
             <div class="fc_section_wrap">
             	<ul>
             		<li class="admin_top_input"><input type="text" v-model="searchText"/></li>
             		<li class="admin_top_input"><button class="btn_class" style="background: #5CB85C" @click="search()">查询</button></li>
             		<li class="admin_top_add"><button class="btn_class" style="background: #4D65B3" @click="alertShow">+添加</button></li>
             	</ul>
             </div>
             <!-- 表格 -->
			<div class="functional_block">
				<div class="functional_block_top">
					<div class="functional_block_left"></div>
					<div class="functional_block_right">系统人员列表</div>
				</div>
				<div class="functional_block_bottom">
					<tableList :tableListData="tableListDataStore"></tableList>
				</div>
			</div>
			<!-- 弹窗 -->
			<div v-bind:style="addBtnFlag">
				<!-- 弹窗内容 -->
               <adminAlert></adminAlert>
			</div>
		</div>
	</div>
</template>
<script>
	import fchead from './fchead'
	// 从adminListStore 里面获取数据
	// import store from './xxx'  获取数据    ===》 $store.state.xxx 只能获取一个store.js文件里的数据
	/* main.js 已经把adminListStore赋值给原型 挂载到实例上，这里可以不用在挂载
	   可以不引入 直接this.$adminListStore调用，再次引入 ，不用考虑this指向
	*/
	import adminData from '../vuex/adminListStore'   // 避免关键字store 可以引入多个
	import adminAlert from './adminAlert.vue'
	import tableList from './tableList'

	export default{
		components:{fchead,adminAlert,tableList},
		data(){  // 只加载一次
			return{
                searchText:''
			}
		},
		methods:{
            alertShow(){  // 添加弹窗的显示和隐藏
            	adminData.commit('setAddBtnFlag','block')
            },
            search(){
            	// 获取当前输入框输入的内容 并传给adminListStore里面的searcheText
            	// 按条件查询数据函数 查询条件可以是store里面的searcheText
            	adminData.state.searchText=this.searchText;
            	adminData.state.tableList.btnList.btn_click();
            	// 清空查询条件 || 初始化
            	adminData.state.searchText="";
            	this.searchText=""
            }
		},
		computed:{
            addBtnFlag(){  // 通过计算属性的方式将数据仓库里的数据 储存在本地的addBtnFlag
           	   return adminData.state.addBtnFlag
           	// return this.$adminListStore.state.xxx;
            },
            tableListDataStore(){  // 在系统人员页面从 store 获取到tableListd数据
           	   return adminData.state.tableList
            }

		},
		mounted:function(){
			//挂在之后 调用请求人员的函数
	        adminData.state.tableList.getListData()

		}
	}
</script>
<style scoped>
	ul li {
		list-style: none
	}
	
	.adminListContent {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		background: #F5F5F5;
		min-width: 1100px;
		height: 100%;
	}
	
	.admin_top_input input {
		width: 250px;
		height: 25px;
		padding-left: 5px;
	}
	
	.fc_section_wrap {
		height: 35px;
		padding: 10px;
		border: 1px solid #C0C0C0;
		background: #FFFFFF;
		margin-top: 15px;
		margin-bottom: 15px;
	}
	
	.fc_section_wrap ul {
		margin: 0;
		padding: 0;
	}
	
	.fc_section_wrap ul li {
		display: inline-block;
		margin: 0;
		margin-right: 5px;
		padding: 0;
	}
	
	.admin_top_add {
		float: right;
	}
	
	.btn_class {
		width: 80px;
		height: 32px;
		margin: 0;
		padding: 0;
		border: none;
		cursor: pointer;
		color: #fff;
		margin-right: 10px;
	}
	
	.functional_block {
		width: 100%;
		line-height: 34px;
		background: #fff;
		text-align: left;
		margin-top: 15px;
		border: 1px solid #C0C0C0;
	}
	
	.functional_block_top {
		height: 34px;
		position: relative;
		border-bottom: 1px solid #C0C0C0;
	}
	
	.functional_block_left {
		position: absolute;
		width: 34px;
		height: 34px;
		border-right: 1px solid #C0C0C0;
		background: url(../assets/functional_block.png) no-repeat center;
	}
	
	.functional_block_right {
		padding-left: 40px;
	}
	
	.functional_block_bottom {
		overflow: hidden;
	}	

</style>