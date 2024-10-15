import { createRouter, createWebHistory } from 'vue-router'
import LoadingPage from '@/views/auth/LoadingPage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotView from '@/views/auth/ForgotView.vue'
import HomePage from '@/views/system/HomePage.vue'
import ProfilePage from '@/views/system/ProfilePage.vue'
import HistoryPage from '@/views/system/HistoryPage.vue'
import AboutPage from '@/views/system/AboutPage.vue'
import IT109Page from '@/views/system/IT109Page.vue'
import ITE12Page from '@/views/system/ITE12Page.vue'
import CSC102Page from '@/views/system/CSC102Page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/load'
    },
    {
      path: '/load',
      name: 'load',
      component: LoadingPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/it-109',
      name: 'it-109',
      component: IT109Page
    },
    {
      path: '/ite12',
      name: 'ite12',
      component: ITE12Page
    },
    {
      path: '/csc102',
      name: 'csc102',
      component: CSC102Page
    }
  ]
})

export default router
