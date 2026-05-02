<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { showToast } = useToast()

const authUser = ref(null)
const isSidebarCollapsed = ref(false)
const isLoading = ref(false)
const isSavingProfile = ref(false)
const isProfileDialogOpen = ref(false)
const isEmailDialogOpen = ref(false)
const isPasswordDialogOpen = ref(false)
const isPasswordChangeSuccessDialogOpen = ref(false)
const isSavingPreferences = ref(false)
const isSendingVerificationEmail = ref(false)
const isSavingEmail = ref(false)
const isChangingPassword = ref(false)
const isDeletingAccount = ref(false)
const isWaitingDeletionVerification = ref(false)
const isDeletionCompleted = ref(false)
const isDeleteDialogOpen = ref(false)
const deletionDialogMessage = ref('')
const deletionVerificationPollerId = ref(null)
const verifyButtonCooldownSeconds = ref(0)
const verifyButtonTimerId = ref(null)
const infoMessage = ref('')
const errorMessage = ref('')
const profileImageInput = ref(null)
const profileImageFile = ref(null)
const hasLoadedPreferences = ref(false)

const dark_light = window.dark_light ?? (() => {})

const profileDraft = reactive({
  firstName: '',
  lastName: '',
  image: '',
})

const emailDraft = reactive({
  email: '',
})

