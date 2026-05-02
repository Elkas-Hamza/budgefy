<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const state = ref('idle')
const message = ref('Cliquez sur le bouton pour confirmer la suppression du compte.')
const verifiedUser = ref(null)
const isLoadingUserPreview = ref(false)

const cardClass = computed(() => {
  if (state.value === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-900'
  }

  if (state.value === 'error') {
    return 'border-rose-200 bg-rose-50 text-rose-900'
  }

  return 'border-slate-200 bg-white text-slate-900'
})

const verificationUrl = computed(() => {
  const raw = route.query.url

  if (typeof raw !== 'string' || raw.trim() === '') {
    return ''
  }

  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
})

const previewUrl = computed(() => {
  if (!verificationUrl.value) {
    return ''
  }

  return verificationUrl.value.replace('/account/deletion/verify/', '/account/deletion/preview/')
})

const loadUserPreview = async () => {
  if (!previewUrl.value) {
    return
  }

  isLoadingUserPreview.value = true

  try {
    const response = await fetch(previewUrl.value, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(payload?.message || 'Le lien de confirmation est invalide ou expire.')
    }

    verifiedUser.value = payload?.user && typeof payload.user === 'object' ? payload.user : null
  } catch (error) {
    state.value = 'error'
    message.value =
      error instanceof Error ? error.message : 'Le lien de confirmation est invalide ou expire.'
  } finally {
    isLoadingUserPreview.value = false
  }
}

const confirmDeletion = async () => {
  if (state.value === 'loading') {
    return
  }

  if (!verificationUrl.value) {
    state.value = 'error'
    message.value = 'Lien de confirmation manquant ou invalide.'
    return
  }

  state.value = 'loading'
  message.value = 'Confirmation en cours...'

  try {
    const response = await fetch(verificationUrl.value, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(payload?.message || 'Le lien de confirmation est invalide ou expire.')
    }

    state.value = 'success'
    message.value =
      payload?.message ||
      'Suppression confirmee. Vous pouvez fermer cette page et retourner dans l\'application.'
    verifiedUser.value = payload?.user && typeof payload.user === 'object' ? payload.user : null
  } catch (error) {
    state.value = 'error'
    message.value =
      error instanceof Error ? error.message : 'Le lien de confirmation est invalide ou expire.'
  }
}

const goToSettings = () => {
  router.push('/settings')
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  loadUserPreview()
})
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-10">
    <div class="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center">
      <section class="w-full rounded-3xl border p-8 shadow-sm transition-colors" :class="cardClass">
        <h1 class="text-2xl font-bold">Confirmation de suppression</h1>

        <div
          v-if="verifiedUser"
          class="mt-5 flex items-center gap-4 rounded-2xl border border-emerald-300 bg-white/70 p-4"
        >
          <div class="relative h-14 w-14 overflow-hidden rounded-full border border-emerald-200 bg-emerald-100">
            <img
              v-if="verifiedUser?.image"
              :src="verifiedUser.image"
              alt="Photo de profil"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-lg font-bold uppercase text-emerald-700"
            >
              {{ (verifiedUser?.name || '?').charAt(0) }}
            </div>

            <div
              v-if="state === 'success'"
              class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white"
              aria-label="Verification reussie"
              title="Verification reussie"
            >
              ✓
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {{ state === 'success' ? 'Utilisateur verifie' : 'Compte a supprimer' }}
            </p>
            <p class="text-base font-semibold text-emerald-900">{{ verifiedUser?.name || 'Compte utilisateur' }}</p>
          </div>
        </div>

        <p v-else-if="isLoadingUserPreview" class="mt-5 text-sm text-slate-600">
          Chargement des informations du compte...
        </p>

        <p class="mt-3 text-base leading-relaxed">{{ message }}</p>

        <p v-if="state === 'success'" class="mt-2 text-sm font-medium text-emerald-700">
          Verification terminee. Vous pouvez fermer cette page.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <button
            class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
            type="button"
            :disabled="state === 'loading' || state === 'success'"
            @click="confirmDeletion"
          >
            {{ state === 'loading' ? 'Verification...' : 'Confirmer la suppression' }}
          </button>

          <button
            class="rounded-lg border border-current px-4 py-2 text-sm font-semibold"
            type="button"
            @click="goToSettings"
          >
            Ouvrir les parametres
          </button>

          <button
            class="rounded-lg border border-current px-4 py-2 text-sm font-semibold"
            type="button"
            @click="goToHome"
          >
            Page d'accueil
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
