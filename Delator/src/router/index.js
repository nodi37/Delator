import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/components/Routes/DashboardLayout';
import SettingsLayout from '@/components/Routes/SettingsLayout';
import CompaniesLayout from '@/components/Routes/CompaniesLayout';
import UsersLayout from '@/components/Routes/UsersLayout';
import CompanyProperties from '@/components/Routes/Subroutes/CompanyProperties';
import UserProperties from '@/components/Routes/Subroutes/UserProperties';
import store from '@/store';

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
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardLayout
      },
      {
        path: 'companies',
        name: 'companies',
        component: CompaniesLayout
      },
      {
        path: 'users',
        name: 'allUsers',
        component: UsersLayout
      },
      {
        path: 'users/:companyId',
        name: 'companyUsers',
        component: UsersLayout
      },
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
        path: 'settings',
        name: 'settings',
        component: SettingsLayout
      }
    ]
  }
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
