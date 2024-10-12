import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePage from '@/views/system/HomePage.vue'
import ProfilePage from '@/views/system/ProfilePage.vue'
import ForgotView from '@/views/auth/ForgotView.vue'
import HistoryPage from '@/views/system/HistoryPage.vue'
import AboutPage from '@/views/system/AboutPage.vue'
import LogoutPage from '@/views/system/LogoutPage.vue'
import IT109Page from '@/views/system/IT109Page.vue'

const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/logout',
      name: 'logout',
      component: LogoutPage
    },
    {
      path: '/it-109',
      name: 'it-109',
      component: IT109Page
    },

  ]
})

export default router
