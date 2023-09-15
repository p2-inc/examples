import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import SilentRefreshView from '../views/SilentRefreshView.vue'
import Auth from '@/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth', // Redirect URI
      name: 'Authenticated',
      component: AuthView
    },
    {
      path: '/silent-refresh', // Token silent refresh URI
      name: 'SilentRefresh',
      component: SilentRefreshView
    }
    // { // Example of requiring auth on a page.
    //   path: '/auth-required',
    //   name: 'AuthRequired',
    //   component: AuthRequired,
    //   meta: { requiresAuth: true }
    // },
  ]
})

router.beforeEach(async (to, from, next) => {
  const hasAuth = await Auth.getUser()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasAuth) {
      return next({
        path: '/unauthenticated'
      })
    }
  }
  return next()
})

export default router
