<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isSidebarCollapsed = ref(false)
const authUser = ref(null)

try {
  const rawUser = localStorage.getItem('auth_user')
  authUser.value = rawUser ? JSON.parse(rawUser) : null
} catch {
  authUser.value = null
}

const dark_light = window.dark_light
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

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
    pageTitle: 'Gestion des Transactions',
    pageSubtitle: 'Suivez et gerez vos revenus et depenses en temps reel.',
    searchPlaceholder: 'Rechercher une transaction...',
    overviewTitle: 'Apercu des transactions',
    overviewSubtitle: 'Vue rapide des mouvements recents et du solde global.',
    addTransaction: 'Ajouter une Transaction',
    totalIncome: 'Revenus Totaux',
    totalExpense: 'Depenses Totales',
    netBalance: 'Solde Net',
    all: 'Toutes',
    incomes: 'Revenus',
    expenses: 'Depenses',
    moreFilters: 'Plus de filtres',
    thisMonth: 'Ce mois-ci',
    lastMonth: 'Mois dernier',
    thisYear: 'Cette annee',
    custom: 'Personnalise',
    allCategories: 'Toutes categories',
    categoryFood: 'Alimentation',
    categoryLeisure: 'Loisirs',
    categoryHousing: 'Logement',
    categorySalary: 'Salaire',
    tableDate: 'Date',
    tableCategory: 'Categorie',
    tableDescription: 'Description',
    tableAmount: 'Montant',
    tableActions: 'Actions',
    rangeLabel: 'Affichage de',
    onLabel: 'sur',
    transactionsLabel: 'transactions',
  },
  EN: {
    navDashboard: 'Dashboard',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Settings',
    userDefault: 'User',
    accountConnected: 'Signed in account',
    pageTitle: 'Transaction Management',
    pageSubtitle: 'Track and manage your income and expenses in real time.',
    searchPlaceholder: 'Search for a transaction...',
    overviewTitle: 'Transaction overview',
    overviewSubtitle: 'Quick view of recent movements and overall balance.',
    addTransaction: 'Add transaction',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    netBalance: 'Net Balance',
    all: 'All',
    incomes: 'Income',
    expenses: 'Expenses',
    moreFilters: 'More filters',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    thisYear: 'This year',
    custom: 'Custom',
    allCategories: 'All categories',
    categoryFood: 'Food',
    categoryLeisure: 'Leisure',
    categoryHousing: 'Housing',
    categorySalary: 'Salary',
    tableDate: 'Date',
    tableCategory: 'Category',
    tableDescription: 'Description',
    tableAmount: 'Amount',
    tableActions: 'Actions',
    rangeLabel: 'Showing',
    onLabel: 'of',
    transactionsLabel: 'transactions',
  },
  AR: {
    navDashboard: 'لوحة التحكم',
    navTransactions: 'المعاملات',
    navCategories: 'الفئات',
    navSettings: 'الإعدادات',
    userDefault: 'مستخدم',
    accountConnected: 'حساب متصل',
    pageTitle: 'إدارة المعاملات',
    pageSubtitle: 'تابع وادِر دخلك ومصروفاتك بشكل فوري.',
    searchPlaceholder: 'ابحث عن معاملة...',
    overviewTitle: 'نظرة على المعاملات',
    overviewSubtitle: 'عرض سريع للحركات الاخيرة وصافي الرصيد.',
    addTransaction: 'إضافة معاملة',
    totalIncome: 'إجمالي الدخل',
    totalExpense: 'إجمالي المصروف',
    netBalance: 'صافي الرصيد',
    all: 'الكل',
    incomes: 'الدخل',
    expenses: 'المصروفات',
    moreFilters: 'مزيد من الفلاتر',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    thisYear: 'هذه السنة',
    custom: 'مخصص',
    allCategories: 'كل الفئات',
    categoryFood: 'طعام',
    categoryLeisure: 'ترفيه',
    categoryHousing: 'سكن',
    categorySalary: 'راتب',
    tableDate: 'التاريخ',
    tableCategory: 'الفئة',
    tableDescription: 'الوصف',
    tableAmount: 'المبلغ',
    tableActions: 'الإجراءات',
    rangeLabel: 'عرض',
    onLabel: 'من',
    transactionsLabel: 'معاملة',
  },
}

const preferences = ref({
  currency: 'EUR',
  language: 'FR',
})

const currentLanguage = () =>
  SUPPORTED_LANGUAGES.includes(preferences.value.language) ? preferences.value.language : 'FR'

const t = (key) => translations[currentLanguage()]?.[key] ?? translations.FR[key] ?? key

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

const applyStoredPreferences = () => {
  preferences.value = getStoredPreferences()
}

const formatCurrency = (value) => {
  const locale = localeByLanguage[preferences.value.language] ?? 'fr-FR'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: preferences.value.currency,
  }).format(Number(value || 0))
}

const formatSignedAmount = (value) => {
  const amount = Number(value || 0)
  const sign = amount >= 0 ? '+' : '-'

  return `${sign}${formatCurrency(Math.abs(amount))}`
}

