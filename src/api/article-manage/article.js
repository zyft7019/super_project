import request from '@/utils/request'

// 站所类型下拉框信息 http://192.168.201.42:8077/cms/content/queryPageList
export function queryPageList (data) {
  return request({
    url: '/cms/content/queryPageList',
    method: 'post',
    data: data
  })
}

// 新增文章 /cms/content/insert
export function addContentData (data) {
  console.log(data)
  return request({
    url: '/cms/content/insert',
    method: 'post',
    data: data
  })
}

// 修改文章 /cms/content/update
export function updateContentData (data) {
  console.log(data)
  return request({
    url: '/cms/content/update',
    method: 'post',
    data: data
  })
}

// 删除文章
// /cms/content/delete
export function contentDelete (data) {
  return request({
    url: '/cms/content/delete',
    method: 'post',
    data: data
  })
}

// 获取单条信息详情 /cms/content/getRecordByPK
export function getRecordByPK (data) {
  return request({
    url: '/cms/content/getRecordByPK',
    method: 'post',
    data: data
  })
}

// export function articleConUpdate (articleConFrom) {
//   // console.log(articleConFrom)
//   return request({
//     url: '/cms/uedit/update',
//     method: 'post',
//     data: articleConFrom
//   })
// }

// 检测对象是否为空
export function testingObject (params) {
  let arr = Object.keys(params)
  return arr.length === 0
}
