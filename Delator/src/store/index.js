import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuSelectedItem: 0,
    userToken: '', //Here will be user token
    userTokenDecoded: { //here will be decoded
      privlegeLevel: 0
    },
    adminMenuItems: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', pathName: 'dashboard' },
      { title: 'companies', icon: 'mdi-domain', pathName: 'companies' },
      { title: 'users', icon: 'mdi-account', pathName: 'users' },
      { title: 'settings', icon: 'mdi-cog', pathName: 'settings' },
    ],
    ownerMenuItems: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', pathName: 'dashboard' },
      { title: 'employees', icon: 'mdi-domain', pathName: 'employees' },
      { title: 'settings', icon: 'mdi-cog', pathName: 'settings' },
    ],
    employeePositions: [
      //'leader',
      'employee'
    ],
    pricingPlans: [
      {no: 0, title: 'free'},
      {no: 1, title: 'paid'}
    ]
  },
  mutations: {
    SET_MENU_ITEM(state, number) {
      state.menuSelectedItem = number;
    }
  },
  actions: {
    setMenuItem({commit}, number) {
      commit('SET_MENU_ITEM', number);
    }
  },
  getters: {
    menuItems(state) {
      switch (state.userTokenDecoded.privlegeLevel) {
        case 0:
          return state.adminMenuItems;
        case 1:
          return state.ownerMenuItems;
        default:
          return null;
      }
    }
  },
  modules: {
  }
})
