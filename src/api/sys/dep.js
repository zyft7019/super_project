import request from '@/utils/request'

// 获取组织树信息
export function getDeptList () {
  return request({
    url: '/dept/queryDeptTree?treeType=1',
    method: 'post',
    data: {}
  })
}
// 获取配电组织类型
export function queryDeptTypes () {
  return request({
    url: '/dict/queryType?type_code=1',
    method: 'get',
    data: {}
  })
}
// 保存添加组织
export function saveDept (form, dialogMode) {
  return request({
    url: '/dept/' + dialogMode,
    method: 'post',
    data: form
  })
}
// 删除组织操作
export function deleteDept (curNodeId) {
  return request({
    url: '/dept/deleteOne?id=' + curNodeId,
    method: 'delete'
  })
}
// // 获取楼层信息
// export function getAreaList ({ deptId } = {}) {
//   return request({
//     url: '/sysArea/queryList',
//     method: 'post',
//     data: { deptId }
//   })
// }
// // 获取楼层区域机器人列表
// export function getRobotList ({ deptId, currentAeraId } = {}) {
//   return request({
//     url: '/robot/queryList',
//     method: 'post',
//     data: { deptId, currentAeraId }
//   })
// }
