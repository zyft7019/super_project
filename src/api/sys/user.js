import request from '@/utils/request'

// 站所类型下拉框信息
export function queryUserDataList () {
  return request({
    url: '/test',
    method: 'get'
  })
}
// console.log(queryUserDataList())
// 获取配电组织类型
export function saveUser (form, dialogMode) {
  return request({
    url: '/user/' + dialogMode,
    method: 'post',
    data: form
  })
}
// 删除用户操作
export function deleteUser (id) {
  return request({
    url: '/user/delete?id=' + id,
    method: 'delete'
  })
}
// 用户角色
export function queryUserRoleDataList (requestData) {
  return request({
    url: '/sysRole/queryList',
    method: 'post',
    data: requestData
  })
}
// 删除用户角色
export function deleteUserRole (UserId) {
  return request({
    url: '/userRole/delete?userId=' + UserId,
    method: 'delete'
    // data: requestData
  })
}
// 添加用户角色
export function addUserRole (requestData) {
  return request({
    url: '/userRole/insertBatch',
    method: 'post',
    data: requestData
  })
}
// 更新权限操作
export function updateAuthority (id) {
  return request({
    url: '/api/user/clearCacheByUserId?userId=' + id,
    method: 'get'
    // data: requestData
  })
}
