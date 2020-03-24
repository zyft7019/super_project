import request from '@/utils/request'

// 获取区域信息
export function getDeptList () {
  return request({
    url: '/sysDept/queryList',
    method: 'post',
    data: {}
  })
}
// 获取楼层信息
export function getAreaList ({ deptId } = {}) {
  return request({
    url: '/sysArea/queryList',
    method: 'post',
    data: { deptId }
  })
}
// 获取楼层区域机器人列表
export function getRobotList ({ deptId, currentAeraId } = {}) {
  return request({
    url: '/robot/queryList',
    method: 'post',
    data: { deptId, currentAeraId }
  })
}
