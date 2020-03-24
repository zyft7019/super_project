// import { getRobotList } from '@/api/home'
const state = {
  selectedArea: 0, // 选中区域
  selectedFloor: 0, // 选中楼层
  robotOnBoard: 1, // 选中楼层机器人列表
  selectedRobot: {} // 当前选中机器人
}

const mutations = {
  SET_HOME_STATE (state, { key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}
const getters = {}
const actions = {
  SET_HOME_STATE: ({ commit }, { key, value }) => {
    console.log(key, value)
    commit('SET_HOME_STATE', {
      key,
      value
    })
  },
  // async getRobotList ({ state, commit }) {
  //   const res = await getRobotList({
  //     deptId: state.selectedArea,
  //     currentAeraId: state.selectedFloor
  //   })
  //   commit('SET_HOME_STATE', {
  //     key: 'robotOnBoard',
  //     value: res
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
