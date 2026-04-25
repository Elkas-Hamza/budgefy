<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { showToast } = useToast()

const authUser = ref(null)
const isSidebarCollapsed = ref(false)
const isLoading = ref(false)
const isSavingProfile = ref(false)
const isSavingPreferences = ref(false)
const infoMessage = ref('')
const errorMessage = ref('')
const profileImageInput = ref(null)
const profileImageFile = ref(null)
const hasLoadedPreferences = ref(false)

const dark_light = window.dark_light ?? (() => {})

const profileForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  image: '',
})

const preferencesForm = reactive({
  currency: 'EUR',
  language: 'FR',
  autoDark: false,
  emailNotifications: true,
})

const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP']
const SUPPORTED_LANGUAGES = ['FR', 'EN', 'AR']

const translations = {
  FR: {
    navDashboard: 'Tableau de bord',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Parametres',
    userDefault: 'Utilisateur',
    accountConnected: 'Compte connecte',
    pageTitle: 'Parametres',
    pageSubtitle: 'Gerez votre compte et vos preferences',
    sideTitle: 'Parametres',
    sideSubtitle: 'Gerez votre compte et vos preferences',
    tabProfile: 'Profil',
    tabPreferences: 'Preferences',
    tabSecurity: 'Securite',
    tabNotifications: 'Notifications',
    tabSubscription: 'Abonnement',
    helpTitle: "Besoin d'aide ?",
    helpDescription: "Consultez notre centre d'aide ou contactez le support.",
    logout: 'Se deconnecter',
    profileTitle: 'Mon Profil',
    profileDescription: 'Informations personnelles publiques et privees',
    save: 'Enregistrer',
    firstName: 'Prenom',
    lastName: 'Nom de famille',
    email: 'Email',
    profilePhoto: 'Photo de profil',
    chooseImage: 'Choisir une image (PNG, JPG, WEBP)',
    removeImage: "Retirer l'image",
    imageHelp: 'Taille maximale: 4MB. Formats acceptes: PNG, JPG, JPEG, WEBP.',
    preferencesTitle: "Preferences de l'application",
    preferencesDescription: 'Personnalisez votre experience utilisateur',
    primaryCurrency: 'Devise principale',
    currencyHelp: 'Utilisee pour vos rapports et totaux',
    currencyEuro: 'Euro (EUR)',
    currencyDollar: 'Dollar (USD)',
    currencyPound: 'Livre (GBP)',
    language: 'Langue',
    languageHelp: 'Interface utilisateur',
    darkMode: 'Mode Sombre',
    darkModeHelp: 'Activer le theme sombre automatiquement',
    emailNotifications: 'Notifications Email',
    emailNotificationsHelp: 'Recevoir les alertes budget par email',
    savePreferences: 'Sauvegarder les preferences',
    securityTitle: 'Securite',
    securityDescription: "Gerez l'acces a votre compte financier",
    password: 'Mot de passe',
    passwordHint: 'Derniere modification il y a 3 mois. Utilisez un mot de passe robuste.',
    changePassword: 'Changer le mot de passe',
    twoFactor: 'Double Authentification (2FA)',
    twoFactorHint: 'Renforcez la securite avec un code envoye sur votre mobile.',
    enabled: 'Active',
    dangerZone: 'Zone de danger',
    dangerHint: 'Suppression definitive de votre compte et de toutes vos donnees.',
    deleteAccount: 'Supprimer le compte',
    footer: '© 2026 Gestion Budgetaire Personnelle. Tous droits reserves.',
    errLoadProfile: 'Impossible de charger votre profil.',
    errUnexpected: 'Une erreur inattendue est survenue.',
    errRequired: "Le prenom et l'email sont obligatoires.",
    errSaveProfile: "Impossible d'enregistrer le profil.",
    errNoUserReturned: 'Aucune donnee utilisateur retournee par le serveur.',
    successProfileSaved: 'Profil mis a jour avec succes.',
    successPreferencesSaved: 'Preferences enregistrees avec succes.',
    errSavePreferences: "Impossible d'enregistrer les preferences.",
  },
  EN: {
    navDashboard: 'Dashboard',
    navTransactions: 'Transactions',
    navCategories: 'Categories',
    navSettings: 'Settings',
    userDefault: 'User',
    accountConnected: 'Signed in account',
    pageTitle: 'Settings',
    pageSubtitle: 'Manage your account and preferences',
    sideTitle: 'Settings',
    sideSubtitle: 'Manage your account and preferences',
    tabProfile: 'Profile',
    tabPreferences: 'Preferences',
    tabSecurity: 'Security',
    tabNotifications: 'Notifications',
    tabSubscription: 'Subscription',
    helpTitle: 'Need help?',
    helpDescription: 'Visit our help center or contact support.',
    logout: 'Sign out',
    profileTitle: 'My Profile',
    profileDescription: 'Public and private personal information',
    save: 'Save',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    profilePhoto: 'Profile photo',
    chooseImage: 'Choose an image (PNG, JPG, WEBP)',
    removeImage: 'Remove image',
    imageHelp: 'Maximum size: 4MB. Accepted formats: PNG, JPG, JPEG, WEBP.',
    preferencesTitle: 'Application preferences',
    preferencesDescription: 'Personalize your user experience',
    primaryCurrency: 'Primary currency',
    currencyHelp: 'Used for your reports and totals',
    currencyEuro: 'Euro (EUR)',
    currencyDollar: 'Dollar (USD)',
    currencyPound: 'Pound (GBP)',
    language: 'Language',
    languageHelp: 'User interface',
    darkMode: 'Dark mode',
    darkModeHelp: 'Enable dark theme automatically',
    emailNotifications: 'Email notifications',
    emailNotificationsHelp: 'Receive budget alerts by email',
    savePreferences: 'Save preferences',
    securityTitle: 'Security',
    securityDescription: 'Manage access to your financial account',
    password: 'Password',
    passwordHint: 'Last updated 3 months ago. Use a strong password.',
    changePassword: 'Change password',
    twoFactor: 'Two-Factor Authentication (2FA)',
    twoFactorHint: 'Increase security with a code sent to your phone.',
    enabled: 'Enabled',
    dangerZone: 'Danger zone',
    dangerHint: 'Permanently delete your account and all your data.',
    deleteAccount: 'Delete account',
    footer: '© 2026 Personal Budget Management. All rights reserved.',
    errLoadProfile: 'Unable to load your profile.',
    errUnexpected: 'An unexpected error occurred.',
    errRequired: 'First name and email are required.',
    errSaveProfile: 'Unable to save profile.',
    errNoUserReturned: 'No user data returned by the server.',
    successProfileSaved: 'Profile updated successfully.',
    successPreferencesSaved: 'Preferences saved successfully.',
    errSavePreferences: 'Unable to save preferences.',
  },
  AR: {
    navDashboard: 'لوحة التحكم',
    navTransactions: 'المعاملات',
    navCategories: 'الفئات',
    navSettings: 'الإعدادات',
    userDefault: 'مستخدم',
    accountConnected: 'حساب متصل',
    pageTitle: 'الإعدادات',
    pageSubtitle: 'إدارة الحساب والتفضيلات',
    sideTitle: 'الإعدادات',
    sideSubtitle: 'إدارة الحساب والتفضيلات',
    tabProfile: 'الملف الشخصي',
    tabPreferences: 'التفضيلات',
    tabSecurity: 'الأمان',
    tabNotifications: 'الإشعارات',
    tabSubscription: 'الاشتراك',
    helpTitle: 'تحتاج مساعدة؟',
    helpDescription: 'راجع مركز المساعدة أو تواصل مع الدعم.',
    logout: 'تسجيل الخروج',
    profileTitle: 'ملفي الشخصي',
    profileDescription: 'معلومات شخصية عامة وخاصة',
    save: 'حفظ',
    firstName: 'الاسم الاول',
    lastName: 'اسم العائلة',
    email: 'البريد الالكتروني',
    profilePhoto: 'صورة الملف الشخصي',
    chooseImage: 'اختر صورة (PNG, JPG, WEBP)',
    removeImage: 'إزالة الصورة',
    imageHelp: 'الحد الاقصى 4MB. الصيغ المقبولة: PNG, JPG, JPEG, WEBP.',
    preferencesTitle: 'تفضيلات التطبيق',
    preferencesDescription: 'خصص تجربة الاستخدام',
    primaryCurrency: 'العملة الاساسية',
    currencyHelp: 'تستخدم في التقارير والاجماليات',
    currencyEuro: 'يورو (EUR)',
    currencyDollar: 'دولار (USD)',
    currencyPound: 'جنيه (GBP)',
    language: 'اللغة',
    languageHelp: 'واجهة المستخدم',
    darkMode: 'الوضع الداكن',
    darkModeHelp: 'تفعيل المظهر الداكن تلقائيا',
    emailNotifications: 'اشعارات البريد',
    emailNotificationsHelp: 'استلام تنبيهات الميزانية عبر البريد',
    savePreferences: 'حفظ التفضيلات',
    securityTitle: 'الأمان',
    securityDescription: 'إدارة الوصول الى الحساب المالي',
    password: 'كلمة المرور',
    passwordHint: 'اخر تعديل منذ 3 اشهر. استخدم كلمة مرور قوية.',
    changePassword: 'تغيير كلمة المرور',
    twoFactor: 'التحقق بخطوتين (2FA)',
    twoFactorHint: 'عزز الامان برمز يرسل الى هاتفك.',
    enabled: 'مفعل',
    dangerZone: 'منطقة الخطر',
    dangerHint: 'حذف الحساب وجميع البيانات بشكل نهائي.',
    deleteAccount: 'حذف الحساب',
    footer: '© 2026 إدارة الميزانية الشخصية. جميع الحقوق محفوظة.',
    errLoadProfile: 'تعذر تحميل الملف الشخصي.',
    errUnexpected: 'حدث خطأ غير متوقع.',
    errRequired: 'الاسم الاول والبريد الالكتروني مطلوبان.',
    errSaveProfile: 'تعذر حفظ الملف الشخصي.',
    errNoUserReturned: 'لم يتم ارجاع بيانات المستخدم من الخادم.',
    successProfileSaved: 'تم تحديث الملف الشخصي بنجاح.',
    successPreferencesSaved: 'تم حفظ التفضيلات بنجاح.',
    errSavePreferences: 'تعذر حفظ التفضيلات.',
  },
}

