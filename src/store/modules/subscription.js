import {
  getSocket
  // dismissSocket
} from '@/utils/socket'

const state = {
  robotStatus: [], // 当前机器人状态
  robotPositions: {}, // 机器（多）位置
  cameraStatus: {}, // 当前摄像头状态
  findFlame: { data: {} } // 机器人发现火情
}
const mutations = {
  SET_SUBSCRIBTION_STATE (state, { stateKey, value }) {
    if (state.hasOwnProperty(stateKey)) {
      state[stateKey].push(value)
    }
  },
  REPLACE_SUBSCRIPTION_STATE (state, { stateKey, value }) {
    if (state.hasOwnProperty(stateKey)) {
      state[stateKey] = value
    }
  }
}
const getters = {
  cameraOnWarn: state => {
    const camera = state.cameraStatus
    if (camera.status === 2) {
      return {
        warning: true,
        videoPlayUrl: camera.videoPlayUrl,
        id: camera.id
      }
    } else {
      return {
        warning: false,
        videoPlayUrl: '',
        id: camera.id
      }
    }
  }
}
const actions = {
  subscribeTopic ({ commit }, { topic, stateKey, type, header }) {
    // (function (stateKey) {})(stateKey) ?
    getSocket(topic, msg => {
      // console.log(stateKey)
      // if (stateKey === 'findFlame') {
      //   console.log('findFlame', msg)
      // }
      switch (type) {
      case 'replace':
        commit('REPLACE_SUBSCRIPTION_STATE', {
          stateKey,
          value: msg
        })
        break
      case 'set':
        commit('SET_SUBSCRIBTION_STATE', {
          stateKey,
          value: msg
        })
        break
      }
    }, header)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
