import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
//MAIN MENU ROUTES
import DashboardRoute from '@/components/Routes/DashboardRoute';
import CompaniesRoute from '@/components/Routes/CompaniesRoute';
import UsersRoute from '@/components/Routes/UsersRoute';
import ReportsRoute from '@/components/Routes/ReportsRoute';
import ContractsRoute from '@/components/Routes/ContractsRoute';
import SettingsRoute from '@/components/Routes/SettingsRoute';
//SUNBROUTES
import CompanyProperties from '@/components/Routes/Subroutes/CompanyProperties';
import UserProperties from '@/components/Routes/Subroutes/UserProperties';
import ContractProperties from '@/components/Routes/Subroutes/ContractProperties';

Vue.use(VueRouter);

async function appRouteGuard(_to, _from, next) {
  try {
    console.log('store.state: ', store.state.userId);
    if(!store.state.userId) {
      const userId = localStorage.getItem('userId');
      console.log('localstoreage: ', userId);
      store.commit('SET_USER_ID', userId);
    }

    const userData = await store.dispatch('loadUserData');

    if (!!userData) {
      next();
    }

  } catch (error) {
    localStorage.removeItem('userId');
    router.push({ name: 'login' })
  }
}

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/LandingPageView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/AppView'),
    beforeEnter: appRouteGuard,
    children: [
      //MAIN MENU ROUTES
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardRoute
      },
      {
        path: 'companies',
        name: 'companies',
        component: CompaniesRoute
      },
      {
        path: 'users',
        name: 'allUsers',
        component: UsersRoute
      },
      {
        path: 'reports',
        name: 'reportsRoute',
        component: ReportsRoute
      },
      {
        path: 'contracts',
        name: 'contractsRoute',
        component: ContractsRoute
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsRoute
      },
      //SUBROUTES

      // {
      //   path: 'users/:companyId',
      //   name: 'companyUsers',
      //   component: UsersRoute
      // },
      {
        path: 'company/:companyId',
        name: 'companyEditor',
        component: CompanyProperties
      },
      {
        path: 'user/:userId',
        name: 'userEditor',
        component: UserProperties
      },
      {
        path: 'contract/:contractId',
        name: 'contractEditor',
        component: ContractProperties
      },
    ]
  }
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
