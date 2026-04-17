<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(true)
const errorMessage = ref('')
const searchTerm = ref('')
const authUser = ref(null)

const dashboard = ref({
  summary: {
    current_balance: 0,
    income_total: 0,
    expense_total: 0,
  },
  period: {
    label: 'Statistiques en cours',
  },
  monthly_trends: [],
  category_breakdown: [],
  recent_transactions: [],
})

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const summaryCards = computed(() => {
  return [
    {
      key: 'balance',
      title: 'Solde Actuel',
      value: dashboard.value.summary.current_balance,
      icon: 'account_balance_wallet',
      iconClass: 'text-primary bg-primary/10',
      valueClass:
        dashboard.value.summary.current_balance >= 0
          ? 'text-slate-900 dark:text-white'
          : 'text-rose-500',
    },
    {
      key: 'income',
      title: 'Revenu Total',
      value: dashboard.value.summary.income_total,
      icon: 'arrow_downward',
      iconClass: 'text-emerald-500 bg-emerald-500/10',
      valueClass: 'text-emerald-500',
    },
    {
      key: 'expense',
      title: 'Depense Totale',
      value: dashboard.value.summary.expense_total,
      icon: 'shopping_cart',
      iconClass: 'text-rose-500 bg-rose-500/10',
      valueClass: 'text-rose-500',
    },
  ]
})

const maxTrendValue = computed(() => {
  const values = dashboard.value.monthly_trends.flatMap((item) => [
    Number(item.income || 0),
    Number(item.expense || 0),
  ])

  return Math.max(...values, 1)
})

const categoryTotal = computed(() => {
  return dashboard.value.category_breakdown.reduce((sum, item) => {
    return sum + Number(item.amount || 0)
  }, 0)
})

const filteredTransactions = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  if (!query) {
    return dashboard.value.recent_transactions
  }

  return dashboard.value.recent_transactions.filter((transaction) => {
    return (
      transaction.description.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query)
    )
  })
})

const monthlyDelta = computed(() => {
  const trends = dashboard.value.monthly_trends

  if (trends.length < 2) {
    return null
  }

  const currentMonth = trends[trends.length - 1]
  const previousMonth = trends[trends.length - 2]
  const currentNet = Number(currentMonth.income) - Number(currentMonth.expense)
  const previousNet = Number(previousMonth.income) - Number(previousMonth.expense)

  if (previousNet === 0) {
    return null
  }

  return ((currentNet - previousNet) / Math.abs(previousNet)) * 100
})

const formatCurrency = (value) => {
  return currencyFormatter.format(Number(value || 0))
}

const formatDate = (value) => {
  if (!value) {
    return '-'
  }

  return dateFormatter.format(new Date(value))
}

const trendHeightStyle = (value) => {
  const normalized = (Number(value || 0) / maxTrendValue.value) * 100
  const clamped = Math.max(normalized, 6)

  return { height: `${clamped}%` }
}

const statusLabel = (status) => {
  return status === 'completed' ? 'Termine' : 'En cours'
}

const statusClass = (status) => {
  if (status === 'completed') {
    return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  }

  return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
}

const amountClass = (type) => {
  return type === 'income' ? 'text-emerald-500' : 'text-rose-500'
}

const amountPrefix = (type) => {
  return type === 'income' ? '+' : '-'
}

const transactionIcon = (type) => {
  return type === 'income' ? 'work' : 'shopping_bag'
}

const iconContainerClass = (type) => {
  return type === 'income'
    ? 'bg-primary/10 text-primary'
    : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600'
}

