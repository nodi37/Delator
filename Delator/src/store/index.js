import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from '../i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuTitle: 'Delator',
    userId: '',
    userData: {},
    userSettings: {},
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
    ],
    contractTypes: ['full-time', 'part-time', 'temporary'],
    languages: [
      { shortName: 'no', localeTag: 'no-NO', fullName: 'Norsk' },
      { shortName: 'pl', localeTag: 'pl-PL', fullName: 'Polski' },
      { shortName: 'en', localeTag: 'en-US', fullName: 'English' },
    ]
  },
  mutations: {
    SET_MENU_TITLE(state, title) {
      state.menuTitle = 'Delator - ' + title;
    },
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    PUSH_TO_COMPANIES_DATA(state, data) {
      state.companiesData.push(data);
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    SET_USER_SETTINGS(state, data) {
      state.userSettings = data;
    },
    SET_COMPANIES_SETTINGS(state, data) {
      state.companiesToManage = data;
    },
    SET_EMPLOYMENT_CONTRACTS(state, data) {
      state.employmentContracts = data;
    }
  },
  actions: {
    setMenuTitle({ commit }, title) {
      commit('SET_MENU_TITLE', title);
    },
    setUserToken({ commit }, token) {
      commit('APPLY_USER_TOKEN', token);
    },
    setUserId({ commit }, id) {
      commit('SET_USER_ID', id);
    },
    setUserData({ commit }, data) {
      commit('SET_USER_DATA', data);
    },

    loadUserData({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          const profileRes = await axios.get(process.env.VUE_APP_API_PATH + `/user/get/${state.userId}`, { withCredentials: true });
          const settingsRes = await axios.get(process.env.VUE_APP_API_PATH + `/user-settings/get/${profileRes.data.data.settingsId}`, { withCredentials: true });
          commit('SET_USER_DATA', profileRes.data.data);
          commit('SET_USER_SETTINGS', settingsRes.data.data);
          VueI18n = settingsRes.data.data.language;
          resolve(profileRes.data.data);
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
            const res = await axios.get(process.env.VUE_APP_API_PATH + `/company/get/${companyId}`, { withCredentials: true });
            const companyData = res.data.data;
            commit('PUSH_TO_COMPANIES_DATA', companyData);
            resolve({ success: true });
          } catch (error) {
            console.log(error);
            reject(error);
          }
        } else {
          console.log('Company already loaded, skipping request')
          resolve({ success: true });
        }
      });
    },

    loadCompaniesSettings({ commit, dispatch, state }) {
      console.log('loadCompaniesSettings')
      return new Promise(async (resolve, reject) => {
        try {

          const res = await axios.get(process.env.VUE_APP_API_PATH + `/company-settings/get-many?administratorsEmails=${state.userId}`, { withCredentials: true });
          const settingsArr = res.data.data || [];

          commit('SET_COMPANIES_SETTINGS', settingsArr);

          settingsArr.forEach(async settings => {
            await dispatch('loadCompanyData', settings.companyId);
          });

          resolve({ success: true });

        } catch (error) {
          console.log(error);
          reject(error);
        }
      });

    },

    loadEmploymentContracts({ commit, dispatch, state }) {
      console.log('loadEmploymentContracts')
      return new Promise(async (resolve, reject) => {
        try {

          const res = await axios.get(process.env.VUE_APP_API_PATH + `/employment-contract/get-many?userId=${state.userId}`, { withCredentials: true });
          const contractsArr = res.data.data || [];

          commit('SET_EMPLOYMENT_CONTRACTS', contractsArr);

          contractsArr.forEach(async contract => {
            await dispatch('loadCompanyData', contract.companyId);
          });

          resolve({ success: true });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },
  },
  getters: {
    currentLanguage(state) {
      return state.languages.find(languageObj => languageObj.shortName === state.userSettings.language);
    }
  }
})