const currentLanguage = computed(() =>
  SUPPORTED_LANGUAGES.includes(preferencesForm.language) ? preferencesForm.language : 'FR',
)

const t = (key) => translations[currentLanguage.value]?.[key] ?? translations.FR[key] ?? key

const applyProfileFormFromUser = (user) => {
  const fullName = String(user?.name ?? '').trim()
  const nameParts = fullName.split(/\s+/).filter(Boolean)
  const firstName = nameParts.shift() ?? ''
  const lastName = nameParts.join(' ')

  profileForm.firstName = firstName
  profileForm.lastName = lastName
  profileForm.email = String(user?.email ?? '')
  profileForm.image = String(user?.image ?? '')
  profileImageFile.value = null
}

const onProfileImageSelected = (event) => {
  const file = event?.target?.files?.[0] ?? null

  if (!file) {
    return
  }

  profileImageFile.value = file
  profileForm.image = URL.createObjectURL(file)
}

const triggerProfileImagePicker = () => {
  profileImageInput.value?.click()
}

const removeProfileImage = () => {
  profileImageFile.value = null
  profileForm.image = ''

  if (profileImageInput.value) {
    profileImageInput.value.value = ''
  }
}

const clearSessionAndRedirectToLogin = async () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  await router.replace('/login')
}

