import store from './index'

const globalSubscriptionMap = [
  // { topic: '/topic/robotPosInfo', stateKey: 'robotPositions', type: 'replace' },
  // { topic: '/topic/robotStatus', stateKey: 'robotStatus', type: 'replace' }
  // { topic: '/topic/cameraStatus', stateKey: 'cameraStatus', type: 'replace' },
  // { topic: '/topic/robot/findFlame', stateKey: 'findFlame', type: 'replace' },
  // { topic: '/topic/robot/outFire', stateKey: 'findFlame', type: 'replace' }
]

function globeSubscribe () {
  globalSubscriptionMap.forEach(sub => {
    store.dispatch('subscription/subscribeTopic', {
      topic: sub.topic,
      stateKey: sub.stateKey,
      type: sub.type
    })
  })
}

export {
  globeSubscribe
}
