import request from '@/utils/request'

// 获取管理员列表
export function queryAdminDataList (requestData) {
  return request({
    url: '/cms/user/queryPageList',
    method: 'post',
    data: requestData,
    // headers:
  })
}

// 添加管理员
export function addAdmin (data) {
  return request({
    url: '/cms/user/insert',
    method: 'post',
    data: data
  })
}

// 编辑管理员
export function editAdmin (data) {
  return request({
    url: '/cms/user/update',
    method: 'post',
    data: data
  })
}

// 删除管理员操作
export function deleteAdmin(data)  {
  return request({
    url: '/cms/user/delete',
    method: 'post',
    data: data
  })
}

// 重置密码 /cms/user/ resetPassword
export function resetPassword (data) {
  return request({
    url: '/cms/user/resetPassword',
    method: 'post',
    data: data
  })
}

// 修改密码 /cms/user/updatePassword
export function editPassword (data) {
  return request({
    url: '/cms/user/updatePassword',
    method: 'post',
    data: data
  })
}
