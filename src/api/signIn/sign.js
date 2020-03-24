import request from '@/utils/request'

// 后台管理系统登录接口
export function signIn(data) {
  return request({
    url: '/syslogin/do_login',
    method: 'post',
    data: data
  })
}

// 获取加密公钥 publicKey
export function queryPublicKey(data) {
  return request({
    url: '/encryption/getPublicKey',
    method: 'post',
    data: data
  })
}
