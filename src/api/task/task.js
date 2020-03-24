import request from '@/utils/request'

// 展示配电组织站所树
export function queryPolicyTypeProperty () {
  return request({
    url: '/policyType/findProperties',
    method: 'get'
  })
}
// 展示配电组织站所树
export function queryCheckPointTree () {
  return request({
    url: '/policyNode/devicePointTree?isUnion=true',
    method: 'post'
  })
}