const passwordDraft = reactive({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
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
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    passwordChangeModalTitle: 'Changer le mot de passe',
    passwordChangeDescription: 'Pour securiser votre compte, confirmez votre mot de passe actuel puis entrez un nouveau mot de passe.',
    savePassword: 'Mettre a jour le mot de passe',
    successPasswordChanged: 'Mot de passe modifie avec succes.',
    passwordChangeSuccess: 'Votre mot de passe a ete modifie avec succes.',
    passwordChangeSecurityNotice: 'Pour votre securite, vous allez etre deconnecte. Veuillez vous reconnecter avec votre nouveau mot de passe.',
    returnToSettings: 'Retourner aux parametres',
    logoutAndSignIn: 'Se deconnecter et se reconnecter',
    errCurrentPasswordRequired: 'Le mot de passe actuel est obligatoire.',
    errNewPasswordRequired: 'Le nouveau mot de passe est obligatoire.',
    errNewPasswordTooShort: 'Le nouveau mot de passe doit contenir au moins 8 caracteres.',
    errPasswordConfirmationMismatch: 'La confirmation du nouveau mot de passe ne correspond pas.',
    errChangePassword: 'Impossible de modifier le mot de passe.',
    twoFactor: 'Double Authentification (2FA)',
    twoFactorHint: 'Renforcez la securite avec un code envoye sur votre mobile.',
    enabled: 'Active',
    dangerZone: 'Zone de danger',
    dangerHint: 'Suppression definitive de votre compte et de toutes vos donnees.',
    deleteAccount: 'Supprimer le compte',
    deleteAccountModalTitle: 'Confirmer la suppression du compte',
    confirmDeleteAccount: 'Voulez-vous vraiment supprimer votre compte ? Cette action est irreversible.',
    deleteAccountEmailPending: 'Envoi de l\'email de confirmation en cours...',
    deleteAccountEmailSent: 'Email envoye. Ouvrez votre boite mail et confirmez depuis le lien.',
    deleteAccountWaiting: 'En attente de confirmation...',
    deleteAccountConfirmed: 'Confirmation recue. Suppression du compte...',
    deleteAccountSuccessTitle: 'Compte supprime avec succes',
    deleteAccountSuccessMessage: 'Votre compte a ete supprime. Vous pouvez revenir a la page d\'accueil quand vous le souhaitez.',
    requestDeleteAccount: 'Envoyer email de confirmation',
    deletingAccount: 'Suppression en cours...',
    successAccountDeleted: 'Compte supprime avec succes.',
    errDeleteAccountRequest: 'Impossible d\'envoyer l\'email de confirmation de suppression.',
    errDeleteAccount: 'Impossible de supprimer le compte.',
    footer: '© 2026 Gestion Budgetaire Personnelle. Tous droits reserves.',
    errLoadProfile: 'Impossible de charger votre profil.',
    errUnexpected: 'Une erreur inattendue est survenue.',
    errRequired: "Le prenom et l'email sont obligatoires.",
    errSaveProfile: "Impossible d'enregistrer le profil.",
    errNoUserReturned: 'Aucune donnee utilisateur retournee par le serveur.',
    successProfileSaved: 'Profil mis a jour avec succes.',
    successPreferencesSaved: 'Preferences enregistrees avec succes.',
    errSavePreferences: "Impossible d'enregistrer les preferences.",
    modifyProfile: 'Modifier le profil',
    modifyEmail: "Modifier l'email",
    saveEmail: "Enregistrer l'email",
    saveProfileChanges: 'Enregistrer les modifications',
    cancel: 'Annuler',
    errEmailRequired: "L'email est obligatoire.",
    errSaveEmail: "Impossible d'enregistrer l'email.",
    emailVerificationTitle: 'Verification de votre email requise',
    emailVerificationHint:
      "Votre adresse email n'est pas encore verifiee. Merci de verifier votre boite mail.",
    emailVerificationSend: 'Renvoyer le lien de verification',
    emailVerificationSent: 'Email de verification envoye. Verifiez votre boite mail.',
    emailVerificationRefresh: 'Verifier le statut',
    emailVerifiedBadge: 'Email verifie',
    errEmailVerificationSend: "Impossible d'envoyer l'email de verification.",
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
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    passwordChangeModalTitle: 'Change password',
    passwordChangeDescription: 'For your account security, confirm your current password then enter a new one.',
    savePassword: 'Update password',
    successPasswordChanged: 'Password changed successfully.',
    passwordChangeSuccess: 'Your password has been changed successfully.',
    passwordChangeSecurityNotice: 'For your security, you will be logged out. Please sign in again with your new password.',
    returnToSettings: 'Return to settings',
    logoutAndSignIn: 'Logout and sign in',
    errCurrentPasswordRequired: 'Current password is required.',
    errNewPasswordRequired: 'New password is required.',
    errNewPasswordTooShort: 'New password must be at least 8 characters long.',
    errPasswordConfirmationMismatch: 'New password confirmation does not match.',
    errChangePassword: 'Unable to change password.',
    twoFactor: 'Two-Factor Authentication (2FA)',
    twoFactorHint: 'Increase security with a code sent to your phone.',
    enabled: 'Enabled',
    dangerZone: 'Danger zone',
    dangerHint: 'Permanently delete your account and all your data.',
    deleteAccount: 'Delete account',
    deleteAccountModalTitle: 'Confirm account deletion',
    confirmDeleteAccount: 'Are you sure you want to delete your account? This action cannot be undone.',
    deleteAccountEmailPending: 'Sending confirmation email...',
    deleteAccountEmailSent: 'Email sent. Open your inbox and confirm from the link.',
    deleteAccountWaiting: 'Waiting for confirmation...',
    deleteAccountConfirmed: 'Confirmation received. Deleting account...',
    deleteAccountSuccessTitle: 'Account deleted successfully',
    deleteAccountSuccessMessage: 'Your account has been deleted. You can return to the home page anytime.',
    requestDeleteAccount: 'Send confirmation email',
    deletingAccount: 'Deleting account...',
    successAccountDeleted: 'Account deleted successfully.',
    errDeleteAccountRequest: 'Unable to send deletion confirmation email.',
    errDeleteAccount: 'Unable to delete account.',
    footer: '© 2026 Personal Budget Management. All rights reserved.',
    errLoadProfile: 'Unable to load your profile.',
    errUnexpected: 'An unexpected error occurred.',
    errRequired: 'First name and email are required.',
    errSaveProfile: 'Unable to save profile.',
    errNoUserReturned: 'No user data returned by the server.',
    successProfileSaved: 'Profile updated successfully.',
    successPreferencesSaved: 'Preferences saved successfully.',
    errSavePreferences: 'Unable to save preferences.',
    modifyProfile: 'Edit profile',
    modifyEmail: 'Edit email',
    saveEmail: 'Save email',
    saveProfileChanges: 'Save changes',
    cancel: 'Cancel',
    errEmailRequired: 'Email is required.',
    errSaveEmail: 'Unable to save email.',
    emailVerificationTitle: 'Email verification required',
    emailVerificationHint:
      'Your email address is not verified yet. Please check your inbox.',
    emailVerificationSend: 'Resend verification email',
    emailVerificationSent: 'Verification email sent. Please check your inbox.',
    emailVerificationRefresh: 'Check status',
    emailVerifiedBadge: 'Email verified',
    errEmailVerificationSend: 'Unable to send verification email.',
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
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    passwordChangeModalTitle: 'تغيير كلمة المرور',
    passwordChangeDescription: 'لحماية حسابك، أكد كلمة المرور الحالية ثم ادخل كلمة مرور جديدة.',
    savePassword: 'تحديث كلمة المرور',
    successPasswordChanged: 'تم تغيير كلمة المرور بنجاح.',
    passwordChangeSuccess: 'تم تغيير كلمة المرور بنجاح.',
    passwordChangeSecurityNotice: 'لحمايتك، سيتم تسجيل خروجك. يرجى تسجيل الدخول مرة اخرى بكلمة المرور الجديدة.',
    returnToSettings: 'العودة الى الإعدادات',
    logoutAndSignIn: 'تسجيل الخروج وتسجيل الدخول',
    errCurrentPasswordRequired: 'كلمة المرور الحالية مطلوبة.',
    errNewPasswordRequired: 'كلمة المرور الجديدة مطلوبة.',
    errNewPasswordTooShort: 'يجب ان تكون كلمة المرور الجديدة 8 احرف على الاقل.',
    errPasswordConfirmationMismatch: 'تأكيد كلمة المرور الجديدة غير مطابق.',
    errChangePassword: 'تعذر تغيير كلمة المرور.',
    twoFactor: 'التحقق بخطوتين (2FA)',
    twoFactorHint: 'عزز الامان برمز يرسل الى هاتفك.',
    enabled: 'مفعل',
    dangerZone: 'منطقة الخطر',
    dangerHint: 'حذف الحساب وجميع البيانات بشكل نهائي.',
    deleteAccount: 'حذف الحساب',
    deleteAccountModalTitle: 'تأكيد حذف الحساب',
    confirmDeleteAccount: 'هل تريد بالتأكيد حذف الحساب؟ هذا الاجراء لا يمكن التراجع عنه.',
    deleteAccountEmailPending: 'جار ارسال بريد التاكيد...',
    deleteAccountEmailSent: 'تم ارسال البريد. افتح صندوق البريد واكد من الرابط.',
    deleteAccountWaiting: 'بانتظار التاكيد...',
    deleteAccountConfirmed: 'تم استلام التاكيد. جار حذف الحساب...',
    deleteAccountSuccessTitle: 'تم حذف الحساب بنجاح',
    deleteAccountSuccessMessage: 'تم حذف حسابك. يمكنك العودة الى الصفحة الرئيسية في اي وقت.',
    requestDeleteAccount: 'ارسال بريد التاكيد',
    deletingAccount: 'جار حذف الحساب...',
    successAccountDeleted: 'تم حذف الحساب بنجاح.',
    errDeleteAccountRequest: 'تعذر ارسال بريد تاكيد الحذف.',
    errDeleteAccount: 'تعذر حذف الحساب.',
    footer: '© 2026 إدارة الميزانية الشخصية. جميع الحقوق محفوظة.',
    errLoadProfile: 'تعذر تحميل الملف الشخصي.',
    errUnexpected: 'حدث خطأ غير متوقع.',
    errRequired: 'الاسم الاول والبريد الالكتروني مطلوبان.',
    errSaveProfile: 'تعذر حفظ الملف الشخصي.',
    errNoUserReturned: 'لم يتم ارجاع بيانات المستخدم من الخادم.',
    successProfileSaved: 'تم تحديث الملف الشخصي بنجاح.',
    successPreferencesSaved: 'تم حفظ التفضيلات بنجاح.',
    errSavePreferences: 'تعذر حفظ التفضيلات.',
    modifyProfile: 'تعديل الملف الشخصي',
    modifyEmail: 'تعديل البريد الالكتروني',
    saveEmail: 'حفظ البريد الالكتروني',
    saveProfileChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    errEmailRequired: 'البريد الالكتروني مطلوب.',
    errSaveEmail: 'تعذر حفظ البريد الالكتروني.',
    emailVerificationTitle: 'يلزم تاكيد البريد الالكتروني',
    emailVerificationHint: 'لم يتم تاكيد بريدك الالكتروني بعد. يرجى التحقق من صندوق البريد.',
    emailVerificationSend: 'اعادة ارسال رابط التحقق',
    emailVerificationSent: 'تم ارسال رسالة التحقق. تحقق من بريدك.',
    emailVerificationRefresh: 'تحقق من الحالة',
    emailVerifiedBadge: 'تم التحقق من البريد',
    errEmailVerificationSend: 'تعذر ارسال رسالة التحقق.',
  },
}

