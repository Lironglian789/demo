
import Vue from 'vue';   // 加载vue.js
import router from './router';  // 默认加载index.js
import axios from 'axios';   // 默认加载vue官方推荐的交互工具 asios

// 方法一. 关于跨域  允许跨域
axios.defaults.withCredentials=true;
var myAxios=axios.create({           // 设置基本请求的路径
	baseURL:'http://localhost:8000'
});
// 把myAxios===》赋给原型   使用组件里进行调用是只需 this.$axios即可
Vue.prototype.$axios=myAxios;
// 引入vuex
import adminListStore from './vuex/adminListStore.js';
// 放置到原型上面
Vue.prototype.$adminListStore=adminListStore;




// 方法二：代理 config===》index.js    proxyTable 里配置


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router
});