const loadDashboard = async () => {
  errorMessage.value = ''
  isLoading.value = true

  const token = localStorage.getItem('auth_token')

  if (!token) {
    isLoading.value = false
    await router.replace('/login')
    return
  }

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

  try {
    const response = await fetch(`${apiBaseUrl}/api/dashboard/overview`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        await router.replace('/login')
        return
      }

      throw new Error(data?.message ?? 'Impossible de charger le tableau de bord.')
    }

    dashboard.value = {
      summary: {
        current_balance: Number(data?.summary?.current_balance ?? 0),
        income_total: Number(data?.summary?.income_total ?? 0),
        expense_total: Number(data?.summary?.expense_total ?? 0),
      },
      period: {
        label: data?.period?.label ?? 'Statistiques en cours',
      },
      monthly_trends: Array.isArray(data?.monthly_trends) ? data.monthly_trends : [],
      category_breakdown: Array.isArray(data?.category_breakdown)
        ? data.category_breakdown
        : [],
      recent_transactions: Array.isArray(data?.recent_transactions)
        ? data.recent_transactions
        : [],
    }
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Une erreur inattendue est survenue pendant le chargement.'
  } finally {
    isLoading.value = false
  }
}

const dark_light = window.dark_light

onMounted(() => {
  const rawUser = localStorage.getItem('auth_user')

  if (rawUser) {
    try {
      authUser.value = JSON.parse(rawUser)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }

  loadDashboard()
})
</script>

<template>
  <div
    class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100"
  >
    <div class="flex min-h-screen overflow-hidden">
      <aside
        class="hidden lg:flex w-72 bg-white dark:bg-[#16222c] border-r border-slate-200 dark:border-slate-800 flex-col"
      >
        <div class="p-6 flex items-center gap-3">
          <div class="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <span class="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <h1 class="text-lg font-bold leading-none">Budgefy</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Economisez intelligemment</p>
          </div>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-1">
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            to="/dashboard"
          >
            <span class="material-symbols-outlined text-[22px]">dashboard</span>
            <span class="text-sm">Tableau de bord</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/transactions"
          >
            <span class="material-symbols-outlined text-[22px]">receipt_long</span>
            <span class="text-sm">Transactions</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/categories"
          >
            <span class="material-symbols-outlined text-[22px]">label</span>
            <span class="text-sm">Categories</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span class="text-sm">Parametres</span>
          </router-link>
        </nav>

        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center gap-3">
            <div class="size-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden grid place-items-center">
              <span class="material-symbols-outlined text-slate-600 dark:text-slate-200">person</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">{{ authUser?.name || 'Utilisateur' }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ authUser?.email || 'Compte connecte' }}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto flex flex-col">
        <header
          class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-5 md:px-8 py-4 border-b border-slate-200 dark:border-slate-800"
        >
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-xl font-bold">Apercu financier</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ dashboard.period.label }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative w-full md:w-72">
                <span
                  class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
                  >search</span
                >
                <input
                  v-model="searchTerm"
                  class="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  placeholder="Rechercher une transaction..."
                  type="text"
                />
              </div>

              <button
                class="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                type="button"
                @click="dark_light()"
              >
                <span class="material-symbols-outlined dark:hidden">dark_mode</span>
                <span class="material-symbols-outlined hidden dark:block">light_mode</span>
              </button>
            </div>
          </div>
        </header>

        <div class="p-5 md:p-8 space-y-8 flex-1">
          <p v-if="errorMessage" class="text-sm text-rose-500">{{ errorMessage }}</p>

          <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="skeleton in 3"
              :key="skeleton"
              class="h-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] animate-pulse"
            ></div>
          </div>

          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="card in summaryCards"
                :key="card.key"
                class="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div class="flex justify-between items-start mb-4">
                  <span class="material-symbols-outlined p-2 rounded-lg" :class="card.iconClass">
                    {{ card.icon }}
                  </span>
                  <span
                    v-if="card.key === 'balance' && monthlyDelta !== null"
                    class="text-xs font-bold flex items-center px-2 py-1 rounded-full"
                    :class="monthlyDelta >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'"
                  >
                    <span class="material-symbols-outlined text-xs mr-1">trending_up</span>
                    {{ Math.abs(monthlyDelta).toFixed(1) }}%
                  </span>
                </div>

                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ card.title }}</p>
                <h3 class="text-3xl font-extrabold mt-1" :class="card.valueClass">
                  {{ formatCurrency(card.value) }}
                </h3>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2 bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="flex justify-between items-center mb-8">
                  <div>
                    <h4 class="font-bold text-lg">Revenus vs Depenses</h4>
                    <p class="text-xs text-slate-500">Comparaison mensuelle des flux</p>
                  </div>
                </div>

                <div class="h-64 flex items-end justify-between gap-3 px-2">
                  <div
                    v-for="item in dashboard.monthly_trends"
                    :key="item.month_key"
                    class="flex-1 flex flex-col items-center gap-2"
                  >
                    <div class="w-full flex items-end gap-1 h-full">
                      <div class="flex-1 bg-primary/80 rounded-t-sm" :style="trendHeightStyle(item.income)"></div>
                      <div class="flex-1 bg-slate-200 dark:bg-slate-700 rounded-t-sm" :style="trendHeightStyle(item.expense)"></div>
                    </div>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">{{ item.label }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <h4 class="font-bold text-lg mb-1">Par Categorie</h4>
                <p class="text-xs text-slate-500 mb-4">Repartition des depenses</p>

                <p class="text-2xl font-black mb-6">{{ formatCurrency(categoryTotal) }}</p>

                <div class="space-y-3">
                  <div
                    v-for="category in dashboard.category_breakdown"
                    :key="category.name"
                    class="flex items-center justify-between text-sm"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="size-2 rounded-full" :style="{ backgroundColor: category.color_hex || '#94a3b8' }"></span>
                      <span class="text-slate-600 dark:text-slate-400 truncate">{{ category.name }}</span>
                    </div>
                    <span class="font-bold ml-3 whitespace-nowrap">
                      {{ formatCurrency(category.amount) }} ({{ Number(category.share_percentage).toFixed(0) }}%)
                    </span>
                  </div>

                  <p
                    v-if="dashboard.category_breakdown.length === 0"
                    class="text-sm text-slate-500 dark:text-slate-400"
                  >
                    Aucune depense enregistree pour le moment.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h4 class="font-bold text-lg">Dernieres Transactions</h4>
                <router-link class="text-primary text-sm font-semibold hover:underline" to="/transactions">
                  Voir tout
                </router-link>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left min-w-[760px]">
                  <thead class="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 font-bold">
                    <tr>
                      <th class="px-6 py-4">Transaction</th>
                      <th class="px-6 py-4">Categorie</th>
                      <th class="px-6 py-4">Date</th>
                      <th class="px-6 py-4">Statut</th>
                      <th class="px-6 py-4 text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr
                      v-for="transaction in filteredTransactions"
                      :key="transaction.id"
                      class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                          <div class="size-8 rounded flex items-center justify-center" :class="iconContainerClass(transaction.type)">
                            <span class="material-symbols-outlined text-sm">{{ transactionIcon(transaction.type) }}</span>
                          </div>
                          <span class="text-sm font-semibold">{{ transaction.description }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm text-slate-500">{{ transaction.category }}</td>
                      <td class="px-6 py-4 text-sm text-slate-500">{{ formatDate(transaction.occurred_at) }}</td>
                      <td class="px-6 py-4">
                        <span
                          class="text-[10px] font-bold px-2 py-1 rounded-full uppercase"
                          :class="statusClass(transaction.status)"
                        >
                          {{ statusLabel(transaction.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right font-bold text-sm" :class="amountClass(transaction.type)">
                        {{ amountPrefix(transaction.type) }}{{ formatCurrency(transaction.amount) }}
                      </td>
                    </tr>
                    <tr v-if="filteredTransactions.length === 0">
                      <td class="px-6 py-6 text-sm text-slate-500" colspan="5">
                        Aucune transaction ne correspond a votre recherche.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>

        <footer class="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© 2026 Gestion Budgetaire Personnelle. Tous droits reserves.</p>
        </footer>
      </main>
    </div>
  </div>
</template>
>>>>>>> ee9332d (feat: Implement dashboard functionality with categories and transactions)
