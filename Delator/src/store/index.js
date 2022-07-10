import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuSelectedItem: 0,
    userToken: '', //Here will be user token
    userTokenDecoded: { //here will be decoded
      privlegeLevel: 1
    },
    adminMenuItems: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', pathName: 'dashboard' },
      { title: 'companies', icon: 'mdi-domain', pathName: 'companies' },
      { title: 'users', icon: 'mdi-account', pathName: 'allUsers' },
      { title: 'settings', icon: 'mdi-cog', pathName: 'settings' },
    ],
    ownerMenuItems: [
      { title: 'dashboard', icon: 'mdi-view-dashboard', pathName: 'dashboard' },
      { title: 'employees', icon: 'mdi-domain', pathName: 'employees' },
      { title: 'settings', icon: 'mdi-cog', pathName: 'settings' },
    ],
    privlegeLevels: [
      { no: 1, title: 'administrator' },
      { no: 2, title: 'company-owner' },
      { no: 3, title: 'employee' },
    ],
    employeePositions: [
      //'leader',
      'employee'
    ],
    pricingPlans: [
      { no: 1, title: 'free' },
      { no: 2, title: 'paid' }
    ],
    settlementMethods: [
      { no: 1, title: 'settlement-by-day' },
      { no: 2, title: 'settlement-by-week' }
    ]
  },
  mutations: {
    SET_MENU_ITEM(state, number) {
      state.menuSelectedItem = number;
    }
  },
  actions: {
    setMenuItem({ commit }, number) {
      commit('SET_MENU_ITEM', number);
    }
  },
  getters: {
    menuItems(state) {
      switch (state.userTokenDecoded.privlegeLevel) {
        case 1:
          return state.adminMenuItems;
        case 2:
          return state.ownerMenuItems;
        default:
          return null;
      }
    }
  },
  modules: {
  }
})
