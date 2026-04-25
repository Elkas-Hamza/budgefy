<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { useConfirm } from '../composables/useConfirm'

const router = useRouter()
const { showToast } = useToast()
const { confirm } = useConfirm()

const isSidebarCollapsed = ref(false)
const authUser = ref(null)
const categories = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const deletingId = ref(null)
const errorMessage = ref('')
const search = ref('')
const activeTab = ref('all')
const isModalOpen = ref(false)
const isDetailsModalOpen = ref(false)
const formErrorMessage = ref('')
const editingCategoryId = ref(null)
const detailsErrorMessage = ref('')
const isDetailsLoading = ref(false)

const detailsCategory = ref(null)
const detailsSummary = ref({
  income_total: 0,
  expense_total: 0,
  net_balance: 0,
})
const detailsTransactions = ref([])
const detailsPagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
})

const categoryForm = ref({
  name: '',
  color_hex: '#137fec',
  selectedIcon: 'label',
})

const categoryPalette = [
  '#137fec',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
  '#06b6d4',
  '#22c55e',
  '#94a3b8',
  '#f97316',
  '#ec4899',
]

const categoryIconOptions = [
  { value: 'label', label: 'general' },
  { value: 'travel', label: 'travel' },
  { value: 'shopping_cart', label: 'groceries' },
  { value: 'restaurant', label: 'food' },
  { value: 'subscriptions', label: 'online-media' },
  { value: 'local_gas_station', label: 'transport' },
  { value: 'sports_esports', label: 'entertainment' },
  { value: 'movie', label: 'movies' },
  { value: 'school', label: 'education' },
  { value: 'health_and_safety', label: 'health' },
  { value: 'home', label: 'housing' },
  { value: 'work', label: 'work' },
  { value: 'savings', label: 'savings' },
  { value: 'payments', label: 'income' },
]

