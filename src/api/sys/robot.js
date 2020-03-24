import request from '@/utils/request'

// 展示配电组织站所树
export function queryDeptStationDataList () {
  return request({
    url: '/dept/getDeptStationTree?treeType=1',
    method: 'post'
  })
}
// 获取表格展示数据
export function queryRobotMsgDataList (requestData) {
  return request({
    url: '/distributRobot/queryPage',
    method: 'post',
    data: requestData
  })
}
// 查询配电设备数量
export function queryDeviceNumber (requestData) {
  return request({
    url: '/distributRobot/queryRobotNum',
    method: 'post',
    data: requestData
  })
}
// 网络状态下拉框展示
export function queryNetStatus () {
  return request({
    url: '/dict/queryType?type_code=8',
    method: 'get'
  })
}
// 获取机器人型号
export function queryRobotModel () {
  return request({
    url: '/dict/queryType?type_code=12',
    method: 'get'
  })
}
// 获取机器人类型
export function queryRobotType () {
  return request({
    url: '/dict/queryType?type_code=19',
    method: 'get'
  })
}
// 获取摄像头型号
export function queryCameraType () {
  return request({
    url: '/dict/queryType?type_code=20',
    method: 'get'
  })
}
// 删除巡检设备
export function deleteDevice (row) {
  console.log(row)
  return request({
    url: '/distributRobot/delete',
    method: 'post',
    data: row
  })
}
// 获取巡检机器编号
export function queryRobotCode (requestData) {
  return request({
    url: '/distributRobot/getRobotId',
    method: 'post',
    data: requestData
  })
}

// 保存表单数据
export function saveFormData (dialogMode, requestData) {
  return request({
    url: '/distributRobot/' + dialogMode,
    method: 'post',
    data: requestData
  })
}
// update 摄像头
export function updateCamera (dialogMode, requestData) {
  return request({
    url: '/videoCamera/' + dialogMode,
    method: 'post',
    data: requestData
  })
}

// 同步测点操作
export function SynchronousPoint (stationId, robotIp) {
  return request({
    url: '/policyNode/gainDevicePointByRobotIp?stationId=' + stationId + '&robotIp=' + robotIp,
    method: 'post'
  })
}
// 同步历史任务数据
// export function SynchronousHistoryTask (stationId, robotIp) {
//   console.log(stationId, robotIp)
//   return request({
//     url: '/historyPollingRecord/queryHistoryTaskRecord?stationId=' + stationId + '&robotIp=' + robotIp,
//     method: 'post'
//     // data: requestData
//   })
// }
