import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: "dashboard-layout",
    menuItems: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', layout: 'dashboard-layout' },
      { title: 'employees', icon: 'mdi-account-hard-hat', layout: 'employees-layout' },
      { title: 'settings', icon: 'mdi-cog', layout: 'settings-layout' },
    ],
    employeePositions: [
      'leader',
      'employee'
    ]
  },
  mutations: {
    setLayout (state, value) {
      state.layout = value
    }
  },
  actions: {
    setLayout({ commit }, newLayout) {
      commit('setLayout', newLayout)
    }
  },
  getters: {
    layout (state) {
      return state.layout
    }
  },
  modules: {
  }
})
