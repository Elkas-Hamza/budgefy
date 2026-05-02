<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const state = ref('loading')
const message = ref('Verification en cours...')
const resendEmail = ref('')
const resendState = ref('idle')
const resendMessage = ref('')

const title = computed(() => {
  if (state.value === 'success') {
    return 'Email verifie avec succes'
  }

  if (state.value === 'error') {
    return 'Verification impossible'
  }

  return 'Verification de votre email'
})

const cardClass = computed(() => {
  if (state.value === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-900'
  }

  if (state.value === 'error') {
    return 'border-rose-200 bg-rose-50 text-rose-900'
  }

  return 'border-slate-200 bg-white text-slate-900'
})

const iconName = computed(() => {
  if (state.value === 'success') {
    return 'check_circle'
  }

  if (state.value === 'error') {
    return 'error'
  }

  return 'hourglass_top'
})

const decodeVerificationUrl = () => {
  const raw = route.query.url

  if (typeof raw !== 'string' || raw.trim() === '') {
    return ''
  }

  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

const refreshStoredUser = async () => {
  const token = localStorage.getItem('auth_token')
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

  if (!token || !apiBaseUrl) {
    return
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return
    }

    const data = await response.json().catch(() => null)

    if (data?.user) {
      localStorage.setItem('auth_user', JSON.stringify(data.user))
    }
  } catch {
    // Keep verification UX responsive even if profile refresh fails.
  }
}

const requestVerificationLink = async () => {
  if (resendState.value === 'loading') {
    return
  }

  const email = resendEmail.value.trim()

  if (!email) {
    resendState.value = 'error'
    resendMessage.value = 'Veuillez saisir votre adresse e-mail.'
    return
  }

  resendState.value = 'loading'
  resendMessage.value = ''

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/email/verification-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(payload?.message || 'Impossible d\'envoyer le lien de verification.')
    }

    resendState.value = 'success'
    resendMessage.value =
      payload?.message ||
      'Si ce compte existe et n\'est pas verifie, un lien de verification a ete envoye.'
  } catch (error) {
    resendState.value = 'error'
    resendMessage.value =
      error instanceof Error ? error.message : 'Impossible d\'envoyer le lien de verification.'
  }
}

const verifyEmail = async () => {
  const verificationUrl = decodeVerificationUrl()

  if (!verificationUrl) {
    state.value = 'error'
    message.value = 'Lien de verification manquant ou invalide.'

    return
  }

  try {
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(payload?.message || 'Le lien de verification est invalide ou expire.')
    }

    state.value = 'success'
    message.value = payload?.message || 'Votre adresse email a ete verifiee avec succes.'
    await refreshStoredUser()
  } catch (error) {
    state.value = 'error'
    message.value =
      error instanceof Error
        ? error.message
        : 'La verification a echoue. Veuillez demander un nouveau lien.'
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToSettings = () => {
  router.push('/settings')
}

onMounted(() => {
  const emailFromQuery = typeof route.query.email === 'string' ? route.query.email : ''
  resendEmail.value = emailFromQuery
  verifyEmail()
})
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-10">
    <div class="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center">
      <section
        class="w-full rounded-3xl border p-8 shadow-sm transition-colors"
        :class="cardClass"
      >
        <div class="mb-4 flex items-center gap-3">
          <span class="material-symbols-outlined text-3xl">{{ iconName }}</span>
          <h1 class="text-2xl font-bold">{{ title }}</h1>
        </div>

        <p class="text-base leading-relaxed">{{ message }}</p>

        <div class="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4">
          <p class="mb-3 text-sm font-semibold text-slate-800">Renvoyer un lien de verification</p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <input
              v-model="resendEmail"
              type="email"
              placeholder="exemple@email.com"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
              type="button"
              :disabled="resendState === 'loading'"
              @click="requestVerificationLink"
            >
              {{ resendState === 'loading' ? 'Envoi...' : 'Envoyer le lien' }}
            </button>
          </div>
          <p v-if="resendMessage" class="mt-2 text-sm" :class="resendState === 'error' ? 'text-rose-700' : 'text-emerald-700'">
            {{ resendMessage }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <button
            class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            type="button"
            @click="goToLogin"
          >
            Aller a la connexion
          </button>

          <button
            class="rounded-lg border border-current px-4 py-2 text-sm font-semibold"
            type="button"
            @click="goToSettings"
          >
            Ouvrir les parametres
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
