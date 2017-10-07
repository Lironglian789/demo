import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)
import login from '@/components/login'  // 引入登录组件
import Home from '@/components/index'   // 引入首页组件
import Admin from '@/components/admin'
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  
  ]
})
