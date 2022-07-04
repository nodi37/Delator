import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [],
    appSkip: 0, //TO SKIP LIMIT <-
    appLimit: 10, //TO SKIP LIMIT <-
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
      'leader',
      'employee'
    ]
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    REMOVE_COMPANY(state, companyId) {
      state.companies = state.companies.filter(val => val._id != companyId);
    }
  },
  actions: {
    async fetchCompanies({ commit }) {
      axios.get('http://localhost:3001/v1/company')
        .then(res => commit('SET_COMPANIES', res.data.data))
        .catch(error => console.log(error));
    },
    
    async deleteCompany({ commit }, companyId) {
      axios.delete(`http://localhost:3001/v1/company/${companyId}`)
        .then(res => commit('REMOVE_COMPANY', res.data.data._id))
        .catch(error => console.log(error));
    }
  },
  getters: {
    companies: (state) => state.companies,
    getCompanyById: (state) => (companyId) => state.companies.find(val => val._id === companyId),
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