const currentLanguage = computed(() =>
  SUPPORTED_LANGUAGES.includes(preferencesForm.language) ? preferencesForm.language : 'FR',
)

const apiBaseUrl = () => (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function resolveImageUrl(image) {
  const value = String(image ?? '').trim()

  if (!value) {
    return ''
  }

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('blob:') ||
    value.startsWith('data:')
  ) {
    return value
  }

  const base = apiBaseUrl()

  if (!base) {
    return value
  }

  if (value.startsWith('/')) {
    return `${base}${value}`
  }

  return `${base}/${value}`
}

const isEmailVerified = computed(() => Boolean(authUser.value?.email_verified_at))
const displayName = computed(() => authUser.value?.name || t('userDefault'))
const displayEmail = computed(() => authUser.value?.email || t('accountConnected'))
const displayImage = computed(() => resolveImageUrl(authUser.value?.image))
const isVerifyButtonDisabled = computed(
  () => isSendingVerificationEmail.value || verifyButtonCooldownSeconds.value > 0,
)
const verifyButtonLabel = computed(() => {
  if (isSendingVerificationEmail.value) {
    return '...'
  }

  if (verifyButtonCooldownSeconds.value > 0) {
    return `${t('emailVerificationSend')} (${verifyButtonCooldownSeconds.value}s)`
  }

  return t('emailVerificationSend')
})

