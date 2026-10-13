/**
 * router/index.js
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/login.vue'),
    },
    {
      path:'/login',
      component: () => import('../pages/login.vue'),
    },
    {
      path:'/home',
      component: () => import('../pages/home.vue'),
    },
  ],
})

export default router
