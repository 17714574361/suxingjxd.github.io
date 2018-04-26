import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/Login'
import Register from 'components/register/Register'
import Home from 'components/home/Home'
import Article from 'components/article/Article'
import Publish from 'components/publish/Publish'
import Detail from 'components/detail/Detail'
import Setting from 'components/setting/Setting'
import Index from 'components/index/Index'
import Search from 'components/search/Search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      redirect: 'home'
    },
    {
      path: '/login',
      name:'login',
      component:Login
    },
    {
      path: '/register',
      name:'register',
      component:Register
    },
    {
      path: '/setting',
      name:'setting',
      component:Setting
    },
    {
      path: '/search',
      name:'search',
      component:Search
    },
    {
      path: '/index',
      name:'index',
      component:Index
    },
    {
      path: '/home',
      name:'home',
      component:Home,
      children:[
        {
          path: '/home',
          name:'index',
          component:Index,
        },
        {
          path: '/article',
          name:'article',
          component:Article,
        },
        {
          path: '/home/detail',
          name:'detail',
          component:Detail,
        },
        {
          path: '/home/publish',
          name:'publish',
          component:Publish,
        }
      ]
    }
  ]
})