const t = (key) => translations[currentLanguage.value]?.[key] ?? translations.FR[key] ?? key

const syncProfileDraftFromUser = (user) => {
  const fullName = String(user?.name ?? '').trim()
  const nameParts = fullName.split(/\s+/).filter(Boolean)
  const firstName = nameParts.shift() ?? ''
  const lastName = nameParts.join(' ')

  profileDraft.firstName = firstName
  profileDraft.lastName = lastName
  profileDraft.image = resolveImageUrl(user?.image)
  profileImageFile.value = null
}

const syncEmailDraftFromUser = (user) => {
  emailDraft.email = String(user?.email ?? '')
}

const openProfileDialog = () => {
  syncProfileDraftFromUser(authUser.value)
  isProfileDialogOpen.value = true
}

const openEmailDialog = () => {
  syncEmailDraftFromUser(authUser.value)
  isEmailDialogOpen.value = true
}

const closeProfileDialog = () => {
  isProfileDialogOpen.value = false
}

const closeEmailDialog = () => {
  isEmailDialogOpen.value = false
}

const openPasswordDialog = () => {
  passwordDraft.currentPassword = ''
  passwordDraft.newPassword = ''
  passwordDraft.newPasswordConfirmation = ''
  isPasswordDialogOpen.value = true
}

const closePasswordDialog = () => {
  if (isChangingPassword.value) {
    return
  }

  isPasswordDialogOpen.value = false
}

const openDeleteDialog = () => {
  deletionDialogMessage.value = t('confirmDeleteAccount')
  isDeletionCompleted.value = false
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  if (isDeletingAccount.value || isWaitingDeletionVerification.value) {
    return
  }

  isDeletionCompleted.value = false
  isDeleteDialogOpen.value = false
}

const onProfileImageSelected = (event) => {
  const file = event?.target?.files?.[0] ?? null

  if (!file) {
    return
  }

  profileImageFile.value = file
  profileDraft.image = URL.createObjectURL(file)
}

const triggerProfileImagePicker = () => {
  profileImageInput.value?.click()
}

const removeProfileImage = () => {
  profileImageFile.value = null
  profileDraft.image = ''

  if (profileImageInput.value) {
    profileImageInput.value.value = ''
  }
}

const clearSessionAndRedirectToLogin = async () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  await router.replace('/login')
}

const clearSessionAndRedirectToLanding = async () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  await router.replace('/')
}

const clearVerifyButtonCooldown = () => {
  if (verifyButtonTimerId.value) {
    clearInterval(verifyButtonTimerId.value)
    verifyButtonTimerId.value = null
  }
}

const clearDeletionVerificationPoller = () => {
  if (deletionVerificationPollerId.value) {
    clearInterval(deletionVerificationPollerId.value)
    deletionVerificationPollerId.value = null
  }
}

