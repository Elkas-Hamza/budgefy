<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSidebarCollapsed = ref(false)
const authUser = ref(null)

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
    pageSubtitle: 'Consultez, filtrez et gerez vos transactions.',
    searchPlaceholder: 'Rechercher une transaction...',
    addTransaction: 'Ajouter une transaction',
    totalIncome: 'Revenus Totaux',
    totalExpense: 'Depenses Totales',
    netBalance: 'Solde Net',
    all: 'Toutes',
    incomes: 'Revenus',
    expenses: 'Depenses',
    thisMonth: 'Ce mois-ci',
    lastMonth: 'Mois dernier',
    thisYear: 'Cette annee',
    allCategories: 'Toutes categories',
    tableDate: 'Date',
    tableCategory: 'Categorie',
    tableDescription: 'Description',
    tableAmount: 'Montant',
    tableStatus: 'Statut',
    tableActions: 'Actions',
    statusCompleted: 'Completee',
    statusPending: 'En attente',
    loading: 'Chargement des transactions...',
    noTransactions: 'Aucune transaction trouvee.',
    edit: 'Modifier',
    delete: 'Supprimer',
    prev: 'Precedent',
    next: 'Suivant',
    rangeLabel: 'Affichage de',
    onLabel: 'sur',
    transactionsLabel: 'transactions',
    formCreateTitle: 'Nouvelle transaction',
    formEditTitle: 'Modifier la transaction',
    formDescription: 'Description',
    formAmount: 'Montant',
    formType: 'Type',
    formCategory: 'Categorie',
    formDate: 'Date',
    formNotes: 'Notes',
    formStatus: 'Statut',
    formCancel: 'Annuler',
    formSaveCreate: 'Creer',
    formSaveEdit: 'Enregistrer',
    errLoad: 'Impossible de charger les transactions.',
    errSave: 'Impossible d enregistrer la transaction.',
    errDelete: 'Impossible de supprimer la transaction.',
    confirmDelete: 'Supprimer cette transaction ?',
  },
  EN: {
    navDashboard: 'Dashboard',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Settings',
    userDefault: 'User',
    accountConnected: 'Signed in account',
    pageTitle: 'Transaction Management',
    pageSubtitle: 'Browse, filter and manage your transactions.',
    searchPlaceholder: 'Search for a transaction...',
    addTransaction: 'Add transaction',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    netBalance: 'Net Balance',
    all: 'All',
    incomes: 'Income',
    expenses: 'Expenses',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    thisYear: 'This year',
    allCategories: 'All categories',
    tableDate: 'Date',
    tableCategory: 'Category',
    tableDescription: 'Description',
    tableAmount: 'Amount',
    tableStatus: 'Status',
    tableActions: 'Actions',
    statusCompleted: 'Completed',
    statusPending: 'Pending',
    loading: 'Loading transactions...',
    noTransactions: 'No transactions found.',
    edit: 'Edit',
    delete: 'Delete',
    prev: 'Previous',
    next: 'Next',
    rangeLabel: 'Showing',
    onLabel: 'of',
    transactionsLabel: 'transactions',
    formCreateTitle: 'New transaction',
    formEditTitle: 'Edit transaction',
    formDescription: 'Description',
    formAmount: 'Amount',
    formType: 'Type',
    formCategory: 'Category',
    formDate: 'Date',
    formNotes: 'Notes',
    formStatus: 'Status',
    formCancel: 'Cancel',
    formSaveCreate: 'Create',
    formSaveEdit: 'Save',
    errLoad: 'Could not load transactions.',
    errSave: 'Could not save transaction.',
    errDelete: 'Could not delete transaction.',
    confirmDelete: 'Delete this transaction?',
  },
  AR: {
    navDashboard: 'لوحة التحكم',
    navTransactions: 'المعاملات',
    navCategories: 'الفئات',
    navSettings: 'الإعدادات',
    userDefault: 'مستخدم',
    accountConnected: 'حساب متصل',
    pageTitle: 'إدارة المعاملات',
    pageSubtitle: 'تصفح وفلتر وعدل معاملاتك.',
    searchPlaceholder: 'ابحث عن معاملة...',
    addTransaction: 'إضافة معاملة',
    totalIncome: 'إجمالي الدخل',
    totalExpense: 'إجمالي المصروف',
    netBalance: 'صافي الرصيد',
    all: 'الكل',
    incomes: 'الدخل',
    expenses: 'المصروفات',
    thisMonth: 'هذا الشهر',
    lastMonth: 'الشهر الماضي',
    thisYear: 'هذه السنة',
    allCategories: 'كل الفئات',
    tableDate: 'التاريخ',
    tableCategory: 'الفئة',
    tableDescription: 'الوصف',
    tableAmount: 'المبلغ',
    tableStatus: 'الحالة',
    tableActions: 'الإجراءات',
    statusCompleted: 'مكتملة',
    statusPending: 'قيد الانتظار',
    loading: 'جاري تحميل المعاملات...',
    noTransactions: 'لا توجد معاملات.',
    edit: 'تعديل',
    delete: 'حذف',
    prev: 'السابق',
    next: 'التالي',
    rangeLabel: 'عرض',
    onLabel: 'من',
    transactionsLabel: 'معاملة',
    formCreateTitle: 'معاملة جديدة',
    formEditTitle: 'تعديل المعاملة',
    formDescription: 'الوصف',
    formAmount: 'المبلغ',
    formType: 'النوع',
    formCategory: 'الفئة',
    formDate: 'التاريخ',
    formNotes: 'ملاحظات',
    formStatus: 'الحالة',
    formCancel: 'إلغاء',
    formSaveCreate: 'إنشاء',
    formSaveEdit: 'حفظ',
    errLoad: 'تعذر تحميل المعاملات.',
    errSave: 'تعذر حفظ المعاملة.',
    errDelete: 'تعذر حذف المعاملة.',
    confirmDelete: 'هل تريد حذف هذه المعاملة؟',
  },
}

