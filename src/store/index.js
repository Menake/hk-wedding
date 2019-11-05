import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    guest: state.guest
  })
})

export default new Vuex.Store({
  state: {
    guest: null,
    message: []
  },
  plugins: [vuexLocalStorage.plugin],
  mutations: {
    SET_GUEST(state, guest) {
      state.guest = guest
    },
    SET_MESSAGE(state, message) {
      state.message = message
    }
  },
  actions: {
    saveGuest({ commit }, guest) {
      commit('SET_GUEST', guest)
    },

    setMessage({ commit }, message) {
      commit('SET_MESSAGE', message);
    }
  }
})