const startVerifyButtonCooldown = (seconds = 30) => {
  clearVerifyButtonCooldown()
  verifyButtonCooldownSeconds.value = seconds

  verifyButtonTimerId.value = setInterval(() => {
    if (verifyButtonCooldownSeconds.value <= 1) {
      verifyButtonCooldownSeconds.value = 0
      clearVerifyButtonCooldown()
      return
    }

    verifyButtonCooldownSeconds.value -= 1
  }, 1000)
}

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
      syncProfileDraftFromUser(authUser.value)
      syncEmailDraftFromUser(authUser.value)
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
      syncProfileDraftFromUser(user)
      syncEmailDraftFromUser(user)
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
    const firstName = profileDraft.firstName.trim()
    const lastName = profileDraft.lastName.trim()
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    if (!firstName) {
      throw new Error(t('errRequired'))
    }

    const body = new FormData()
    body.append('name', `${firstName} ${lastName}`.trim())

    if (profileImageFile.value) {
      body.append('image', profileImageFile.value)
    } else if (!profileDraft.image && authUser.value?.image) {
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
    syncProfileDraftFromUser(updatedUser)
    syncEmailDraftFromUser(updatedUser)
    closeProfileDialog()
    showToast(t('successProfileSaved'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errSaveProfile')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isSavingProfile.value = false
  }
}

const saveEmail = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  isSavingEmail.value = true

  try {
    const email = emailDraft.email.trim()
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    if (!email) {
      throw new Error(t('errEmailRequired'))
    }

    const body = new FormData()
    body.append('email', email)

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

      throw new Error(data?.message ?? t('errSaveEmail'))
    }

    const updatedUser = data?.user

    if (!updatedUser) {
      throw new Error(t('errNoUserReturned'))
    }

    authUser.value = updatedUser
    localStorage.setItem('auth_user', JSON.stringify(updatedUser))
    syncProfileDraftFromUser(updatedUser)
    syncEmailDraftFromUser(updatedUser)
    closeEmailDialog()
    showToast(t('successEmailSaved'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errSaveEmail')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isSavingEmail.value = false
  }
}

const savePassword = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  isChangingPassword.value = true

  try {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    const currentPassword = passwordDraft.currentPassword.trim()
    const newPassword = passwordDraft.newPassword.trim()
    const newPasswordConfirmation = passwordDraft.newPasswordConfirmation.trim()

    if (!currentPassword) {
      throw new Error(t('errCurrentPasswordRequired'))
    }

    if (!newPassword) {
      throw new Error(t('errNewPasswordRequired'))
    }

    if (newPassword.length < 8) {
      throw new Error(t('errNewPasswordTooShort'))
    }

    if (newPassword !== newPasswordConfirmation) {
      throw new Error(t('errPasswordConfirmationMismatch'))
    }

    const response = await fetch(`${apiBaseUrl()}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      if (response.status === 401) {
        await clearSessionAndRedirectToLogin()
        return
      }

      throw new Error(data?.message ?? t('errChangePassword'))
    }

    isChangingPassword.value = false
    closePasswordDialog()
    isPasswordChangeSuccessDialogOpen.value = true
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errChangePassword')
    errorMessage.value = message
    showToast(message, 'error')
    isChangingPassword.value = false
  } finally {
  }
}

const sendVerificationEmail = async () => {
  if (verifyButtonCooldownSeconds.value > 0) {
    return
  }

  errorMessage.value = ''
  infoMessage.value = ''
  isSendingVerificationEmail.value = true
  startVerifyButtonCooldown(30)

  try {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    const response = await fetch(`${apiBaseUrl()}/api/auth/email/verification-notification`, {
      method: 'POST',
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

      throw new Error(data?.message ?? t('errEmailVerificationSend'))
    }

    infoMessage.value = data?.message ?? t('emailVerificationSent')
    showToast(infoMessage.value)
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errEmailVerificationSend')
    errorMessage.value = message
    showToast(message, 'error')
  } finally {
    isSendingVerificationEmail.value = false
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

const finalizeAccountDeletion = async () => {
  if (isDeletingAccount.value) {
    return
  }

  isDeletingAccount.value = true
  deletionDialogMessage.value = t('deleteAccountConfirmed')

  try {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      await clearSessionAndRedirectToLogin()
      return
    }

    const response = await fetch(`${apiBaseUrl()}/api/auth/account`, {
      method: 'DELETE',
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

      throw new Error(data?.message ?? t('errDeleteAccount'))
    }

    isWaitingDeletionVerification.value = false
    isDeletionCompleted.value = true
    deletionDialogMessage.value = data?.message ?? t('deleteAccountSuccessMessage')
    showToast(data?.message ?? t('successAccountDeleted'))
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errDeleteAccount')
    errorMessage.value = message
    showToast(message, 'error')
    isWaitingDeletionVerification.value = false
    deletionDialogMessage.value = message
  } finally {
    isDeletingAccount.value = false
  }
}

const pollDeletionVerificationStatus = async () => {
  const token = localStorage.getItem('auth_token')

  if (!token) {
    clearDeletionVerificationPoller()
    isWaitingDeletionVerification.value = false
    await clearSessionAndRedirectToLogin()
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/api/auth/account/deletion-status`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.message ?? t('errUnexpected'))
    }

    if (data?.confirmed) {
      clearDeletionVerificationPoller()
      await finalizeAccountDeletion()
    }
  } catch (error) {
    clearDeletionVerificationPoller()
    isWaitingDeletionVerification.value = false
    const message = error instanceof Error ? error.message : t('errUnexpected')
    deletionDialogMessage.value = message
    showToast(message, 'error')
  }
}

