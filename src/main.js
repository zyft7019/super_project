import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import directives from './utils/directive'

import Element from 'element-ui'
import './styles/index.less'

// import { connect } from './utils/socket'

import installFilter from './utils/filter'

installFilter(Vue)
  // connect()
directives.forEach(d => {
  Vue.directive(d.name, d.value)
})
Vue.use(Element, { size: 'small' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
