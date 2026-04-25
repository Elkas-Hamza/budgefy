<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { showToast } = useToast()

const isLoading = ref(true)
const errorMessage = ref('')
const searchTerm = ref('')
const authUser = ref(null)
const isSidebarCollapsed = ref(false)
const hoveredTrendSegment = ref(null)
const pinnedTrendSegment = ref(null)
const hoveredCategoryId = ref(null)
const hoveredCategoryName = ref('')

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

const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP']
const SUPPORTED_LANGUAGES = ['FR', 'EN', 'AR']
const localeByLanguage = {
  FR: 'fr-FR',
  EN: 'en-US',
  AR: 'ar',
}

const translations = {
  FR: {
    navDashboard: 'Tableau de bord',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Parametres',
    userDefault: 'Utilisateur',
    accountConnected: 'Compte connecte',
    pageTitle: 'Apercu financier',
    searchPlaceholder: 'Rechercher une transaction...',
    balance: 'Solde Actuel',
    income: 'Revenu Total',
    expense: 'Depense Totale',
    incomeVsExpense: 'Revenus vs Depenses',
    monthlyComparison: 'Comparaison mensuelle des flux',
    byCategory: 'Par Categorie',
    expenseBreakdown: 'Repartition des depenses',
    noExpenses: 'Aucune depense enregistree pour le moment.',
    latestTransactions: 'Dernieres Transactions',
    seeAll: 'Voir tout',
    tableTransaction: 'Transaction',
    tableCategory: 'Categorie',
    tableDate: 'Date',
    tableStatus: 'Statut',
    tableAmount: 'Montant',
    statusCompleted: 'Termine',
    statusPending: 'En cours',
    noSearchResults: 'Aucune transaction ne correspond a votre recherche.',
    footer: '© 2026 Gestion Budgetaire Personnelle. Tous droits reserves.',
    errLoadDashboard: 'Impossible de charger le tableau de bord.',
    errUnexpected: 'Une erreur inattendue est survenue pendant le chargement.',
  },
  EN: {
    navDashboard: 'Dashboard',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Settings',
    userDefault: 'User',
    accountConnected: 'Signed in account',
    pageTitle: 'Financial overview',
    searchPlaceholder: 'Search for a transaction...',
    balance: 'Current Balance',
    income: 'Total Income',
    expense: 'Total Expense',
    incomeVsExpense: 'Income vs Expense',
    monthlyComparison: 'Monthly cashflow comparison',
    byCategory: 'By Category',
    expenseBreakdown: 'Expense breakdown',
    noExpenses: 'No expenses recorded yet.',
    latestTransactions: 'Latest Transactions',
    seeAll: 'See all',
    tableTransaction: 'Transaction',
    tableCategory: 'Category',
    tableDate: 'Date',
    tableStatus: 'Status',
    tableAmount: 'Amount',
    statusCompleted: 'Completed',
    statusPending: 'In progress',
    noSearchResults: 'No transactions match your search.',
    footer: '© 2026 Personal Budget Management. All rights reserved.',
    errLoadDashboard: 'Unable to load dashboard.',
    errUnexpected: 'An unexpected error occurred while loading data.',
  },
  AR: {
    navDashboard: 'لوحة التحكم',
    navTransactions: 'المعاملات',
    navCategories: 'الفئات',
    navSettings: 'الإعدادات',
    userDefault: 'مستخدم',
    accountConnected: 'حساب متصل',
    pageTitle: 'نظرة مالية عامة',
    searchPlaceholder: 'ابحث عن معاملة...',
    balance: 'الرصيد الحالي',
    income: 'إجمالي الدخل',
    expense: 'إجمالي المصروف',
    incomeVsExpense: 'الدخل مقابل المصروف',
    monthlyComparison: 'مقارنة التدفق الشهري',
    byCategory: 'حسب الفئة',
    expenseBreakdown: 'توزيع المصروفات',
    noExpenses: 'لا توجد مصروفات مسجلة حاليا.',
    latestTransactions: 'اخر المعاملات',
    seeAll: 'عرض الكل',
    tableTransaction: 'المعاملة',
    tableCategory: 'الفئة',
    tableDate: 'التاريخ',
    tableStatus: 'الحالة',
    tableAmount: 'المبلغ',
    statusCompleted: 'مكتمل',
    statusPending: 'قيد التنفيذ',
    noSearchResults: 'لا توجد معاملات مطابقة للبحث.',
    footer: '© 2026 إدارة الميزانية الشخصية. جميع الحقوق محفوظة.',
    errLoadDashboard: 'تعذر تحميل لوحة التحكم.',
    errUnexpected: 'حدث خطأ غير متوقع اثناء التحميل.',
  },
}