const translations = {
  FR: {
    navDashboard: 'Tableau de bord',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Parametres',
    userDefault: 'Utilisateur',
    accountConnected: 'Compte connecte',
    pageTitle: 'Gestion des Categories',
    pageSubtitle: 'Organisez vos flux financiers avec des categories reelles.',
    searchPlaceholder: 'Rechercher une categorie...',
    addCategory: 'Ajouter une categorie',
    all: 'Toutes',
    withTransactions: 'Avec operations',
    empty: 'Aucune categorie trouvee.',
    transactionsLabel: 'transactions',
    edit: 'Modifier',
    delete: 'Supprimer',
    prev: 'Precedent',
    next: 'Suivant',
    loading: 'Chargement des categories...',
    formCreateTitle: 'Nouvelle categorie',
    formEditTitle: 'Modifier la categorie',
    formName: 'Nom',
    formColor: 'Couleur',
    formIcon: 'Icone',
    formCancel: 'Annuler',
    formSaveCreate: 'Creer',
    formSaveEdit: 'Enregistrer',
    saveCreateSuccess: 'Categorie creee avec succes.',
    saveEditSuccess: 'Categorie mise a jour avec succes.',
    deleteSuccess: 'Categorie supprimee avec succes.',
    detailsTitle: 'Details de categorie',
    detailsSubtitle: 'Visualisez les transactions de cette categorie.',
    detailsEmpty: 'Aucune transaction pour cette categorie.',
    detailsLoading: 'Chargement des details...',
    close: 'Fermer',
    totalIncome: 'Revenus',
    totalExpense: 'Depenses',
    netBalance: 'Solde net',
    tableDate: 'Date',
    tableDescription: 'Description',
    tableType: 'Type',
    tableAmount: 'Montant',
    income: 'Revenu',
    expense: 'Depense',
    errLoad: 'Impossible de charger les categories.',
    errSave: 'Impossible d enregistrer la categorie.',
    errDelete: 'Impossible de supprimer la categorie.',
    confirmDelete: 'Supprimer cette categorie ?',
    deleteBlocked: 'Supprimez les transactions liees avant de supprimer cette categorie.',
  },
  EN: {
    navDashboard: 'Dashboard',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Settings',
    userDefault: 'User',
    accountConnected: 'Signed in account',
    pageTitle: 'Category Management',
    pageSubtitle: 'Organize your finances with real categories.',
    searchPlaceholder: 'Search for a category...',
    addCategory: 'Add category',
    all: 'All',
    withTransactions: 'With transactions',
    empty: 'No categories found.',
    transactionsLabel: 'transactions',
    edit: 'Edit',
    delete: 'Delete',
    prev: 'Previous',
    next: 'Next',
    loading: 'Loading categories...',
    formCreateTitle: 'New category',
    formEditTitle: 'Edit category',
    formName: 'Name',
    formColor: 'Color',
    formIcon: 'Icon',
    formCancel: 'Cancel',
    formSaveCreate: 'Create',
    formSaveEdit: 'Save',
    saveCreateSuccess: 'Category created successfully.',
    saveEditSuccess: 'Category updated successfully.',
    deleteSuccess: 'Category deleted successfully.',
    detailsTitle: 'Category Details',
    detailsSubtitle: 'View transactions in this category.',
    detailsEmpty: 'No transactions in this category.',
    detailsLoading: 'Loading details...',
    close: 'Close',
    totalIncome: 'Income',
    totalExpense: 'Expenses',
    netBalance: 'Net balance',
    tableDate: 'Date',
    tableDescription: 'Description',
    tableType: 'Type',
    tableAmount: 'Amount',
    income: 'Income',
    expense: 'Expense',
    errLoad: 'Could not load categories.',
    errSave: 'Could not save category.',
    errDelete: 'Could not delete category.',
    confirmDelete: 'Delete this category?',
    deleteBlocked: 'Remove linked transactions before deleting this category.',
  },
  AR: {
    navDashboard: 'لوحة التحكم',
    navTransactions: 'المعاملات',
    navCategories: 'الفئات',
    navSettings: 'الإعدادات',
    userDefault: 'مستخدم',
    accountConnected: 'حساب متصل',
    pageTitle: 'إدارة الفئات',
    pageSubtitle: 'نظم معاملاتك عبر فئات حقيقية.',
    searchPlaceholder: 'ابحث عن فئة...',
    addCategory: 'إضافة فئة',
    all: 'الكل',
    withTransactions: 'مع معاملات',
    empty: 'لا توجد فئات.',
    transactionsLabel: 'معاملة',
    edit: 'تعديل',
    delete: 'حذف',
    prev: 'السابق',
    next: 'التالي',
    loading: 'جاري تحميل الفئات...',
    formCreateTitle: 'فئة جديدة',
    formEditTitle: 'تعديل الفئة',
    formName: 'الاسم',
    formColor: 'اللون',
    formIcon: 'الايقونة',
    formCancel: 'إلغاء',
    formSaveCreate: 'إنشاء',
    formSaveEdit: 'حفظ',
    saveCreateSuccess: 'تم إنشاء الفئة بنجاح.',
    saveEditSuccess: 'تم تحديث الفئة بنجاح.',
    deleteSuccess: 'تم حذف الفئة بنجاح.',
    detailsTitle: 'تفاصيل الفئة',
    detailsSubtitle: 'عرض المعاملات الخاصة بهذه الفئة.',
    detailsEmpty: 'لا توجد معاملات لهذه الفئة.',
    detailsLoading: 'جاري تحميل التفاصيل...',
    close: 'اغلاق',
    totalIncome: 'الدخل',
    totalExpense: 'المصروف',
    netBalance: 'صافي الرصيد',
    tableDate: 'التاريخ',
    tableDescription: 'الوصف',
    tableType: 'النوع',
    tableAmount: 'المبلغ',
    income: 'دخل',
    expense: 'مصروف',
    errLoad: 'تعذر تحميل الفئات.',
    errSave: 'تعذر حفظ الفئة.',
    errDelete: 'تعذر حذف الفئة.',
    confirmDelete: 'هل تريد حذف هذه الفئة؟',
    deleteBlocked: 'احذف المعاملات المرتبطة قبل حذف هذه الفئة.',
  },
}

