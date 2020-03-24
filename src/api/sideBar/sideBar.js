import request from '@/utils/request'

// 获取导航栏（侧边栏）
export function getRecordLists () {
  return request({
    url: '/cms/category/getCategoryNavigationTree',
    method: 'post'
  })
}
