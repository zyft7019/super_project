import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { socketUrl, socketLogLevel } from '../config'
import { globeSubscribe } from '@/store/subscription-entry'
const stompSubscriptions = {} // a map of subscription url to its callback and the subscription itself
const config = {
  url: '',
  login: 'guest',
  passcode: 'guest'
}
let connection
let timeoutID

const _socketUnhandled = []

function _pushToCacheQueue (url, callback, header) {
  const item = { url, callback, header }
  _socketUnhandled.push(item)
}

function _subscribe (url, callback, header) {
  if (stompSubscriptions[url]) {
    stompSubscriptions[url]['callback'] = callback
    return stompSubscriptions[url]['subscription']
  } else {
    stompSubscriptions[url] = { callback }
    socketLogLevel !== false && console.log(`<%c${url}%c> subscribed`, 'font-weight:bold', 'color: green')
    stompSubscriptions[url]['subscription'] = connection.subscribe(url, (msg) => {
      let body = JSON.parse(msg.body)
      switch (socketLogLevel) {
      case 1:
        console.log(`%c${url}`, 'color: DarkSlateGray', body)
        break
      case 2:
        console.log(`%c${url}`, 'color: DarkSlateGray', msg)
        break
      case 3:
        console.log(stompSubscriptions)
        break
      }
      stompSubscriptions[url]['callback'](body, msg.header)
    }, header)
    return stompSubscriptions[url]['subscription']
  }
}

function getSocket (url, callback, header) {
  clearTimeout(timeoutID)
  if (connection && connection.connected) {
    while (_socketUnhandled.length) {
      const item = _socketUnhandled.pop()
      if (item.url !== url) {
        _subscribe(item.url, item.callback, item.header)
      }
    }
    _subscribe(url, callback, header)
  } else {
    _pushToCacheQueue(url, callback, header)
    timeoutID = setTimeout(() => {
      getSocket(url, callback, header)
    }, 500)
  }
} // unfunctional getting mutiple sockets when connection is not established, in that case only the last one is kept /* fixed */

function dismissSocket (url) {
  if (stompSubscriptions[url]) {
    stompSubscriptions[url]['subscription'].unsubscribe()
    stompSubscriptions[url] = null
  } else {
    console.warn(`subscription to ${url} doesn't exsit or dismissed already`)
  }
}

function connect () {
  // const ws = new SockJS(`http://${socketUrl}/toWarnMessage`)
  const ws = new SockJS(socketUrl)
  const client = Stomp.over(ws)
  client.connect({
    login: config.login,
    passcode: config.passcode
  }, () => {
    console.log('stomp server connected')
    globeSubscribe()
  }, (err) => {
    console.warn('stomp server connection failed', err)
    setTimeout(connect, 1000 * 60 * 5)
  })
  client.debug = function (str) {
    // console.log(str)
  }
  connection = client
}

function disconnect () {
  connection.disconnect && connection.disconnect(() => {
    console.log('stomp server disconnected')
  })
}
export { connect, disconnect, getSocket, dismissSocket }