const preferences = ref({
  language: 'FR',
  currency: 'EUR',
})

const currentLanguage = () => (['FR', 'EN', 'AR'].includes(preferences.value.language) ? preferences.value.language : 'FR')
const t = (key) => translations[currentLanguage()]?.[key] ?? translations.FR[key] ?? key
const apiBaseUrl = () => (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const dark_light = window.dark_light

const isAuthenticated = async () => {
  const token = localStorage.getItem('auth_token')

  if (!token) {
    await router.replace('/login')
    return null
  }

  return token
}

const getStoredPreferences = () => {
  const raw = localStorage.getItem('user_preferences')

  if (!raw) {
    return { language: 'FR', currency: 'EUR' }
  }

  try {
    const parsed = JSON.parse(raw)

    return {
      language: ['FR', 'EN', 'AR'].includes(String(parsed?.language ?? '')) ? String(parsed.language) : 'FR',
      currency: ['EUR', 'USD', 'GBP'].includes(String(parsed?.currency ?? '')) ? String(parsed.currency) : 'EUR',
    }
  } catch {
    return { language: 'FR', currency: 'EUR' }
  }
}

const applyStoredPreferences = () => {
  preferences.value = getStoredPreferences()
}

const loadUser = () => {
  try {
    const rawUser = localStorage.getItem('auth_user')
    authUser.value = rawUser ? JSON.parse(rawUser) : null
  } catch {
    authUser.value = null
  }
}

const normalizeCategoryForm = () => {
  categoryForm.value = {
    name: '',
    color_hex: categoryPalette[0],
    selectedIcon: 'label',
  }
  editingCategoryId.value = null
}

const openCreateModal = () => {
  formErrorMessage.value = ''
  normalizeCategoryForm()
  isModalOpen.value = true
}

const openEditModal = (category) => {
  formErrorMessage.value = ''
  editingCategoryId.value = category.id
  categoryForm.value = {
    name: category.name ?? '',
    color_hex: category.color_hex ?? categoryPalette[0],
    selectedIcon: category.icon || 'label',
  }
  isModalOpen.value = true
}

const formatCurrency = (value) => {
  const locale = currentLanguage() === 'AR' ? 'ar' : currentLanguage() === 'EN' ? 'en-US' : 'fr-FR'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: preferences.value.currency || 'EUR',
  }).format(Number(value || 0))
}

