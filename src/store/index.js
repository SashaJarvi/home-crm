import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.js'
import info from './info.js'
import category from './category.js'
import record from './record.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`)
      return res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record
  }
})
