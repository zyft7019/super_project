import { a, b, c, d, e } from '@/views/test'

import Layout from '@/layout'
const testRoutes = {
  path: '/test',
  component: Layout,
  children: [{
    path: 'a',
    component: a,
    name: 't-a',
    meta: {
      title: 't-a-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'b',
    component: b,
    name: 't-b',
    meta: {
      title: 't-b-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'c',
    component: c,
    name: 't-c',
    meta: {
      title: 'asdfasdggasdfasdggasdfasdggasdfasdgg-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'd',
    component: d,
    name: 't-d',
    meta: {
      title: 't-d-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'e',
    component: e,
    name: 't-e',
    meta: {
      title: 't-e-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'f',
    component: e,
    name: 't-f',
    meta: {
      title: 't-f-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'g',
    component: e,
    name: 't-g',
    meta: {
      title: 't-g-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'h',
    component: e,
    name: 't-h',
    meta: {
      title: 't-h-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }, {
    path: 'i',
    component: e,
    name: 't-i',
    meta: {
      title: 't-i-hasdfasdfoiflaea阿斯蒂芬啊手动阀手动阀'
    }
  }]
}
export default testRoutes