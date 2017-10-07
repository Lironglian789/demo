<template>
	<div class="box">
		<table class="tableList_table">
			<thead>
				<tr>
					<th v-for='data in th_lists' :width="data.width">{{data.value}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in lists">
					<td>{{data.userName}}</td>
					<td>{{data.trueName}}</td>
					<td>{{data.power}}</td>
					<td>{{data.phone}}</td>
          <td>{{data.upDateAt}}</td>
          <td>
          	<button @click="update(data)">编辑</button>
          	<button @click="deleteRow(data)">删除</button>
          </td>
				</tr>
        <tr>&nbsp</tr>
        <tr>&nbsp</tr>
			</tbody>
      <tfoot>
        <td class="paging_class" :colspan="6">
          <div>
            <ul class="pageTheLi">
              <li>
                <a @click="onFirstClick">
                  <img src="../assets/first.png" />
                </a>
              </li>
              <li>
                <a @click="onPrevClick">
                  <img src="../assets/prev.png" />
                </a>
              </li>
              <li>
                {{counts.value}}
              </li>
              <li>
                <a @click="onNextClick">
                  <img src="../assets/next.png" />
                </a>
              </li>
              <li>
                <a @click="onLastClick">
                  <img src="../assets/last.png" />
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tfoot>
		</table>
	</div>
</template>
<script>
  import adminData from '../vuex/adminListStore'
 	export default{
 		data(){
 			return{
        // 表头信息
 				th_lists:this.tableListData.th_lists,
        counts:this.tableListData.count   // 当前页数 count 从store里面获得
 			}
 		},
 		props:['tableListData'],   // 去父组件admin 获取数据
 		
 		methods:{
      update(data){
        // 1.点击的是谁==》自身携带的数据也可以证明我是谁
        this.$adminListStore.commit('setAddBtnFlag','block')  // 显示弹窗
        this.$adminListStore.commit('setUserInfor',data)     // 设置弹窗信息 
      },
      deleteRow(data){
        this.$axios({
          method:'get',
          url:'/VueHandler/AdminHandler?action=delete',
          params:{
            tokenId:data.ID
          }
        }).then(function(res){
          if(res.data.success){
            alert('删除成功')
            adminData.state.tableList.getListData();  // 重新请求数据
          }else{
            alert('删除失败')
          }
        }).catch(function(err){
          alert(err)
        })
      },
      // 关于分页事件
      onFirstClick(){
        adminData.commit('subFirstClick')  // 第一页
        adminData.state.tableList.getListData();
      },
      onPrevClick(){
        adminData.commit('subPrevClick')  // 减少页数
        adminData.state.tableList.getListData();
      },
      onNextClick(){
        adminData.commit('subNextClick')  // 增加页数
        adminData.state.tableList.getListData();
      },
      onLastClick(){
        adminData.commit('subLastClick')  // 最后一页
        adminData.state.tableList.getListData();
      }
    },
    computed:{  // 计算属性是动态获取数据  data(){}只加载一次，刷新后会消失
      lists(){
        return this.tableListData.list
      }
    }
    
 	}
</script>
<style scoped>
  ul li{
    list-style: none;
  }
  *{
    margin: 0;
    padding: 0
  }
  .tableList_table {
    width:100%;
    /*height:400px;*/
    background-color:#FFFFFF;
    border-collapse:collapse;
  }
  .tableList_table thead tr{
    color:#666666;
    background-color:#EFEFEF;
    border:1px solid #C0C0C0;
    height:34px;
    font-size:13px;
  }
  .tableList_table tbody tr{
    height:34px;
    font-size:14px;
  }
  .tableList_table tbody tr td{
    padding-left: 10px;
    height:34px;
    font-size:14px;
  }
  .tableList_table thead tr{
    border-right:none;
  }
  .tableList_table thead tr th{
    padding-left:10px;
    border-right:1px solid #C0C0C0;
  }
  .tableList_tr_black {
    background-color:#FAFAFA;
  }
  .tableList_table tbody tr:hover { /*鼠标移入时的背景颜色*/
    background-color:#ECF4FF;
  }
  .tableList_table tbody button {
    margin:0;
    padding:0;
    list-style-type:none;
    color:blue;
    background:none;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    width:50px;
    height:30px;
    line-height:30px;
  }
  .tableList_table tbody button:hover{
    cursor:pointer;
  }
  #tableList_table_tbody_tr_click {
    border:1px solid #C0C0C0;
  }
  .tableList_table tfoot {
    width:100%;
  }
  .tableList_table tfoot tr {
    width:100%;
    height:30px;
    border:1px solid #C0C0C0;
  }
  .tableList_table tfoot tr td{
    height:30px;
  }
  .tableList_table tfoot tr td li{
    border:none;
  }
  .tableList_table tfoot tr td li img{
    vertical-align: bottom;
    margin-bottom:3px;
  }
  .tableList_table tfoot tr td li img:hover{
    cursor:pointer;
  }
  .paging_class {
    text-align:left;
  }
  .box {
    padding: 0;
  }
  .pageTheLi li{
    float: left;
    margin-left: 30px;
  }
</style>
