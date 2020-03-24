import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'
import sysRouter from './modules/sys'
import testRoutes from './modules/test'
import { Message } from 'element-ui'

import a from '@/components/a'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const constantRoutes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/a',
    component: Layout
  },
  {
    path: '/login',
    component: () =>
      import ('@/views/sys/sign')
  },
  testRoutes,
  {
    path: '*',
    component: a
  },
  sysRouter
]

const asyncRoutes = [
  sysRouter
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const routes = createRouter()

// 前置导航守卫
// routes.beforeEach((to, from, next) => {
//   // 检测用户是否登录, 检测localStore中是否存在token;
//   if (to.path != '/login') {
//     // let token = window.localStorage.getItem('token')
//     let token = JSON.parse(window.localStorage.getItem('login_msg'))
//     if(!token) {
//       Message.error('您还没有登录，请先登录！')
//       routes.push('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default routes
