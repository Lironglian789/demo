import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// 允许跨域
axios.defaults.withCredentials=true;
var myAxios=axios.create({
	baseURL:'http://localhost:8000/'
});
// 加载数据函数
var tableAdminList=function(){
    // 初步
    myAxios({
    	method:'get',
    	url:'/VueHandler/AdminHandler?action=show',
    	params:{ 
    		pageStart:state.pageStart,    // 请求第几页
    		searchText:state.searchText  //查询条件
    	}
    }).then(function(response){
        // console.log(response)
        // 设置最大页数
            state.maxAdminCount=Math.ceil(response.data.data.count/state.pageSize)
            // console.log(state.maxAdminCount)
        	state.tableList.list=[];
	        for(var i=0;i<response.data.data.list.length;i++) {
				var obj={
					//数据的值
					userName:response.data.data.list[i].userName,
					trueName:response.data.data.list[i].trueName,
					power:response.data.data.list[i].power,
					phone:response.data.data.list[i].phone,
					ID:response.data.data.list[i].tokenId,
					upDateAt:response.data.data.list[i].upDateAt,
					//  编辑 和删除按钮  删除权限  trueName  开头是 fcgl 禁止删除的
					edit:true,
					delete:true
				}
				//  将收集到数据 添加到
				state.tableList.list.push(obj);
				// list:[{},{}]
				// console.log('11111')
				// console.log(state.tableList.list)
			}
    }).catch(function(err){
    	alert(err)
    })
}

// Vue.use(Vuex);

const state={
    addBtnFlag:{   // 控制添加弹窗的显示和隐藏
        'display':'none'
    },
    userInfor:{
    	userName:'',
		trueName:'',
		phone:'',
		power:'',
		tokenId:''  // 不是用于注册  注册时服务器自动生成的   是为编辑功能做准备的
    },
    // list里的基本数据
    pageStart:1,  // 基础页
    pageSize:3,    // 每页显示条数   
    searchText:'', //查询条件
    maxAdminCount:1,  // adminList 最大页
    minAdminCount:1,  // adminList 最小页
    tableList:{
    	getListData:tableAdminList,
    	th_lists:[
		   {
		   	value:'用户名',
		   	width:'10%',
		   	trueName:'userName'   // 标识哪一列应该加载什么
		   },
		   {
		   	value:'姓名',
		   	width:'10%',
		   	trueName:'trueName'
		   },
		   {
		   	value:'后台权限',
		   	width:'20%',
		   	trueName:'power'
		   },
		   {
		   	value:'手机',
		   	width:'20%',
		   	trueName:'phone'
		   },
		   {
		   	value:'编辑日期',
		   	width:'20%',
		   	trueName:'upDateAt'
		   },
		   {
		   	value:'操作',
		   	width:'20%'
		   }
		],
		list:[],    // 用来收集请求过来的人员数据
    	btnList:{  //关于adminList里面的点击事件
    	// 查询
	    	btn_click(){
	    		tableAdminList()
	    	}
    	},
    	count:{ // 分页时用到的页数
    		value:1
    	}
    }
    

};
const mutations={   //修改数据
	// 修改上面state addBtnFlag的值==》控制显示或隐藏弹窗
	setAddBtnFlag:function(state,str,data){  // 这里只有两个参数，第三个参数是传不进来的 所以undefind
        // 修改
        state.addBtnFlag.display=str
        // console.log("弹窗信息："+data)  // undefind  故选择 setUserInfor(state,data)传值
	},
	setUserInfor(state,data){   // data 为编辑做准备
		if(data){
			// state.userInfor 就是添加弹窗的值
			state.userInfor.userName=data.userName,
			state.userInfor.trueName=data.trueName,
			state.userInfor.phone=data.phone,
			state.userInfor.power=data.power,
			state.userInfor.tokenId=data.ID
 
		}else{  // 关闭弹窗时清空数据
			state.userInfor.userName='',
			state.userInfor.trueName='',
			state.userInfor.phone='',
			state.userInfor.power='',
			state.userInfor.tokenId=''
		}
	},
	//第一页
	subFirstClick(state){
		state.pageStart=1;
		state.tableList.count.value=state.pageStart
	},
	// 向上一页
	subPrevClick(state){
		if(state.pageStart>1){
			state.pageStart--;
		    state.tableList.count.value=state.pageStart
		}
	},
	// 向下一页
	subNextClick(state){
		// state.maxAdminCount 最大值每次加载数据都会重新计算
		if(state.pageStart<state.maxAdminCount){
            state.pageStart++;
		    state.tableList.count.value=state.pageStart
		}
		
	},
	//最后一页
	subLastClick(state){
		state.pageStart=state.maxAdminCount;
		state.tableList.count.value=state.pageStart
	}
}



export default new Vuex.Store({
    state,
    mutations
})