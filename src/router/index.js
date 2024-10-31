import { createRouter, createWebHistory } from 'vue-router'
import LoadingPage from '@/views/auth/LoadingPage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotView from '@/views/auth/ForgotView.vue'
import HomePage from '@/views/system/HomePage.vue'
import ProfilePage from '@/views/system/ProfilePage.vue'
import HistoryPage from '@/views/system/HistoryPage.vue'
import AboutPage from '@/views/system/AboutPage.vue'
import { getUserInformation, isAuthenticated } from '@/utils/supabase'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import CoursePage from '@/views/system/CoursePage.vue'
import StarredCoursePage from '@/views/system/StarredCoursePage.vue'
import AdminHomePage from '@/views/system/AdminHomePage.vue'
import AdminProfile from '@/views/system/AdminProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/load',
      meta: { requiresAuth: false }
    },
    {
      path: '/load',
      name: 'load',
      component: LoadingPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView,
      meta: { requiresAuth: false }
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPassword,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/starred',
      name: 'starred',
      component: StarredCoursePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/course/:id',
      name: 'CoursePage',
      component: CoursePage
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      component: AdminHomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/adminprofile',
      name: 'adminprofile',
      component: AdminProfile,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to) => {
  // Check if the user is logged in
  const isLoggedIn = await isAuthenticated()
  const userMetadata = isLoggedIn ? await getUserInformation() : null

  // Check if the user is an admin based on userMetadata
  const isAdmin = userMetadata?.is_admin === true

  // Allow access to loading and load pages for all users, regardless of auth status
  if (to.name === 'load') {
    return true
  }

  if ((isAdmin && to.name === 'adminhome') || to.name === 'adminprofile') {
    return true
  }

  // If logged in, apply restrictions based on user roles
  if (isLoggedIn) {
    // Prevent non-admin users from accessing the admin page
    if (!isAdmin && to.name === 'adminhome') {
      return { name: 'home' }
    }

    // Prevent admin users from accessing non-admin pages except the login, load, loading, and register pages for logout
    if (
      isAdmin &&
      to.name !== 'adminhome' &&
      to.meta.requiresAuth &&
      !['login', 'load', 'register'].includes(to.name)
    ) {
      return { name: 'adminhome' }
    }

    // Prevent logged-in users from accessing login or register pages
    if (to.name === 'login' || to.name === 'register') {
      return { name: 'home' }
    }
  } else {
    // If not logged in, prevent access to pages requiring authentication
    if (to.meta.requiresAuth) {
      return { name: 'login' }
    }
  }

  // Allow navigation if none of the conditions above were met
  return true
})
export default router
