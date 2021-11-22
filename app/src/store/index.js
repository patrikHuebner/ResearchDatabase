import { createStore } from 'vuex'

export default createStore({
  state: {
    verbose: true,
    databaseAPI: {
      server: 'http://localhost',
      port: 3000,
    },
    theme: {
      mode: "dark"
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
    UPDATE_STATE(state, { parent, key, value }) {
      state[parent][key] = value;
    },

  },
  actions: {
    console({ commit }, { log }) {
      commit('CONSOLE_LOG', { log });
    },
    error({ commit }, { log }) {
      commit('CONSOLE_ERROR', { log });
    },
    updateState({ commit }, { parent, key, value }) {
      commit('UPDATE_STATE', { parent, key, value });
    },

  },
  modules: {
  }
})