const preferences = ref({
  currency: 'EUR',
  language: 'FR',
})

const currentLanguage = computed(() =>
  SUPPORTED_LANGUAGES.includes(preferences.value.language) ? preferences.value.language : 'FR',
)

const t = (key) => translations[currentLanguage.value]?.[key] ?? translations.FR[key] ?? key

const getStoredPreferences = () => {
  const raw = localStorage.getItem('user_preferences')

  if (!raw) {
    return {
      currency: 'EUR',
      language: 'FR',
    }
  }

  try {
    const parsed = JSON.parse(raw)
    const parsedCurrency = String(parsed?.currency ?? '')
    const parsedLanguage = String(parsed?.language ?? '')

    return {
      currency: SUPPORTED_CURRENCIES.includes(parsedCurrency) ? parsedCurrency : 'EUR',
      language: SUPPORTED_LANGUAGES.includes(parsedLanguage) ? parsedLanguage : 'FR',
    }
  } catch {
    return {
      currency: 'EUR',
      language: 'FR',
    }
  }
}

const applyLanguageAttributes = () => {
  const html = document.documentElement
  html.lang = preferences.value.language === 'AR' ? 'ar' : preferences.value.language.toLowerCase()
  html.dir = preferences.value.language === 'AR' ? 'rtl' : 'ltr'
}

const applyStoredPreferences = () => {
  preferences.value = getStoredPreferences()
  applyLanguageAttributes()
}

