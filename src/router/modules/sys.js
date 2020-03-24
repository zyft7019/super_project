import { sign, contentManage, role, articleManage, singlePage } from '@/views/sys/'
import Layout from '@/layout'
const sysRouter = {
  path: '',
  component: Layout,
  children: [{
      path: 'sign',
      component: sign,
      name: 'sys-sign'
    }, {
      path: 'contentManage',
      component: contentManage,
      name: 'contentManage'
    }, {
      path: 'role',
      component: role,
      name: 'sys-role'
    }, {
      path: 'articleManage',
      component: articleManage,
      name: 'articleManage'
    }, {
      path: 'singlePage',
      component: singlePage,
      name: 'singlePage'
    }
  ]
}

export default sysRouter
