import request from '@/utils/request'

// 站所类型下拉框信息
export function queryStationTypes () {
  return request({
    url: '/dict/queryType?type_code=4',
    method: 'get',
    data: {}
  })
}
// // 获取配电组织类型
export function queryPageStationList (form) {
  return request({
    url: '/station/queryPage',
    method: 'post',
    data: form
  })
}
// // 保存添加组织
export function saveStation (form, dialogMode) {
  return request({
    url: '/station/' + dialogMode,
    method: 'post',
    data: form
  })
}
// 删除组织操作
export function deleteStation (row) {
  console.log(row)
  return request({
    url: '/station/delete',
    method: 'post',
    data: row
  })
}
export function testingObject (params) {
  let arr = Object.keys(params)
  return arr.length === 0
}