const apiBaseUrl = () => (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const loadPreferences = () => {
  const rawPreferences = localStorage.getItem('user_preferences')

  if (!rawPreferences) {
    return
  }

  try {
    const parsed = JSON.parse(rawPreferences)
    const parsedCurrency = String(parsed?.currency ?? '')
    const parsedLanguage = String(parsed?.language ?? '')

    preferencesForm.currency = SUPPORTED_CURRENCIES.includes(parsedCurrency)
      ? parsedCurrency
      : preferencesForm.currency
    preferencesForm.language = SUPPORTED_LANGUAGES.includes(parsedLanguage)
      ? parsedLanguage
      : preferencesForm.language
    preferencesForm.autoDark = Boolean(parsed?.autoDark)
    preferencesForm.emailNotifications = parsed?.emailNotifications ?? true
  } catch {
    localStorage.removeItem('user_preferences')
  }
}

const persistPreferences = () => {
  localStorage.setItem(
    'user_preferences',
    JSON.stringify({
      currency: preferencesForm.currency,
      language: preferencesForm.language,
      autoDark: preferencesForm.autoDark,
      emailNotifications: preferencesForm.emailNotifications,
    }),
  )
}

const applyDarkPreference = () => {
  const html = document.documentElement

  if (preferencesForm.autoDark) {
    // Force dark while auto-dark is enabled without overriding manual mode preference.
    html.classList.add('dark')
    return
  }

  const savedMode = localStorage.getItem('mode')
  dark_light(savedMode === 'dark' ? 'dark' : 'light')
}

const applyLanguagePreference = () => {
  const html = document.documentElement
  const languageToLocale = {
    FR: 'fr',
    EN: 'en',
    AR: 'ar',
  }

  html.lang = languageToLocale[preferencesForm.language] ?? 'fr'
  html.dir = preferencesForm.language === 'AR' ? 'rtl' : 'ltr'
}

const applyPreferenceSideEffects = () => {
  applyDarkPreference()
  applyLanguagePreference()
}

const notifyPreferencesUpdated = () => {
  window.dispatchEvent(
    new CustomEvent('user-preferences-updated', {
      detail: {
        currency: preferencesForm.currency,
        language: preferencesForm.language,
        autoDark: preferencesForm.autoDark,
        emailNotifications: preferencesForm.emailNotifications,
      },
    }),
  )
}

watch(
  () => [
    preferencesForm.currency,
    preferencesForm.language,
    preferencesForm.autoDark,
    preferencesForm.emailNotifications,
  ],
  () => {
    if (!hasLoadedPreferences.value) {
      return
    }

    persistPreferences()
    applyPreferenceSideEffects()
    notifyPreferencesUpdated()
  },
)

const loadUser = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  isLoading.value = true

  const token = localStorage.getItem('auth_token')

  if (!token) {
    isLoading.value = false
    await router.replace('/login')
    return
  }

  const rawUser = localStorage.getItem('auth_user')

  if (rawUser) {
    try {
      authUser.value = JSON.parse(rawUser)
      applyProfileFormFromUser(authUser.value)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/api/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      if (response.status === 401) {
        await clearSessionAndRedirectToLogin()
        return
      }

      throw new Error(data?.message ?? t('errLoadProfile'))
    }

    const user = data?.user ?? null

    if (user) {
      authUser.value = user
      localStorage.setItem('auth_user', JSON.stringify(user))
      applyProfileFormFromUser(user)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errUnexpected')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  isSavingProfile.value = true

  try {
    const firstName = profileForm.firstName.trim()
    const lastName = profileForm.lastName.trim()
    const email = profileForm.email.trim()
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    if (!firstName || !email) {
      throw new Error(t('errRequired'))
    }

    const body = new FormData()
    body.append('name', `${firstName} ${lastName}`.trim())
    body.append('email', email)

    if (profileImageFile.value) {
      body.append('image', profileImageFile.value)
    } else if (!profileForm.image && authUser.value?.image) {
      body.append('remove_image', '1')
    }

    const response = await fetch(`${apiBaseUrl()}/api/auth/profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      if (response.status === 401) {
        await clearSessionAndRedirectToLogin()
        return
      }

      throw new Error(data?.message ?? t('errSaveProfile'))
    }

    const updatedUser = data?.user

    if (!updatedUser) {
      throw new Error(t('errNoUserReturned'))
    }

    authUser.value = updatedUser
    localStorage.setItem('auth_user', JSON.stringify(updatedUser))
    applyProfileFormFromUser(updatedUser)
    showToast(t('successProfileSaved'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errSaveProfile')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isSavingProfile.value = false
  }
}

const savePreferences = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  isSavingPreferences.value = true

  try {
    persistPreferences()

    applyPreferenceSideEffects()
    notifyPreferencesUpdated()

    infoMessage.value = t('successPreferencesSaved')
    showToast(t('successPreferencesSaved'))
  } catch {
    errorMessage.value = t('errSavePreferences')
    showToast(t('errSavePreferences'), 'error')
  } finally {
    isSavingPreferences.value = false
  }
}

const logout = async () => {
  const token = localStorage.getItem('auth_token')

  if (token) {
    try {
      await fetch(`${apiBaseUrl()}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
    }
  }

  await clearSessionAndRedirectToLogin()
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onMounted(async () => {
  loadPreferences()
  applyPreferenceSideEffects()
  hasLoadedPreferences.value = true
  await loadUser()
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
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">{{ t('navSettings') }}</span>
          </router-link>
        </nav>
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
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('pageSubtitle') }}</p>
            </div>

            <div class="flex items-center gap-3">
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
      <div class="flex flex-col lg:flex-row gap-10">
        <aside class="w-full lg:w-64 flex flex-col gap-2">
          <div class="mb-6">
            <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{{ t('sideTitle') }}</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              {{ t('sideSubtitle') }}
            </p>
          </div>
          <nav class="flex flex-col gap-1">
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20"
              href="#profil"
            >
              <span class="material-symbols-outlined">person</span>
              <span>{{ t('tabProfile') }}</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#preferences"
            >
              <span class="material-symbols-outlined">settings</span>
              <span>{{ t('tabPreferences') }}</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#securite"
            >
              <span class="material-symbols-outlined">shield</span>
              <span>{{ t('tabSecurity') }}</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#notifications"
            >
              <span class="material-symbols-outlined"
                >notifications_active</span
              >
              <span>{{ t('tabNotifications') }}</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#abonnement"
            >
              <span class="material-symbols-outlined">credit_card</span>
              <span>{{ t('tabSubscription') }}</span>
            </a>
          </nav>
          <div
            class="mt-10 p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <p
              class="text-xs font-bold text-primary uppercase tracking-wider mb-2"
            >
              {{ t('helpTitle') }}
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {{ t('helpDescription') }}
            </p>
            <button
              class="w-full py-2 bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors"
              type="button"
              @click="logout"
            >
              {{ t('logout') }}
            </button>
          </div>
        </aside>
        <div class="flex-1 flex flex-col gap-12">
          <section
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
            id="profil"
          >
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('profileTitle') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm">
                  {{ t('profileDescription') }}
                </p>
              </div>
              <button
                class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                :disabled="isLoading || isSavingProfile"
                type="button"
                @click="saveProfile"
              >
                {{ t('save') }}
              </button>
            </div>
            <p v-if="errorMessage" class="mb-4 rounded-lg bg-rose-100 text-rose-700 px-4 py-2 text-sm">
              {{ errorMessage }}
            </p>
            <p v-if="infoMessage" class="mb-4 rounded-lg bg-emerald-100 text-emerald-700 px-4 py-2 text-sm">
              {{ infoMessage }}
            </p>
            <div class="flex flex-col md:flex-row gap-8 items-start">
                <div class="relative group">
                  <input
                    ref="profileImageInput"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    class="hidden"
                    @change="onProfileImageSelected"
                  />
                  <div
                    class="size-32 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 overflow-hidden grid place-items-center"
                    data-alt="Photo de profil détaillée"
                  >
                    <img
                      v-if="profileForm.image"
                      :src="profileForm.image"
                      alt="Photo de profil"
                      class="h-full w-full object-cover"
                    />
                    <span v-else class="material-symbols-outlined text-5xl text-slate-500 dark:text-slate-400">person</span>
                  </div>
                <button
                  class="absolute bottom-0 right-0 size-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 hover:scale-110 transition-transform"
                    type="button"
                    @click="triggerProfileImagePicker"
                >
                  <span class="material-symbols-outlined text-base"
                    >photo_camera</span
                  >
                </button>
              </div>
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div class="flex flex-col gap-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >{{ t('firstName') }}</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="text"
                    v-model="profileForm.firstName"
                    :disabled="isLoading"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >{{ t('lastName') }}</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="text"
                    v-model="profileForm.lastName"
                    :disabled="isLoading"
                  />
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >{{ t('email') }}</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="email"
                    v-model="profileForm.email"
                    :disabled="isLoading"
                  />
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >{{ t('profilePhoto') }}</label
                  >
                  <div class="flex flex-wrap items-center gap-3">
                    <button
                      class="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                      type="button"
                      :disabled="isLoading"
                      @click="triggerProfileImagePicker"
                    >
                      {{ t('chooseImage') }}
                    </button>
                    <button
                      v-if="profileForm.image"
                      class="px-4 py-2 border border-rose-300 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors"
                      type="button"
                      :disabled="isLoading"
                      @click="removeProfileImage"
                    >
                      {{ t('removeImage') }}
                    </button>
                  </div>
                  <p class="text-xs text-slate-500">{{ t('imageHelp') }}</p>
                </div>
              </div>
            </div>
          </section>
          <section
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
            id="preferences"
          >
            <div class="mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('preferencesTitle') }}</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                {{ t('preferencesDescription') }}
              </p>
            </div>
            <div class="space-y-6">
              <div
                class="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400"
                  >
                    <span class="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ t('primaryCurrency') }}</p>
                    <p class="text-xs text-slate-500">
                      {{ t('currencyHelp') }}
                    </p>
                  </div>
                </div>
                <select
                  class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px] text-slate-900 dark:text-white"
                  v-model="preferencesForm.currency"
                >
                  <option value="EUR">{{ t('currencyEuro') }}</option>
                  <option value="USD">{{ t('currencyDollar') }}</option>
                  <option value="GBP">{{ t('currencyPound') }}</option>
                </select>
              </div>
              <div
                class="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400"
                  >
                    <span class="material-symbols-outlined">language</span>
                  </div>
                  <div>
                    <p class="font-semibold  text-slate-900 dark:text-white">{{ t('language') }}</p>
                    <p class="text-xs text-slate-500">{{ t('languageHelp') }}</p>
                  </div>
                </div>
                <select
                  class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px] text-slate-900 dark:text-white"
                  v-model="preferencesForm.language"
                >
                  <option value="FR">Français</option>
                  <option value="EN">English</option>
                  <option value="AR">العربية</option>
                </select>
              </div>
              <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-4">
                  <div
                    class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400"
                  >
                    <span class="material-symbols-outlined">dark_mode</span>
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ t('darkMode') }}</p>
                    <p class="text-xs text-slate-500">
                      {{ t('darkModeHelp') }}
                    </p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="preferencesForm.autoDark" class="sr-only peer" type="checkbox" />
                  <div
                    class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-lg dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                  ></div>
                </label>
              </div>
              <div class="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">{{ t('emailNotifications') }}</p>
                  <p class="text-xs text-slate-500">{{ t('emailNotificationsHelp') }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="preferencesForm.emailNotifications" class="sr-only peer" type="checkbox" />
                  <div
                    class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-lg dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                  ></div>
                </label>
              </div>
              <div class="pt-2 flex justify-end">
                <button
                  class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                  :disabled="isSavingPreferences"
                  type="button"
                  @click="savePreferences"
                >
                  {{ t('savePreferences') }}
                </button>
              </div>
            </div>
          </section>
          <section
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
            id="securite"
          >
            <div class="mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('securityTitle') }}</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                {{ t('securityDescription') }}
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-primary"
                    >key</span
                  >
                  <h3 class="font-bold text-slate-900 dark:text-white">{{ t('password') }}</h3>
                </div>
                <p class="text-sm text-slate-500 mb-4">
                  {{ t('passwordHint') }}
                </p>
                <button
                  class="w-full py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  {{ t('changePassword') }}
                </button>
              </div>
              <div
                class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-green-500"
                    >verified_user</span
                  >
                  <h3 class="font-bold text-slate-900 dark:text-white">{{ t('twoFactor') }}</h3>
                </div>
                <p class="text-sm text-slate-500 mb-4">
                  {{ t('twoFactorHint') }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-green-500 uppercase"
                    >{{ t('enabled') }}</span
                  >
                  <button
                    class="text-sm text-primary font-bold hover:underline"
                    type="button"
                    @click="logout"
                  >
                    {{ t('logout') }}
                  </button>
                </div>
              </div>
            </div>
            <div
              class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-red-500">{{ t('dangerZone') }}</h3>
                  <p class="text-sm text-slate-500">
                    {{ t('dangerHint') }}
                  </p>
                </div>
                <button
                  class="px-6 py-2.5 border-2 border-red-500/20 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  {{ t('deleteAccount') }}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
        </div>
        <footer class="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>{{ t('footer') }}</p>
        </footer>
      </main>
    </div>
  </div>
</template>
