import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/components/Routes/DashboardLayout';
import SettingsLayout from '@/components/Routes/SettingsLayout';
import CompaniesLayout from '@/components/Routes/CompaniesLayout';
import UsersLayout from '@/components/Routes/UsersLayout';
import CompanyProperties from '@/components/Routes/Subroutes/CompanyProperties';
import UserProperties from '@/components/Routes/Subroutes/UserProperties';


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
