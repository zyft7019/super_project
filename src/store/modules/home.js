const state = {
  backdrop: false
}
const mutations = {
  SETBACKDROP(state, value) {
    state.backdrop = value
  }
}
const getters = {
  backdrop: state => state.backdrop
}
const actions = {
  setBackdrop({ commit }, value) {
    commit('SETBACKDROP', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}