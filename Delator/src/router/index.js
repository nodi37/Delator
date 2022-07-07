import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout';
import SettingsLayout from '../layouts/SettingsLayout';
import CompaniesLayout from '../layouts/CompaniesLayout';
import UsersLayout from '../layouts/UsersLayout';
import CompanyProperties from '@/components/CompanyProperties';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/LandingPageView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/AppView'),
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
