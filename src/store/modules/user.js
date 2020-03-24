const state = {
  user: {} // 用户信息
}

const mutations = {
  SET_USER_STATE (state, { key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}
const getters = {}
const actions = {
  SET_USER_STATE: ({ commit }, { key, value }) => {
    commit('SET_USER_STATE', {
      key,
      value
    })
  },
  REPLACE_USER_STATE (state, { stateKey, value }) {
    if (state.hasOwnProperty(stateKey)) {
      state[stateKey] = value
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
