import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'
import { getNs, validateNS } from './ns'
Vue.use(Vuex)
Vue.use(vuejsStorage)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
const moduleKeys = []
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  moduleKeys.push(moduleName)
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const globalNs = 'rootStore'
validateNS(globalNs)

const plugins = [
  vuejsStorage({
    namespace: globalNs,
    keys: [getNs(globalNs).checkKey, ...moduleKeys]
  })
]

const store = new Vuex.Store({
  state: {
    [getNs(globalNs).checkKey]: Date.now()
  },
  modules,
  // plugins
})
export default store