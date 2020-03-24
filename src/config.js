const devEntry = 'local'
// console.log(process.env.NODE_ENV)
const isProdution = process.env.NODE_ENV === 'production'
const developmentBaseUrlMap = {
  'tests': {
    proxyPath: '/tests',
    socketUrl: '192.168.20.129:8089'
  },
  'zhangyanbin': {
    proxyPath: '/zhangyanbin',
    socketUrl: '192.168.120.130:8082'
  },
  'caopanpan': {
    proxyPath: '/caopanpan',
    socketUrl: '192.168.120.174:8081'
  },
  'lugong': {
    proxyPath: '/lugong',
    socketUrl: '192.168.201.42:8077'
  },
  'local': {
    proxyPath: 'local',
    socketUrl: '127.0.0.1:8080'
  }
}
const baseUrl = isProdution ? process.env.VUE_APP_BASE_API : developmentBaseUrlMap[devEntry].proxyPath
// console.log(baseUrl)
const upLoadUrl = baseUrl === 'local' ? process.env.VUE_APP_LOCALSERVER : baseUrl
console.log(upLoadUrl)

// this socketUrl is used by utils/socket.js
let socketUrl = developmentBaseUrlMap[devEntry].socketUrl
// socketUrl = isProdution ? `${location.host}/toWarnMessage` : socketUrl

// socketUrl = isProdution ? `/toWarnMessage` : `http://${socketUrl}/toWarnMessage`
// console.info(`backendUrl: ${baseUrl}; socketUrl: ${socketUrl}`)

let socketLogLevel = isProdution ? false : 1
export {
  baseUrl,
  // socketUrl,
  socketLogLevel,
  isProdution,
  upLoadUrl
}
window.setSocketLogLevel = function (level) {
  const filter = [false, 0, 1, 2, 3]
  if (filter.indexOf(level) === -1) {
    return Error(`argument should be one of [${filter.join()}]`)
  }
  socketLogLevel = level
  return level
}
