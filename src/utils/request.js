import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import {baseUrl} from '@/config.js'

const service = axios.create({
  // 配置基础访问路径
  baseURL: baseUrl === 'local' ? process.env.VUE_APP_BASE_API : baseUrl, // 和后端调试地址
  // baseURL: 'https://36.112.33.43:1357/web', // 服务基础路径 外网地址
  // baseURL: 'https://192.168.50.114/web', // 服务基础路径
  // baseURL: 'http://192.168.120.174:8081',
  timeout: 5000
})

// 设置请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
service.interceptors.request.use(
  config => {
    // token 认证
    // if (localStorage.getItem('login_msg')) {
    //   //token字段是要和后端协商好的
    //   let token = JSON.parse(window.localStorage.getItem('login_msg'))
    //   config.headers.common["Authorization"] = token.data
    //   // debugger
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.code === 2000) {
    //   // Message.warning(res.msg)
    //   Message.warning('登录已过期，请重新登录！')
    //   window.localStorage.removeItem('userMsg')
    //   window.localStorage.removeItem('login_msg')
    //   router.push('/login')
    // } else {
      return res
    // }
  },
  error => {
    console.log(error.message)
    console.log('err ' + error)
    return Promise.reject(error)
  }
)

export default service