const formatDate = (isoDate) => {
  if (!isoDate) {
    return '-'
  }

  const locale = currentLanguage() === 'AR' ? 'ar' : currentLanguage() === 'EN' ? 'en-US' : 'fr-FR'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

const transactionTypeLabel = (type) => {
  return type === 'income' ? t('income') : t('expense')
}

const signedAmount = (amount, type) => {
  const sign = type === 'income' ? '+' : '-'

  return `${sign}${formatCurrency(Math.abs(Number(amount || 0)))}`
}

const closeDetailsModal = () => {
  isDetailsModalOpen.value = false
  detailsErrorMessage.value = ''
}

const loadCategoryDetails = async (categoryId, page = 1) => {
  detailsErrorMessage.value = ''
  isDetailsLoading.value = true

  const token = await isAuthenticated()

  if (!token) {
    isDetailsLoading.value = false
    return
  }

  try {
    const params = new URLSearchParams({
      category_id: String(categoryId),
      period: 'all',
      page: String(page),
    })

    const response = await fetch(`${apiBaseUrl()}/api/transactions?${params.toString()}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(parseErrorMessage(data, t('errLoad')))
    }

    detailsTransactions.value = Array.isArray(data?.transactions) ? data.transactions : []
    detailsSummary.value = {
      income_total: Number(data?.summary?.income_total || 0),
      expense_total: Number(data?.summary?.expense_total || 0),
      net_balance: Number(data?.summary?.net_balance || 0),
    }
    detailsPagination.value = {
      current_page: Number(data?.pagination?.current_page || 1),
      last_page: Number(data?.pagination?.last_page || 1),
      total: Number(data?.pagination?.total || 0),
    }
  } catch (error) {
    detailsErrorMessage.value = error instanceof Error ? error.message : t('errLoad')
  } finally {
    isDetailsLoading.value = false
  }
}

const openCategoryDetails = (category) => {
  if (!category?.id) {
    return
  }

  detailsCategory.value = category
  detailsTransactions.value = []
  detailsSummary.value = { income_total: 0, expense_total: 0, net_balance: 0 }
  detailsPagination.value = { current_page: 1, last_page: 1, total: 0 }
  isDetailsModalOpen.value = true
  loadCategoryDetails(category.id, 1)
}

const goToDetailsPage = (page) => {
  if (!detailsCategory.value?.id) {
    return
  }

  if (page < 1 || page > detailsPagination.value.last_page || page === detailsPagination.value.current_page) {
    return
  }

  loadCategoryDetails(detailsCategory.value.id, page)
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

const activeCategories = computed(() => {
  const query = search.value.trim().toLowerCase()

  return categories.value.filter((category) => {
    const matchesSearch = query === '' || category.name.toLowerCase().includes(query)
    const matchesTab =
      activeTab.value === 'all'
        || (activeTab.value === 'with_transactions' && Number(category.transactions_count ?? 0) > 0)

    return matchesSearch && matchesTab
  })
})

const loadCategories = async () => {
  errorMessage.value = ''
  isLoading.value = true

  const token = await isAuthenticated()

  if (!token) {
    isLoading.value = false
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/api/categories`, {
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

    categories.value = Array.isArray(data?.categories) ? data.categories : []
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('errLoad')
  } finally {
    isLoading.value = false
  }
}

const saveCategory = async () => {
  const wasEditing = Boolean(editingCategoryId.value)
  formErrorMessage.value = ''
  isSaving.value = true

  const token = await isAuthenticated()

  if (!token) {
    isSaving.value = false
    return
  }

  const payload = {
    name: categoryForm.value.name,
    color_hex: categoryForm.value.color_hex,
    icon: categoryForm.value.selectedIcon,
  }

  const endpoint = editingCategoryId.value
    ? `${apiBaseUrl()}/api/categories/${editingCategoryId.value}`
    : `${apiBaseUrl()}/api/categories`
  const method = editingCategoryId.value ? 'PUT' : 'POST'

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
    await loadCategories()
    showToast(t(wasEditing ? 'saveEditSuccess' : 'saveCreateSuccess'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errSave')
    formErrorMessage.value = message
    showToast(message, 'error')
  } finally {
    isSaving.value = false
  }
}

const deleteCategory = async (categoryId) => {
  const shouldDelete = await confirm({
    title: t('delete'),
    message: t('confirmDelete'),
    confirmLabel: t('delete'),
    cancelLabel: t('formCancel'),
    type: 'danger',
  })

  if (!shouldDelete) {
    return
  }

  deletingId.value = categoryId
  errorMessage.value = ''

  const token = await isAuthenticated()

  if (!token) {
    deletingId.value = null
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/api/categories/${categoryId}`, {
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

    await loadCategories()
    showToast(t('deleteSuccess'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errDelete')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    deletingId.value = null
  }
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

watch(search, () => {
  // Filtering is client-side, nothing else needed.
})

onMounted(() => {
  applyStoredPreferences()
  loadUser()
  loadCategories()
  window.addEventListener('user-preferences-updated', applyStoredPreferences)
})

onBeforeUnmount(() => {
  window.removeEventListener('user-preferences-updated', applyStoredPreferences)
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
          <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/dashboard">
            <span class="material-symbols-outlined text-[22px]">dashboard</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navDashboard') }}</span>
          </router-link>
          <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/transactions">
            <span class="material-symbols-outlined text-[22px]">receipt_long</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navTransactions') }}</span>
          </router-link>
          <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" to="/categories">
            <span class="material-symbols-outlined text-[22px]">label</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navCategories') }}</span>
          </router-link>
          <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/settings">
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
              <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">{{ authUser?.name || t('userDefault') }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ authUser?.email || t('accountConnected') }}</p>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto flex flex-col">
        <header class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-5 md:px-8 py-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('pageTitle') }}</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('pageSubtitle') }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative w-full md:w-72">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  v-model="search"
                  class="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                  :placeholder="t('searchPlaceholder')"
                  type="text"
                />
              </div>
              <button class="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" type="button" @click="dark_light()">
                <span class="material-symbols-outlined dark:hidden">dark_mode</span>
                <span class="material-symbols-outlined hidden dark:block">light_mode</span>
              </button>
            </div>
          </div>
        </header>

        <div class="p-5 md:p-8 space-y-6 flex-1">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{{ t('pageTitle') }}</h3>
              <p class="text-slate-500 dark:text-slate-400 mt-2 text-lg">{{ t('pageSubtitle') }}</p>
            </div>
            <button
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
              type="button"
              @click="openCreateModal"
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span>{{ t('addCategory') }}</span>
            </button>
          </div>

          <p v-if="errorMessage" class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            {{ errorMessage }}
          </p>

          <div class="flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button class="rounded-full px-4 py-2 text-sm font-semibold" :class="activeTab === 'all' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'" type="button" @click="activeTab = 'all'">
              {{ t('all') }}
            </button>
            <button class="rounded-full px-4 py-2 text-sm font-semibold" :class="activeTab === 'with_transactions' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'" type="button" @click="activeTab = 'with_transactions'">
              {{ t('withTransactions') }}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-if="isLoading" class="col-span-full rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center text-slate-500 dark:text-slate-400">
              {{ t('loading') }}
            </div>

            <template v-else>
              <article
                v-for="category in activeCategories"
                :key="category.id"
                class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer"
                role="button"
                tabindex="0"
                @click="openCategoryDetails(category)"
                @keydown.enter.prevent="openCategoryDetails(category)"
                @keydown.space.prevent="openCategoryDetails(category)"
              >
                <div class="flex justify-between items-start mb-4">
                  <div
                    class="size-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    :style="{ backgroundColor: category.color_hex || '#94a3b8' }"
                  >
                    <span class="material-symbols-outlined text-2xl">{{ category.icon || 'label' }}</span>
                  </div>
                  <div class="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors" type="button" @click.stop="openEditModal(category)">
                      <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors disabled:opacity-60" type="button" :disabled="deletingId === category.id" @click.stop="deleteCategory(category.id)">
                      <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ category.name }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {{ category.transactions_count }} {{ t('transactionsLabel') }}
                  </span>
                  <span class="text-xs text-slate-400 dark:text-slate-500">{{ category.color_hex || '#94a3b8' }}</span>
                </div>
              </article>
            </template>

            <div v-if="!isLoading && activeCategories.length === 0" class="col-span-full rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center text-slate-500 dark:text-slate-400">
              {{ t('empty') }}
            </div>

            <button
              class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 cursor-pointer group transition-all"
              type="button"
              @click="openCreateModal"
            >
              <div class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-3">
                <span class="material-symbols-outlined text-2xl">add</span>
              </div>
              <span class="text-sm font-bold text-slate-500 dark:text-slate-400">{{ t('addCategory') }}</span>
            </button>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-30 grid place-items-center bg-slate-900/50 p-4">
      <div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h4 class="text-xl font-bold text-slate-900 dark:text-white">{{ editingCategoryId ? t('formEditTitle') : t('formCreateTitle') }}</h4>

        <p v-if="formErrorMessage" class="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          {{ formErrorMessage }}
        </p>

        <form class="mt-4 grid gap-4" @submit.prevent="saveCategory">
          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formName') }}</span>
            <input
              v-model="categoryForm.name"
              required
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 dark:text-white text-sm dark:border-slate-700 dark:bg-slate-800"
              type="text"
            />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formColor') }}</span>
            <input
              v-model="categoryForm.color_hex"
              class="h-11 w-24 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800"
              type="color"
            />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('formIcon') }}</span>
            <div class="flex items-center gap-2 mb-2">
              <div class="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-lg text-slate-600 dark:text-slate-300">{{ categoryForm.selectedIcon }}</span>
              </div>
              <select
                v-model="categoryForm.selectedIcon"
                class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:text-white dark:border-slate-700 dark:bg-slate-800"
              >
                <option
                  v-for="option in categoryIconOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </label>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in categoryPalette"
              :key="color"
              class="size-9 rounded-full border-2 transition-transform hover:scale-105"
              :class="categoryForm.color_hex === color ? 'border-slate-900 dark:border-white' : 'border-transparent'"
              :style="{ backgroundColor: color }"
              type="button"
              @click="categoryForm.color_hex = color"
            />
          </div>

          <div class="mt-2 flex justify-end gap-3">
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
              {{ editingCategoryId ? t('formSaveEdit') : t('formSaveCreate') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isDetailsModalOpen" class="fixed inset-0 z-40 grid place-items-center bg-slate-900/50 p-4" @click.self="closeDetailsModal">
      <div class="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex items-center gap-3">
              <div
                class="size-10 rounded-xl flex items-center justify-center text-white"
                :style="{ backgroundColor: detailsCategory?.color_hex || '#94a3b8' }"
              >
                <span class="material-symbols-outlined">{{ detailsCategory?.icon || 'label' }}</span>
              </div>
              <div class="min-w-0">
                <h4 class="text-lg font-bold text-slate-900 dark:text-white truncate">{{ detailsCategory?.name || t('detailsTitle') }}</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('detailsSubtitle') }}</p>
              </div>
            </div>
          </div>
          <button
            class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            type="button"
            @click="closeDetailsModal"
          >
            {{ t('close') }}
          </button>
        </div>

        <div class="p-5 overflow-y-auto max-h-[calc(90vh-73px)] space-y-4">
          <p v-if="detailsErrorMessage" class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            {{ detailsErrorMessage }}
          </p>

          <div v-if="isDetailsLoading" class="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center text-slate-500 dark:text-slate-400">
            {{ t('detailsLoading') }}
          </div>

          <template v-else>


            <div class="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                    <tr>
                      <th class="px-4 py-3 text-left font-semibold">{{ t('tableDate') }}</th>
                      <th class="px-4 py-3 text-left font-semibold">{{ t('tableDescription') }}</th>
                      <th class="px-4 py-3 text-left font-semibold">{{ t('tableType') }}</th>
                      <th class="px-4 py-3 text-right font-semibold">{{ t('tableAmount') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="transaction in detailsTransactions"
                      :key="transaction.id"
                      class="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td class="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ formatDate(transaction.occurred_at) }}</td>
                      <td class="px-4 py-3 text-slate-800 dark:text-slate-100">{{ transaction.description || '-' }}</td>
                      <td class="px-4 py-3 text-slate-500 dark:text-slate-400">{{ transactionTypeLabel(transaction.type) }}</td>
                      <td class="px-4 py-3 text-right font-semibold" :class="transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                        {{ signedAmount(transaction.amount, transaction.type) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p v-if="detailsTransactions.length === 0" class="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                {{ t('detailsEmpty') }}
              </p>

              <div class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ detailsPagination.total }} {{ t('transactionsLabel') }}</p>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300 disabled:opacity-50"
                    :disabled="detailsPagination.current_page <= 1"
                    @click="goToDetailsPage(detailsPagination.current_page - 1)"
                  >
                    {{ t('prev') }}
                  </button>
                  <button
                    type="button"
                    class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300 disabled:opacity-50"
                    :disabled="detailsPagination.current_page >= detailsPagination.last_page"
                    @click="goToDetailsPage(detailsPagination.current_page + 1)"
                  >
                    {{ t('next') }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