const deleteAccount = async () => {
  if (isDeletingAccount.value || isWaitingDeletionVerification.value) {
    return
  }

  errorMessage.value = ''
  infoMessage.value = ''
  isWaitingDeletionVerification.value = true
  deletionDialogMessage.value = t('deleteAccountEmailPending')

  try {
    const token = localStorage.getItem('auth_token')

    if (!token) {
      isWaitingDeletionVerification.value = false
      isDeletionCompleted.value = false
      await clearSessionAndRedirectToLogin()
      return
    }

    const response = await fetch(`${apiBaseUrl()}/api/auth/account/deletion-request`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.message ?? t('errDeleteAccountRequest'))
    }

    infoMessage.value = data?.message ?? t('deleteAccountEmailSent')
    deletionDialogMessage.value = t('deleteAccountWaiting')
    isDeletionCompleted.value = false
    showToast(infoMessage.value)

    clearDeletionVerificationPoller()
    deletionVerificationPollerId.value = setInterval(() => {
      pollDeletionVerificationStatus()
    }, 3000)

    await pollDeletionVerificationStatus()
  } catch (error) {
    const message = error instanceof Error ? error.message : t('errDeleteAccountRequest')
    errorMessage.value = message
    deletionDialogMessage.value = message
    showToast(message, 'error')
    isWaitingDeletionVerification.value = false
    isDeletionCompleted.value = false
  }
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

onBeforeUnmount(() => {
  clearVerifyButtonCooldown()
  clearDeletionVerificationPoller()
})

const goHomeAfterDeletion = async () => {
  await clearSessionAndRedirectToLanding()
}

const onDeleteModalPrimaryAction = async () => {
  if (isDeletionCompleted.value) {
    await goHomeAfterDeletion()
    return
  }

  await deleteAccount()
}

const closePasswordSuccessDialog = () => {
  isPasswordChangeSuccessDialogOpen.value = false
}

