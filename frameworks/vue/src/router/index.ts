import { createRouter, createWebHistory } from 'vue-router'
import AuthCallbackView from '@/views/AuthCallbackView.vue'
import HomeView from '@/views/HomeView.vue'
import SilentRefreshView from '@/views/SilentRefreshView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/auth', name: 'auth-callback', component: AuthCallbackView },
    { path: '/silent-refresh', name: 'silent-refresh', component: SilentRefreshView },
  ],
})

export default router
