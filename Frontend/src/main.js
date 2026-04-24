import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP']
const SUPPORTED_LANGUAGES = ['FR', 'EN', 'AR']

const getStoredPreferences = () => {
  const raw = localStorage.getItem('user_preferences')

  if (!raw) {
    return {
      currency: 'EUR',
      language: 'FR',
      autoDark: false,
      emailNotifications: true,
    }
  }

  try {
    const parsed = JSON.parse(raw)
    const parsedCurrency = String(parsed?.currency ?? '')
    const parsedLanguage = String(parsed?.language ?? '')

    return {
      currency: SUPPORTED_CURRENCIES.includes(parsedCurrency) ? parsedCurrency : 'EUR',
      language: SUPPORTED_LANGUAGES.includes(parsedLanguage) ? parsedLanguage : 'FR',
      autoDark: Boolean(parsed?.autoDark),
      emailNotifications: parsed?.emailNotifications ?? true,
    }
  } catch {
    return {
      currency: 'EUR',
      language: 'FR',
      autoDark: false,
      emailNotifications: true,
    }
  }
}

const applyLanguageAttributes = (language) => {
  const html = document.documentElement
  const lang = language === 'AR' ? 'ar' : String(language || 'FR').toLowerCase()

  html.lang = lang
  html.dir = language === 'AR' ? 'rtl' : 'ltr'
}

// configuration for vuetify //
const dark_light = (m) => {
  const savedMode = localStorage.getItem('mode')
  const mode = m ?? (savedMode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('mode', mode)
}

const applyStoredPreferences = () => {
  const preferences = getStoredPreferences()

  applyLanguageAttributes(preferences.language)

  if (preferences.autoDark) {
    document.documentElement.classList.add('dark')
    return
  }

  dark_light(localStorage.getItem('mode'))
}

window.dark_light = dark_light
applyStoredPreferences()
window.addEventListener('user-preferences-updated', applyStoredPreferences)
// updates //
createApp(App).use(router).use(vuetify).mount('#app')