const onPreferencesUpdated = () => {
  applyStoredPreferences()
}

onMounted(() => {
  applyStoredPreferences()
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
        :class="isSidebarCollapsed ? 'w-20' : 'w-72'"
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
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/dashboard"
          >
            <span class="material-symbols-outlined text-[22px]">dashboard</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navDashboard') }}</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
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


        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center gap-3">
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
              <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">
                {{ authUser?.name || t('userDefault') }}
              </p>
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
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ t('pageSubtitle') }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="relative w-full md:w-72">
                <span
                  class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
                >
                  search
                </span>
                <input
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
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {{ t('overviewTitle') }}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                {{ t('overviewSubtitle') }}
              </p>
            </div>
            <button
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span>{{ t('addTransaction') }}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <span class="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {{ t('totalIncome') }}
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(4250) }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                  <span class="material-symbols-outlined">trending_down</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {{ t('totalExpense') }}
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(1840.5) }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-primary/10 text-primary rounded-xl">
                  <span class="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {{ t('netBalance') }}
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(2409.5) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200 dark:border-slate-800">
              <div class="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-fit">
                <button class="px-6 py-2 rounded-md text-sm font-bold bg-white dark:bg-slate-800 text-primary shadow-sm transition-all">
                  {{ t('all') }}
                </button>
                <button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                  {{ t('incomes') }}
                </button>
                <button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                  {{ t('expenses') }}
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <div class="relative min-w-[200px]">
                  <span
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                  >
                    calendar_month
                  </span>
                  <select
                    class="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-slate-900 dark:text-white"
                  >
                    <option>{{ t('thisMonth') }}</option>
                    <option>{{ t('lastMonth') }}</option>
                    <option>{{ t('thisYear') }}</option>
                    <option>{{ t('custom') }}</option>
                  </select>
                </div>
                <div class="relative min-w-[180px]">
                  <span
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                  >
                    category
                  </span>
                  <select
                    class="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-slate-900 dark:text-white"
                  >
                    <option>{{ t('allCategories') }}</option>
                    <option>{{ t('categoryFood') }}</option>
                    <option>{{ t('categoryLeisure') }}</option>
                    <option>{{ t('categoryHousing') }}</option>
                    <option>{{ t('categorySalary') }}</option>
                  </select>
                </div>
                <button
                  class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span class="material-symbols-outlined text-sm">filter_list</span>
                  {{ t('moreFilters') }}
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                    <th class="px-6 py-4">{{ t('tableDate') }}</th>
                    <th class="px-6 py-4">{{ t('tableCategory') }}</th>
                    <th class="px-6 py-4">{{ t('tableDescription') }}</th>
                    <th class="px-6 py-4 text-right">{{ t('tableAmount') }}</th>
                    <th class="px-6 py-4 text-center">{{ t('tableActions') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">12 Mai 2024</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span class="material-symbols-outlined text-[14px]">payments</span> Salaire
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Salaire Mensuel - Entreprise ABC</td>
                    <td class="px-6 py-4 text-right font-bold text-emerald-500">{{ formatSignedAmount(3200) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-primary/10 hover:text-primary rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button class="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">10 Mai 2024</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                        <span class="material-symbols-outlined text-[14px]">restaurant</span> Alimentation
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Courses Supermarché Bio</td>
                    <td class="px-6 py-4 text-right font-bold text-rose-500">{{ formatSignedAmount(-84.2) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-primary/10 hover:text-primary rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button class="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">08 Mai 2024</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        <span class="material-symbols-outlined text-[14px]">home</span> Logement
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Loyer - Appartement Centre</td>
                    <td class="px-6 py-4 text-right font-bold text-rose-500">{{ formatSignedAmount(-950) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-primary/10 hover:text-primary rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button class="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">05 Mai 2024</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        <span class="material-symbols-outlined text-[14px]">movie</span> Loisirs
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Abonnement Netflix &amp; Spotify</td>
                    <td class="px-6 py-4 text-right font-bold text-rose-500">{{ formatSignedAmount(-25.98) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-primary/10 hover:text-primary rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button class="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">02 Mai 2024</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span class="material-symbols-outlined text-[14px]">monitoring</span> Dividendes
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Dividendes Portfolio Actions</td>
                    <td class="px-6 py-4 text-right font-bold text-emerald-500">{{ formatSignedAmount(150.3) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 hover:bg-primary/10 hover:text-primary rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button class="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded text-slate-400 transition-colors">
                          <span class="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ t('rangeLabel') }} <span class="font-bold text-slate-900 dark:text-white">1-5</span> {{ t('onLabel') }}
                <span class="font-bold text-slate-900 dark:text-white">42</span> {{ t('transactionsLabel') }}
              </p>
              <div class="flex gap-2">
                <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
                  <span class="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button class="px-3.5 py-2 text-sm font-bold bg-primary text-white rounded-lg">1</button>
                <button class="px-3.5 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">2</button>
                <button class="px-3.5 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">3</button>
                <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                  <span class="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