const summaryCards = computed(() => {
  return [
    {
      key: 'balance',
      title: t('balance'),
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
      title: t('income'),
      value: dashboard.value.summary.income_total,
      icon: 'arrow_downward',
      iconClass: 'text-emerald-500 bg-emerald-500/10',
      valueClass: 'text-emerald-500',
    },
    {
      key: 'expense',
      title: t('expense'),
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

const hoveredCategoryStyle = (category) => {
  const share = Number(category?.share_percentage || 0)

  return {
    width: `${Math.max(share, 2)}%`,
  }
}

const isHoveredCategory = (category) => {
  return hoveredCategoryId.value === category?.category_id
}

const setHoveredCategory = (category) => {
  hoveredCategoryId.value = category?.category_id ?? null
  hoveredCategoryName.value = String(category?.name ?? '').trim().toLowerCase()
}

const clearHoveredCategory = () => {
  hoveredCategoryId.value = null
  hoveredCategoryName.value = ''
}

const normalizeCategoryName = (value) => String(value ?? '').trim().toLowerCase()

const isHighlightedTrendCategory = (segment) => {
  if (!hoveredCategoryName.value) {
    return false
  }

  return normalizeCategoryName(segment?.category) === hoveredCategoryName.value
}

const trendSegmentHighlightClass = (segment) => {
  if (!hoveredCategoryName.value) {
    return ''
  }

  return isHighlightedTrendCategory(segment)
    ? 'ring-2 ring-primary ring-offset-1 ring-offset-background-light dark:ring-offset-background-dark scale-y-[1.04] z-10 shadow-lg brightness-110'
    : 'opacity-20 saturate-50'
}

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
  const locale = localeByLanguage[preferences.value.language] ?? 'fr-FR'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: preferences.value.currency,
  }).format(Number(value || 0))
}

const formatDate = (value) => {
  if (!value) {
    return '-'
  }

  const locale = localeByLanguage[preferences.value.language] ?? 'fr-FR'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const trendHeightStyle = (value) => {
  const normalized = (Number(value || 0) / maxTrendValue.value) * 100
  const clamped = Math.max(normalized, 6)

  return { height: `${clamped}%` }
}

const trendSegmentStyle = (segment, type, index) => {
  const amount = Math.max(Number(segment?.amount || 0), 0.0001)

  if (type === 'income') {
    const opacityTop = Math.max(0.55, 0.95 - index * 0.06)
    const opacityBottom = Math.max(0.4, 0.78 - index * 0.06)

    return {
      flexGrow: String(amount),
      flexBasis: '0%',
      backgroundImage: `linear-gradient(180deg, rgba(16, 185, 129, ${opacityTop}) 0%, rgba(5, 150, 105, ${opacityBottom}) 100%)`,
      boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0.18)',
    }
  }

  const opacityTop = Math.max(0.55, 0.95 - index * 0.06)
  const opacityBottom = Math.max(0.4, 0.78 - index * 0.06)

  return {
    flexGrow: String(amount),
    flexBasis: '0%',
    backgroundImage: `linear-gradient(180deg, rgba(239, 68, 68, ${opacityTop}) 0%, rgba(220, 38, 38, ${opacityBottom}) 100%)`,
    boxShadow: 'inset 0 0 0 1px rgba(239, 68, 68, 0.2)',
  }
}

const trendSegmentLabel = (item, segment, type) => {
  const typeLabel = type === 'income' ? t('income') : t('expense')

  return `${item.label} - ${typeLabel}: ${segment.category} (${formatCurrency(segment.amount)})`
}

const activeTrendSegment = computed(() => {
  return pinnedTrendSegment.value ?? hoveredTrendSegment.value
})

const setHoveredTrendSegment = (item, segment, type) => {
  hoveredTrendSegment.value = {
    monthLabel: item.label,
    type,
    category: segment.category,
    amount: Number(segment.amount || 0),
  }
}

const clearHoveredTrendSegment = () => {
  hoveredTrendSegment.value = null
}

const togglePinnedTrendSegment = (item, segment, type) => {
  const nextValue = {
    monthLabel: item.label,
    type,
    category: segment.category,
    amount: Number(segment.amount || 0),
  }

  if (
    pinnedTrendSegment.value
    && pinnedTrendSegment.value.monthLabel === nextValue.monthLabel
    && pinnedTrendSegment.value.type === nextValue.type
    && pinnedTrendSegment.value.category === nextValue.category
  ) {
    pinnedTrendSegment.value = null
    return
  }

  pinnedTrendSegment.value = nextValue
}

const statusLabel = (status) => {
  return status === 'completed' ? t('statusCompleted') : t('statusPending')
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

const openCategoryTransactions = (category) => {
  if (!category?.category_id) {
    return
  }

  router.push({
    name: 'transactions',
    query: {
      category_id: String(category.category_id),
      period: 'all',
    },
  })
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

      throw new Error(data?.message ?? t('errLoadDashboard'))
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
    const message =
      error instanceof Error
        ? error.message
        : t('errUnexpected')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isLoading.value = false
  }
}

const dark_light = window.dark_light
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const onPreferencesUpdated = () => {
  applyStoredPreferences()
}

onMounted(() => {
  applyStoredPreferences()

  const rawUser = localStorage.getItem('auth_user')

  if (rawUser) {
    try {
      authUser.value = JSON.parse(rawUser)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }

  loadDashboard()
  window.addEventListener('user-preferences-updated', onPreferencesUpdated)
})

onBeforeUnmount(() => {
  window.removeEventListener('user-preferences-updated', onPreferencesUpdated)
})
</script>

<template>
  <div
    class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100"
  >
    <div class="flex min-h-screen overflow-hidden">
      <aside
        class="hidden lg:flex bg-white dark:bg-[#16222c] border-r border-slate-200 dark:border-slate-800 flex-col transition duration-300"
        :class="isSidebarCollapsed ? 'w-21' : 'w-72'"
      >
        <div class="p-6 flex items-center gap-3">
          <div class="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <button
            class="hidden lg:flex size-10 items-center justify-center rounded-lg"
            type="button"
            @click="toggleSidebar"
            >
            <span class="material-symbols-outlined text-slate-900 dark:text-white">account_balance_wallet</span>
        </button>
          </div>
          <div v-show="!isSidebarCollapsed">
            <h1 class="text-lg font-bold leading-none text-slate-900 dark:text-white">Budgefy</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Economisez intelligemment</p>
          </div>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-1">
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            
            to="/dashboard"
          >
            <span class="material-symbols-outlined text-[22px]">dashboard</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navDashboard') }}</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            
            to="/transactions"
          >
            <span class="material-symbols-outlined text-[22px]">receipt_long</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navTransactions') }}</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            
            to="/categories"
          >
            <span class="material-symbols-outlined text-[22px]">label</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navCategories') }}</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navSettings') }}</span>
          </router-link>
        </nav>
        <div class="p-8 border-t border-slate-200 dark:border-slate-800 mt-auto flex items-center ">

        </div>
        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <div
            class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center gap-3"
            
          >
            <div class="size-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden grid place-items-center">
              <img
                v-if="authUser?.image"
                :src="authUser.image"
                alt="Avatar utilisateur"
                class="h-full w-full object-cover"
              />
              <span v-else class="material-symbols-outlined text-slate-600 dark:text-slate-200">person</span>
            </div>
            <div v-show="!isSidebarCollapsed" class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">{{ authUser?.name || t('userDefault') }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ authUser?.email || t('accountConnected') }}
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
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('pageTitle') }}</h2>
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
                  :placeholder="t('searchPlaceholder')"
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
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white">{{ t('incomeVsExpense') }}</h4>
                    <p class="text-xs text-slate-500">{{ t('monthlyComparison') }}</p>
                  </div>
                </div>

                <div v-if="dashboard.monthly_trends.length > 0" class="h-64 flex items-end justify-between gap-3 px-2">
                  <div
                    v-for="item in dashboard.monthly_trends"
                    :key="item.month_key"
                    class="flex-1 h-full min-w-0 flex flex-col items-center gap-2"
                  >
                    <div class="w-full flex-1 min-h-0 flex items-end gap-2">
                      <div class="flex-1 h-full flex items-end">
                        <div class="w-full rounded-t-sm overflow-hidden flex flex-col-reverse min-h-[6px]" :style="trendHeightStyle(item.income)">
                          <button
                            v-for="(segment, segmentIndex) in item.income_segments || []"
                            :key="`${item.month_key}-income-${segment.category}`"
                            class="w-full cursor-pointer border-t border-background-light dark:border-background-dark transition duration-150 hover:brightness-110"
                            :class="trendSegmentHighlightClass(segment)"
                            :style="trendSegmentStyle(segment, 'income', segmentIndex)"
                            :title="trendSegmentLabel(item, segment, 'income')"
                            type="button"
                            @mouseenter="setHoveredTrendSegment(item, segment, 'income')"
                            @mouseleave="clearHoveredTrendSegment"
                            @click="togglePinnedTrendSegment(item, segment, 'income')"
                          ></button>
                          <div
                            v-if="!(item.income_segments || []).length"
                            class="w-full h-full bg-emerald-100 dark:bg-emerald-900/30"
                            :class="hoveredCategoryName ? 'opacity-30' : ''"
                          ></div>
                        </div>
                      </div>

                      <div class="flex-1 h-full flex items-end">
                        <div class="w-full rounded-t-sm overflow-hidden flex flex-col-reverse min-h-[6px]" :style="trendHeightStyle(item.expense)">
                          <button
                            v-for="(segment, segmentIndex) in item.expense_segments || []"
                            :key="`${item.month_key}-expense-${segment.category}`"
                            class="w-full cursor-pointer border-t border-background-light dark:border-background-dark transition duration-150 hover:brightness-110"
                            :class="trendSegmentHighlightClass(segment)"
                            :style="trendSegmentStyle(segment, 'expense', segmentIndex)"
                            :title="trendSegmentLabel(item, segment, 'expense')"
                            type="button"
                            @mouseenter="setHoveredTrendSegment(item, segment, 'expense')"
                            @mouseleave="clearHoveredTrendSegment"
                            @click="togglePinnedTrendSegment(item, segment, 'expense')"
                          ></button>
                          <div
                            v-if="!(item.expense_segments || []).length"
                            class="w-full h-full bg-rose-100 dark:bg-rose-900/30"
                            :class="hoveredCategoryName ? 'opacity-30' : ''"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">{{ item.label }}</span>
                  </div>
                </div>

                <template v-if="dashboard.monthly_trends.length > 0">
                  <div class="mt-4 flex items-center justify-between gap-4 text-xs">
                    <div class="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <span class="inline-flex items-center gap-2"><span class="size-2 rounded-full bg-emerald-500"></span>{{ t('income') }}</span>
                      <span class="inline-flex items-center gap-2"><span class="size-2 rounded-full bg-rose-500"></span>{{ t('expense') }}</span>
                    </div>
                    <span class="text-slate-400 dark:text-slate-500">Hover a segment, click to pin details.</span>
                  </div>

                  <div
                    v-if="activeTrendSegment"
                    class="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-sm"
                  >
                    <span class="font-semibold text-slate-900 dark:text-white">{{ activeTrendSegment.type === 'income' ? t('income') : t('expense') }}</span>
                    <span class="text-slate-600 dark:text-slate-300">: {{ activeTrendSegment.category }} - {{ formatCurrency(activeTrendSegment.amount) }}</span>
                  </div>
                </template>

                <div v-if="dashboard.monthly_trends.length === 0" class="h-64 grid place-items-center text-sm text-slate-500 dark:text-slate-400">
                  {{ t('errLoadDashboard') }}
                </div>
              </div>

              <div class="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                <h4 class="font-bold text-lg mb-1 text-slate-900 dark:text-white">{{ t('byCategory') }}</h4>
                <p class="text-xs text-slate-500 mb-4">{{ t('expenseBreakdown') }}</p>

                <p class="text-2xl font-black mb-6 text-slate-900 dark:text-white">{{ formatCurrency(categoryTotal) }}</p>

                <div class="space-y-3">
                  <div
                    v-for="category in dashboard.category_breakdown"
                    :key="`${category.category_id ?? 'none'}-${category.name}`"
                    class="rounded-xl border border-transparent px-3 py-2 text-sm transition-all"
                    :class="[
                      category.category_id ? 'cursor-pointer' : '',
                      isHoveredCategory(category)
                        ? 'bg-primary/5 border-primary/20 shadow-sm dark:bg-primary/10'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60',
                    ]"
                    @mouseenter="setHoveredCategory(category)"
                    @mouseleave="clearHoveredCategory"
                    @click="openCategoryTransactions(category)"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex items-center gap-2 min-w-0">
                        <span
                          class="size-2 rounded-full transition-all"
                          :class="isHoveredCategory(category) ? 'scale-125' : 'opacity-80'"
                          :style="{ backgroundColor: category.color_hex || '#94a3b8', boxShadow: isHoveredCategory(category) ? `0 0 0 6px ${category.color_hex || '#94a3b8'}22` : 'none' }"
                        ></span>
                        <span class="text-slate-600 dark:text-slate-400 truncate" :class="isHoveredCategory(category) ? 'font-semibold text-slate-900 dark:text-white' : ''">{{ category.name }}</span>
                      </div>
                      <span class="font-bold ml-3 whitespace-nowrap dark:text-slate-400">
                        {{ formatCurrency(category.amount) }} ({{ Number(category.share_percentage).toFixed(0) }}%)
                      </span>
                    </div>
                    <div class="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-200"
                        :class="isHoveredCategory(category) ? 'shadow-[0_0_18px_rgba(19,126,236,0.45)]' : 'opacity-70'"
                        :style="{
                          width: hoveredCategoryStyle(category).width,
                          backgroundColor: category.color_hex || '#137fec',
                        }"
                      ></div>
                    </div>
                  </div>

                  <p
                    v-if="dashboard.category_breakdown.length === 0"
                    class="text-sm text-slate-500 dark:text-slate-400"
                  >
                    {{ t('noExpenses') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h4 class="font-bold text-lg text-slate-900 dark:text-white">{{ t('latestTransactions') }}</h4>
                <router-link class="text-primary text-sm font-semibold hover:underline" to="/transactions">
                  {{ t('seeAll') }}
                </router-link>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left min-w-[760px]">
                  <thead class="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 font-bold">
                    <tr>
                      <th class="px-6 py-4">{{ t('tableTransaction') }}</th>
                      <th class="px-6 py-4">{{ t('tableCategory') }}</th>
                      <th class="px-6 py-4">{{ t('tableDate') }}</th>
                      <th class="px-6 py-4">{{ t('tableStatus') }}</th>
                      <th class="px-6 py-4 text-right">{{ t('tableAmount') }}</th>
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
                          <span class="text-sm font-semibold dark:text-slate-400">{{ transaction.description }}</span>
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
                        {{ t('noSearchResults') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>

        <footer class="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>{{ t('footer') }}</p>
        </footer>
      </main>
    </div>
  </div>
</template>
