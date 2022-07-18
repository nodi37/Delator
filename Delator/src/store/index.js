import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    companiesData: [],
    companiesToManage: [],
    employmentContracts: [],
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
    APPLY_USER_TOKEN(state, token) {
      state.userToken = token;
    },
    PUSH_TO_COMPANIES_DATA(state, data) {
      state.companiesData.push(data);
    },
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    SET_COMPANIES_SETTINGS(state, data) {
      state.companiesToManage = data;
    },
    SET_EMPLOYMENT_CONTRACTS(state, data) {
      state.employmentContracts = data;
    }
  },
  actions: {
    setUserToken({ commit }, token) {
      commit('APPLY_USER_TOKEN', token);
    },
    setUserId({ commit }, id) {
      commit('SET_USER_ID', id);
    },
    setUserData({ commit }, data) {
      commit('SET_USER_DATA', data);
    },


    loadUserData({ commit }) {
      return new Promise(async (resolve, reject) => {
        const userId = localStorage.getItem('userId');
        try {
          const res = await axios.get(process.env.VUE_APP_API_PATH + `/user/${userId}`, { withCredentials: true });
          commit('SET_USER_DATA', res.data.data);
          resolve(true);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },

    loadCompanyData({ commit, state }, companyId) {
      console.log('loadCompanyData')
      return new Promise(async (resolve, reject) => {
        const alreadyLoaded = state.companiesData.find(company => company._id === companyId);
        if (!alreadyLoaded) {
          try {
            const res = await axios.get(process.env.VUE_APP_API_PATH + `/company/${companyId}`, { withCredentials: true });
            const companyData = res.data.data;
            commit('PUSH_TO_COMPANIES_DATA', companyData);
            resolve(true);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        } else {
          console.log('Already loaded')
          resolve(true);
        }
      });
    },

    loadCompaniesSettings({ commit, dispatch }) {
      console.log('loadCompaniesSettings')
      return new Promise(async (resolve, reject) => {
        try {
          const userId = localStorage.getItem('userId');

          const res = await axios.get(process.env.VUE_APP_API_PATH + `/company-settings?administratorsIds=${userId}`, { withCredentials: true });
          const settingsArr = res.data.data;

          commit('SET_COMPANIES_SETTINGS', settingsArr);

          settingsArr.forEach(async settings => {
            await dispatch('loadCompanyData', settings.companyId);
          });

          resolve(true);

        } catch (error) {
          console.log(error);
          reject(error);
        }
      });

    },

    loadEmploymentContracts({ commit, dispatch }) {
      console.log('loadEmploymentContracts')
      return new Promise(async (resolve, reject) => {
        try {
          const userId = localStorage.getItem('userId');

          const res = await axios.get(process.env.VUE_APP_API_PATH + `/employment-contract?userId=${userId}`, { withCredentials: true });
          const contractsArr = res.data.data;

          commit('SET_EMPLOYMENT_CONTRACTS', contractsArr);

          contractsArr.forEach(async contract => {
            await dispatch('loadCompanyData', contract.companyId);
          });

          resolve(true);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
  }
})
