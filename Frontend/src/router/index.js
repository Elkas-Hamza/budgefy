import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import TransactionsPage from '../views/TransactionsPage.vue'
import CategoriesPage from '../views/CategoriesPage.vue'
import AuthPage from '../views/AuthPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/transactions', name: 'transactions', component: TransactionsPage },
  { path: '/categories', name: 'categories', component: CategoriesPage },
  { path: '/login', name: 'login', component: AuthPage },
  { path: '/auth', redirect: '/login' },
  { path: '/settings', name: 'settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
