import { createStore } from 'vuex'

export default createStore({
  state: {
    verbose: true,
    databaseAPI: {
      server: 'http://localhost',
      port: 3000,
    },
  },
  getters: {
  },
  mutations: {
    CONSOLE_LOG(state, { log }) {
      if (state.verbose) {
        console.log(log);
      }
    },
    CONSOLE_ERROR(state, { log }) {
      console.error(log);
    },
  },
  actions: {
    console({ commit }, { log }) {
      commit('CONSOLE_LOG', { log });
    },
    error({ commit }, { log }) {
      commit('CONSOLE_ERROR', { log });
    },
  },
  modules: {
  }
})