const logoutAfterPasswordChange = async () => {
  await logout()
}
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
                v-if="displayImage"
                :src="displayImage"
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

      <main class="flex flex-1 flex-col overflow-y-auto">
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
        <div class="flex-1 px-5 py-6 md:px-8 md:py-8">
      <div class="mx-auto flex w-full max-w-[1320px] flex-col gap-8 lg:flex-row lg:gap-10">
        <aside class="flex w-full flex-col gap-3 lg:sticky lg:top-24 lg:w-72 lg:self-start">
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
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:p-8"
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
                :disabled="isLoading"
                type="button"
                @click="openProfileDialog"
              >
                {{ t('modifyProfile') }}
              </button>
            </div>

            <div class="grid gap-5 lg:grid-cols-[200px_1fr]">
              <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/20">
                <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('profilePhoto') }}</p>
                <div class="mx-auto size-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center">
                  <img v-if="displayImage" :src="displayImage" alt="Photo de profil" class="h-full w-full object-cover" />
                  <span v-else class="material-symbols-outlined text-3xl text-slate-500 dark:text-slate-300">person</span>
                </div>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/20">
                <dl class="space-y-4">
                  <div class="grid gap-1 md:grid-cols-[140px_1fr] md:gap-4">
                    <dt class="text-sm font-semibold text-slate-600 dark:text-slate-300">{{ t('firstName') }} :</dt>
                    <dd class="text-sm font-medium text-slate-900 dark:text-white">{{ displayName }}</dd>
                  </div>
                  <div class="grid gap-1 md:grid-cols-[140px_1fr] md:gap-4">
                    <dt class="text-sm font-semibold text-slate-600 dark:text-slate-300">{{ t('email') }} :</dt>
                    <dd class="space-y-2 text-sm font-medium text-slate-900 dark:text-white">
                      <p class="break-all">{{ displayEmail }}</p>
                      <div v-if="isEmailVerified" class="inline-flex items-center gap-2 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        <span>{{ t('emailVerifiedBadge') }}</span>
                      </div>
                      <div v-else class="inline-flex flex-wrap items-center gap-2 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                        <span class="material-symbols-outlined text-sm">warning</span>
                        <span>{{ t('emailVerificationTitle') }}</span>
                        <button
                          class="rounded-md bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
                          :disabled="isVerifyButtonDisabled"
                          type="button"
                          @click="sendVerificationEmail"
                        >
                          {{ verifyButtonLabel }}
                        </button>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div class="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              <button
                class="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                type="button"
                @click="openProfileDialog"
              >
                {{ t('modifyProfile') }}
              </button>
              <button
                class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                type="button"
                @click="openEmailDialog"
              >
                {{ t('modifyEmail') }}
              </button>
            </div>
          </section>
          <section
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:p-8"
            id="preferences"
          >
            <div class="mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('preferencesTitle') }}</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                {{ t('preferencesDescription') }}
              </p>
            </div>
            <div class="space-y-4">
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
                  type="button"
                  @click="openPasswordDialog"
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
                  type="button"
                  :disabled="isDeletingAccount || isWaitingDeletionVerification"
                    @click="openDeleteDialog"
                >
                  {{ isDeletingAccount || isWaitingDeletionVerification ? '...' : t('deleteAccount') }}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
        </div>
        <div
          v-if="isDeleteDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
          @click.self="closeDeleteDialog"
        >
          <div class="w-full max-w-lg rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl dark:border-rose-900/50 dark:bg-slate-900">
            <div class="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-bold text-rose-600 dark:text-rose-400">
                  {{ isDeletionCompleted ? t('deleteAccountSuccessTitle') : t('deleteAccountModalTitle') }}
                </h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {{
                    isDeletionCompleted
                      ? t('deleteAccountSuccessMessage')
                      : deletionDialogMessage
                  }}
                </p>
              </div>
              <button
                class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                type="button"
                :disabled="isDeletingAccount || isWaitingDeletionVerification || isDeletionCompleted"
                @click="closeDeleteDialog"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div
              v-if="isWaitingDeletionVerification || isDeletingAccount"
              class="mt-4 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
              <span>{{ isDeletingAccount ? t('deletingAccount') : t('deleteAccountWaiting') }}</span>
            </div>

            <div
              v-if="isDeletionCompleted"
              class="mt-4 flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <span class="material-symbols-outlined text-base">check_circle</span>
              <span>{{ t('deleteAccountSuccessMessage') }}</span>
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <button
                class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                type="button"
                :disabled="isDeletingAccount || isWaitingDeletionVerification"
                @click="closeDeleteDialog"
              >
                {{ t('cancel') }}
              </button>
              <button
                class="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rose-700 disabled:opacity-60"
                type="button"
                :disabled="isDeletingAccount || isWaitingDeletionVerification"
                @click="onDeleteModalPrimaryAction"
              >
                {{
                  isDeletionCompleted
                    ? 'Aller a l\'accueil'
                    : isDeletingAccount
                      ? t('deletingAccount')
                      : isWaitingDeletionVerification
                        ? t('deleteAccountWaiting')
                        : t('requestDeleteAccount')
                }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isProfileDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
          @click.self="closeProfileDialog"
        >
          <div class="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('modifyProfile') }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ t('profileDescription') }}</p>
              </div>
              <button
                class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                type="button"
                @click="closeProfileDialog"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="md:col-span-2">
                <input
                  ref="profileImageInput"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  class="hidden"
                  @change="onProfileImageSelected"
                />
                <div class="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
                  <div class="flex items-center gap-4">
                    <div class="size-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 grid place-items-center">
                      <img v-if="profileDraft.image" :src="profileDraft.image" alt="Photo de profil" class="h-full w-full object-cover" />
                      <span v-else class="material-symbols-outlined text-slate-500 dark:text-slate-300">person</span>
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900 dark:text-white">{{ t('profilePhoto') }}</p>
                      <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('imageHelp') }}</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button class="rounded-lg bg-slate-200 px-3 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700" type="button" @click="triggerProfileImagePicker">
                      {{ t('chooseImage') }}
                    </button>
                    <button v-if="profileDraft.image" class="rounded-lg border border-rose-300 px-3 py-2 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-700 dark:hover:bg-rose-950/40" type="button" @click="removeProfileImage">
                      {{ t('removeImage') }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('firstName') }}</label>
                <input v-model="profileDraft.firstName" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" type="text" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('lastName') }}</label>
                <input v-model="profileDraft.lastName" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" type="text" />
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <button class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" type="button" @click="closeProfileDialog">
                {{ t('cancel') }}
              </button>
              <button class="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60" :disabled="isSavingProfile" type="button" @click="saveProfile">
                {{ isSavingProfile ? '...' : t('saveProfileChanges') }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isEmailDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
          @click.self="closeEmailDialog"
        >
          <div class="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('modifyEmail') }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ t('emailVerificationHint') }}</p>
              </div>
              <button class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200" type="button" @click="closeEmailDialog">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('email') }}</label>
              <input v-model="emailDraft.email" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" type="email" />
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <button class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" type="button" @click="closeEmailDialog">
                {{ t('cancel') }}
              </button>
              <button class="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60" :disabled="isSavingEmail" type="button" @click="saveEmail">
                {{ isSavingEmail ? '...' : t('save') }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isPasswordDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
          @click.self="closePasswordDialog"
        >
          <div class="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ t('passwordChangeModalTitle') }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ t('passwordChangeDescription') }}</p>
              </div>
              <button
                class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                type="button"
                :disabled="isChangingPassword"
                @click="closePasswordDialog"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('currentPassword') }}</label>
                <input
                  v-model="passwordDraft.currentPassword"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  type="password"
                  autocomplete="current-password"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('newPassword') }}</label>
                <input
                  v-model="passwordDraft.newPassword"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  type="password"
                  autocomplete="new-password"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('confirmNewPassword') }}</label>
                <input
                  v-model="passwordDraft.newPasswordConfirmation"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  type="password"
                  autocomplete="new-password"
                />
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-3">
              <button
                class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                type="button"
                :disabled="isChangingPassword"
                @click="closePasswordDialog"
              >
                {{ t('cancel') }}
              </button>
              <button
                class="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
                type="button"
                :disabled="isChangingPassword"
                @click="savePassword"
              >
                {{ isChangingPassword ? '...' : t('savePassword') }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isPasswordChangeSuccessDialogOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-6"
          @click.self="closePasswordSuccessDialog"
        >
          <div class="w-full max-w-md rounded-3xl border border-emerald-200 bg-white p-8 shadow-2xl dark:border-emerald-900/50 dark:bg-slate-900 relative overflow-hidden flex flex-col items-center text-center">
            <!-- Abstract background glow -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <!-- Glowing Success Icon -->
            <div class="relative mb-6 z-10">
              <div class="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150"></div>
              <div class="relative w-20 h-20 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center border border-emerald-300 dark:border-emerald-700">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-5xl">check_circle</span>
              </div>
            </div>

            <!-- Content -->
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight z-10">{{ t('passwordChangeSuccess') }}</h2>
            <p class="text-slate-600 dark:text-slate-300 text-base mb-8 leading-relaxed z-10">
              {{ t('passwordChangeSecurityNotice') }}
            </p>

            <!-- Actions -->
            <div class="w-full space-y-3 z-10">
              <button
                class="w-full py-3 bg-emerald-600 dark:bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-600/20"
                type="button"
                @click="logoutAfterPasswordChange"
              >
                {{ t('logoutAndSignIn') }}
              </button>
              <button
                class="w-full py-3 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:opacity-70 transition-colors"
                type="button"
                @click="closePasswordSuccessDialog"
              >
                {{ t('returnToSettings') }}
              </button>
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
