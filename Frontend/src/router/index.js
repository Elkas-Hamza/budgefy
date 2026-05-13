import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import TransactionsPage from '../views/TransactionsPage.vue'
import CategoriesPage from '../views/CategoriesPage.vue'
import AuthPage from '../views/AuthPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import VerifyEmailPage from '../views/VerifyEmailPage.vue'
import ConfirmAccountDeletionPage from '../views/ConfirmAccountDeletionPage.vue'
import AdminLoginPage from '../views/AdminLoginPage.vue'
import AdminDashboardPage from '../views/AdminDashboardPage.vue'
import Error404 from '../views/Error404.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/transactions', name: 'transactions', component: TransactionsPage },
  { path: '/categories', name: 'categories', component: CategoriesPage },
  { path: '/login', name: 'login', component: AuthPage },
  { path: '/auth', redirect: '/login' },
  { path: '/verify-email', name: 'verify-email', component: VerifyEmailPage },
  {
    path: '/confirm-account-deletion',
    name: 'confirm-account-deletion',
    component: ConfirmAccountDeletionPage,
  },
  { path: '/settings', name: 'settings', component: SettingsPage },
  { path: '/admin', name: 'admin-login', component: AdminLoginPage },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboardPage },
  { path: '/settings', name: 'settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