const preferences = ref({
  currency: 'EUR',
  language: 'FR',
})

const transactions = ref([])
const categories = ref([])
const summary = ref({
  income_total: 0,
  expense_total: 0,
  net_balance: 0,
})

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 12,
  total: 0,
})

const filters = ref({
  search: '',
  type: '',
  period: 'this_month',
  category_id: '',
})

const isLoading = ref(false)
const errorMessage = ref('')
const isModalOpen = ref(false)
const isSaving = ref(false)
const deletingId = ref(null)

const transactionForm = ref({
  id: null,
  description: '',
  amount: '',
  type: 'expense',
  status: 'completed',
  category_id: '',
  occurred_at: '',
  notes: '',
})

const formErrorMessage = ref('')

const currentLanguage = () =>
  SUPPORTED_LANGUAGES.includes(preferences.value.language) ? preferences.value.language : 'FR'

const t = (key) => translations[currentLanguage()]?.[key] ?? translations.FR[key] ?? key

const apiBaseUrl = () => (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

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

const formatSignedAmount = (value, type) => {
  const amount = Number(value || 0)
  const sign = type === 'income' ? '+' : '-'

  return `${sign}${formatCurrency(Math.abs(amount))}`
}

const formatDate = (isoDate) => {
  if (!isoDate) {
    return '-'
  }

  const locale = localeByLanguage[preferences.value.language] ?? 'fr-FR'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

const statusClass = (status) => {
  if (status === 'completed') {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
  }

  return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
}

const categoryTagStyle = (transaction) => {
  const color = transaction?.category?.color_hex

  if (!color) {
    return {}
  }

  return {
    borderColor: color,
    color,
  }
}

const isEditing = computed(() => Boolean(transactionForm.value.id))

const firstItemIndex = computed(() => {
  if (pagination.value.total === 0) {
    return 0
  }

  return (pagination.value.current_page - 1) * pagination.value.per_page + 1
})

const lastItemIndex = computed(() => {
  if (pagination.value.total === 0) {
    return 0
  }

  return Math.min(
    pagination.value.current_page * pagination.value.per_page,
    pagination.value.total,
  )
})

const dark_light = window.dark_light
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const ensureAuthenticated = async () => {
  const token = localStorage.getItem('auth_token')

  if (!token) {
    await router.replace('/login')
    return null
  }

  return token
}

const normalizeTransactionForm = () => {
  transactionForm.value = {
    id: null,
    description: '',
    amount: '',
    type: 'expense',
    status: 'completed',
    category_id: '',
    occurred_at: new Date().toISOString().slice(0, 16),
    notes: '',
  }
}

const openCreateModal = () => {
  formErrorMessage.value = ''
  normalizeTransactionForm()
  isModalOpen.value = true
}

const openEditModal = (transaction) => {
  formErrorMessage.value = ''
  transactionForm.value = {
    id: transaction.id,
    description: transaction.description ?? '',
    amount: String(transaction.amount ?? ''),
    type: transaction.type ?? 'expense',
    status: transaction.status ?? 'completed',
    category_id: transaction?.category?.id ?? '',
    occurred_at: transaction.occurred_at
      ? new Date(transaction.occurred_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    notes: transaction.notes ?? '',
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  formErrorMessage.value = ''
}

const parseErrorMessage = (data, fallback) => {
  if (data?.message) {
    return data.message
  }

  const firstValidationError = Object.values(data?.errors ?? {})?.[0]?.[0]

  if (typeof firstValidationError === 'string') {
    return firstValidationError
  }

  return fallback
}

const loadTransactions = async () => {
  errorMessage.value = ''
  isLoading.value = true

  const token = await ensureAuthenticated()

  if (!token) {
    isLoading.value = false
    return
  }

  const params = new URLSearchParams()

  if (filters.value.search.trim() !== '') {
    params.set('search', filters.value.search.trim())
  }

  if (filters.value.type) {
    params.set('type', filters.value.type)
  }

  if (filters.value.period) {
    params.set('period', filters.value.period)
  }

  if (filters.value.category_id) {
    params.set('category_id', filters.value.category_id)
  }

  params.set('page', String(pagination.value.current_page))

  try {
    const response = await fetch(`${apiBaseUrl()}/api/transactions?${params.toString()}`, {
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

      throw new Error(parseErrorMessage(data, t('errLoad')))
    }

    transactions.value = Array.isArray(data?.transactions) ? data.transactions : []
    categories.value = Array.isArray(data?.categories) ? data.categories : []
    summary.value = {
      income_total: Number(data?.summary?.income_total ?? 0),
      expense_total: Number(data?.summary?.expense_total ?? 0),
      net_balance: Number(data?.summary?.net_balance ?? 0),
    }
    pagination.value = {
      current_page: Number(data?.pagination?.current_page ?? 1),
      last_page: Number(data?.pagination?.last_page ?? 1),
      per_page: Number(data?.pagination?.per_page ?? 12),
      total: Number(data?.pagination?.total ?? 0),
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('errLoad')
  } finally {
    isLoading.value = false
  }
}

const saveTransaction = async () => {
  formErrorMessage.value = ''
  isSaving.value = true

  const token = await ensureAuthenticated()

  if (!token) {
    isSaving.value = false
    return
  }

  const payload = {
    description: transactionForm.value.description,
    amount: Number(transactionForm.value.amount),
    type: transactionForm.value.type,
    status: transactionForm.value.status,
    category_id: transactionForm.value.category_id ? Number(transactionForm.value.category_id) : null,
    occurred_at: transactionForm.value.occurred_at,
    notes: transactionForm.value.notes || null,
  }

  const endpoint = isEditing.value
    ? `${apiBaseUrl()}/api/transactions/${transactionForm.value.id}`
    : `${apiBaseUrl()}/api/transactions`
  const method = isEditing.value ? 'PUT' : 'POST'

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(parseErrorMessage(data, t('errSave')))
    }

    closeModal()
    await loadTransactions()
  } catch (error) {
    formErrorMessage.value = error instanceof Error ? error.message : t('errSave')
  } finally {
    isSaving.value = false
  }
}

const deleteTransaction = async (transactionId) => {
  const shouldDelete = window.confirm(t('confirmDelete'))

  if (!shouldDelete) {
    return
  }

  deletingId.value = transactionId
  errorMessage.value = ''

  const token = await ensureAuthenticated()

  if (!token) {
    deletingId.value = null
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/api/transactions/${transactionId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(parseErrorMessage(data, t('errDelete')))
    }

    if (transactions.value.length === 1 && pagination.value.current_page > 1) {
      pagination.value.current_page -= 1
    }

    await loadTransactions()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('errDelete')
  } finally {
    deletingId.value = null
  }
}

const setTypeFilter = (type) => {
  filters.value.type = type
  pagination.value.current_page = 1
  loadTransactions()
}

const setPage = (nextPage) => {
  if (nextPage < 1 || nextPage > pagination.value.last_page || nextPage === pagination.value.current_page) {
    return
  }

  pagination.value.current_page = nextPage
  loadTransactions()
}

let searchDebounce = null

watch(
  () => filters.value.search,
  () => {
    pagination.value.current_page = 1

    if (searchDebounce) {
      clearTimeout(searchDebounce)
    }

    searchDebounce = setTimeout(() => {
      loadTransactions()
    }, 300)
  },
)

watch(
  () => filters.value.category_id,
  () => {
    pagination.value.current_page = 1
    loadTransactions()
  },
)

watch(
  () => filters.value.period,
  () => {
    pagination.value.current_page = 1
    loadTransactions()
  },
)

const onPreferencesUpdated = () => {
  applyStoredPreferences()
}

onMounted(() => {
  applyStoredPreferences()

  try {
    const rawUser = localStorage.getItem('auth_user')
    authUser.value = rawUser ? JSON.parse(rawUser) : null
  } catch {
    authUser.value = null
  }

  normalizeTransactionForm()
  loadTransactions()

  window.addEventListener('user-preferences-updated', onPreferencesUpdated)
})

onBeforeUnmount(() => {
  if (searchDebounce) {
    clearTimeout(searchDebounce)
  }

  window.removeEventListener('user-preferences-updated', onPreferencesUpdated)
})
</script>

<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
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
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('pageSubtitle') }}</p>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="relative w-full md:w-72">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  search
                </span>
                <input
                  v-model="filters.search"
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

        <div class="p-5 md:p-8 space-y-6 flex-1">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {{ t('navTransactions') }}
              </h3>
            </div>
            <button
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
              type="button"
              @click="openCreateModal"
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span>{{ t('addTransaction') }}</span>
            </button>
          </div>

          <p v-if="errorMessage" class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            {{ errorMessage }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{ t('totalIncome') }}</p>
              <p class="text-2xl font-bold text-emerald-500">{{ formatCurrency(summary.income_total) }}</p>
            </div>

            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{ t('totalExpense') }}</p>
              <p class="text-2xl font-bold text-rose-500">{{ formatCurrency(summary.expense_total) }}</p>
            </div>

            <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{ t('netBalance') }}</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(summary.net_balance) }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200 dark:border-slate-800">
              <div class="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-fit">
                <button
                  class="px-4 py-2 rounded-md text-sm font-bold transition-all"
                  :class="filters.type === '' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400'"
                  type="button"
                  @click="setTypeFilter('')"
                >
                  {{ t('all') }}
                </button>
                <button
                  class="px-4 py-2 rounded-md text-sm font-bold transition-all"
                  :class="filters.type === 'income' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400'"
                  type="button"
                  @click="setTypeFilter('income')"
                >
                  {{ t('incomes') }}
                </button>
                <button
                  class="px-4 py-2 rounded-md text-sm font-bold transition-all"
                  :class="filters.type === 'expense' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400'"
                  type="button"
                  @click="setTypeFilter('expense')"
                >
                  {{ t('expenses') }}
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <select
                  v-model="filters.period"
                  class="bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="this_month">{{ t('thisMonth') }}</option>
                  <option value="last_month">{{ t('lastMonth') }}</option>
                  <option value="this_year">{{ t('thisYear') }}</option>
                </select>

                <select
                  v-model="filters.category_id"
                  class="bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="">{{ t('allCategories') }}</option>
                  <option v-for="category in categories" :key="category.id" :value="String(category.id)">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                    <th class="px-6 py-4">{{ t('tableDate') }}</th>
                    <th class="px-6 py-4">{{ t('tableCategory') }}</th>
                    <th class="px-6 py-4">{{ t('tableDescription') }}</th>
                    <th class="px-6 py-4">{{ t('tableStatus') }}</th>
                    <th class="px-6 py-4 text-right">{{ t('tableAmount') }}</th>
                    <th class="px-6 py-4 text-center">{{ t('tableActions') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr v-if="isLoading">
                    <td colspan="6" class="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                      {{ t('loading') }}
                    </td>
                  </tr>

                  <tr v-else-if="transactions.length === 0">
                    <td colspan="6" class="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                      {{ t('noTransactions') }}
                    </td>
                  </tr>

                  <tr
                    v-for="transaction in transactions"
                    :key="transaction.id"
                    class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {{ formatDate(transaction.occurred_at) }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        :style="categoryTagStyle(transaction)"
                      >
                        {{ transaction?.category?.name || '-' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {{ transaction.description }}
                    </td>
                    <td class="px-6 py-4">
                      <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(transaction.status)">
                        {{ transaction.status === 'completed' ? t('statusCompleted') : t('statusPending') }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right font-bold" :class="transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'">
                      {{ formatSignedAmount(transaction.amount, transaction.type) }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          class="rounded px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10"
                          type="button"
                          @click="openEditModal(transaction)"
                        >
                          {{ t('edit') }}
                        </button>
                        <button
                          class="rounded px-2 py-1 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 disabled:opacity-60"
                          type="button"
                          :disabled="deletingId === transaction.id"
                          @click="deleteTransaction(transaction.id)"
                        >
                          {{ t('delete') }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ t('rangeLabel') }}
                <span class="font-bold text-slate-900 dark:text-white">{{ firstItemIndex }}-{{ lastItemIndex }}</span>
                {{ t('onLabel') }}
                <span class="font-bold text-slate-900 dark:text-white">{{ pagination.total }}</span>
                {{ t('transactionsLabel') }}
              </p>
              <div class="flex gap-2">
                <button
                  class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-50"
                  type="button"
                  :disabled="pagination.current_page <= 1 || isLoading"
                  @click="setPage(pagination.current_page - 1)"
                >
                  {{ t('prev') }}
                </button>
                <button
                  class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm disabled:opacity-50"
                  type="button"
                  :disabled="pagination.current_page >= pagination.last_page || isLoading"
                  @click="setPage(pagination.current_page + 1)"
                >
                  {{ t('next') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-30 grid place-items-center bg-slate-900/50 p-4">
      <div class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h4 class="text-xl font-bold text-slate-900 dark:text-white">
          {{ isEditing ? t('formEditTitle') : t('formCreateTitle') }}
        </h4>

        <p v-if="formErrorMessage" class="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          {{ formErrorMessage }}
        </p>

        <form class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2" @submit.prevent="saveTransaction">
          <label class="flex flex-col gap-1 md:col-span-2">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formDescription') }}</span>
            <input
              v-model="transactionForm.description"
              required
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              type="text"
            />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formAmount') }}</span>
            <input
              v-model="transactionForm.amount"
              required
              min="0.01"
              step="0.01"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              type="number"
            />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formType') }}</span>
            <select
              v-model="transactionForm.type"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="income">{{ t('incomes') }}</option>
              <option value="expense">{{ t('expenses') }}</option>
            </select>
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formCategory') }}</span>
            <select
              v-model="transactionForm.category_id"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="">{{ t('allCategories') }}</option>
              <option v-for="category in categories" :key="category.id" :value="String(category.id)">
                {{ category.name }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formStatus') }}</span>
            <select
              v-model="transactionForm.status"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="completed">{{ t('statusCompleted') }}</option>
              <option value="pending">{{ t('statusPending') }}</option>
            </select>
          </label>

          <label class="flex flex-col gap-1 md:col-span-2">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formDate') }}</span>
            <input
              v-model="transactionForm.occurred_at"
              required
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              type="datetime-local"
            />
          </label>

          <label class="flex flex-col gap-1 md:col-span-2">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formNotes') }}</span>
            <textarea
              v-model="transactionForm.notes"
              rows="3"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </label>

          <div class="md:col-span-2 mt-2 flex justify-end gap-3">
            <button
              class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              type="button"
              @click="closeModal"
            >
              {{ t('formCancel') }}
            </button>
            <button
              class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              type="submit"
              :disabled="isSaving"
            >
              {{ isEditing ? t('formSaveEdit') : t('formSaveCreate') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
