<script setup>
import { onMounted, ref } from 'vue'

const authUser = ref(null)
const isSidebarCollapsed = ref(false)
const dark_light = window.dark_light

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onMounted(() => {
  const rawUser = localStorage.getItem('auth_user')
  if (rawUser) {
    try {
      authUser.value = JSON.parse(rawUser)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }
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
            <span v-show="!isSidebarCollapsed" class="text-sm">Tableau de bord</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/transactions"
          >
            <span class="material-symbols-outlined text-[22px]">receipt_long</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Transactions</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/categories"
          >
            <span class="material-symbols-outlined text-[22px]">label</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Categories</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Parametres</span>
          </router-link>
        </nav>
        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <div
            class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center gap-3"
          >
            <div class="size-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden grid place-items-center">
              <span class="material-symbols-outlined text-slate-600 dark:text-slate-200">person</span>
            </div>
            <div v-show="!isSidebarCollapsed" class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">{{ authUser?.name || 'Utilisateur' }}</p>
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
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Parametres</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Gerez votre compte et vos preferences</p>
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
            <h1 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Paramètres</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              Gérez votre compte et vos préférences
            </p>
          </div>
          <nav class="flex flex-col gap-1">
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20"
              href="#profil"
            >
              <span class="material-symbols-outlined">person</span>
              <span>Profil</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#preferences"
            >
              <span class="material-symbols-outlined">settings</span>
              <span>Préférences</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#securite"
            >
              <span class="material-symbols-outlined">shield</span>
              <span>Sécurité</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#notifications"
            >
              <span class="material-symbols-outlined"
                >notifications_active</span
              >
              <span>Notifications</span>
            </a>
            <a
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              href="#abonnement"
            >
              <span class="material-symbols-outlined">credit_card</span>
              <span>Abonnement</span>
            </a>
          </nav>
          <div
            class="mt-10 p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <p
              class="text-xs font-bold text-primary uppercase tracking-wider mb-2"
            >
              Besoin d'aide ?
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Consultez notre centre d'aide ou contactez le support.
            </p>
            <button
              class="w-full py-2 bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors"
            >
              Support client
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
                <h2 class="text-xl font-bold text-slate-900 dark:text-white">Mon Profil</h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm">
                  Informations personnelles publiques et privées
                </p>
              </div>
              <button
                class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Enregistrer
              </button>
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="relative group">
                <div
                  class="size-32 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 overflow-hidden"
                  data-alt="Photo de profil détaillée"
                  style="
                    background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDgvxBtR7VfF9LV7yXfXxVAuByQpw6u9regpxcmXJIjHCVdhcaOCxFouw0DR6QOSlEXJ1UtazKbjcDdthzMspe10KVY-_1c7Ho-7cxI4hOgT8DM6CAwgOJ3Xe8BGlLhM5g-4bpxQGQh3dlw4xRb0FYNsbif_wSkNRKg_RkKi2nbzVc23Gxxf0WIh8vERFaa8wweP2hX3zR2P9j_f8j8xUY_jqPyZ4ckcD1r4Y6zcvAxp8PInvBnl9JE-adc_6_TmpIli9CU99OEH7PO&quot;);
                  "
                ></div>
                <button
                  class="absolute bottom-0 right-0 size-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 hover:scale-110 transition-transform"
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
                    >Prénom</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="text"
                    value="Jean"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Nom de famille</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="text"
                    value="Dupont"
                  />
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Email</label
                  >
                  <input
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                    type="email"
                    value="jean.dupont@email.com"
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
            id="preferences"
          >
            <div class="mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Préférences de l'application</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                Personnalisez votre expérience utilisateur
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
                    <p class="font-semibold text-slate-900 dark:text-white">Devise principale</p>
                    <p class="text-xs text-slate-500">
                      Utilisée pour vos rapports et totaux
                    </p>
                  </div>
                </div>
                <select
                  class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px] text-slate-900 dark:text-white"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                  <option value="GBP">Livre (£)</option>
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
                    <p class="font-semibold  text-slate-900 dark:text-white">Langue</p>
                    <p class="text-xs text-slate-500">Interface utilisateur</p>
                  </div>
                </div>
                <select
                  class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px] text-slate-900 dark:text-white"
                >
                  <option value="FR">Français</option>
                  <option value="EN">English</option>
                  <option value="ES">Español</option>
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
                    <p class="font-semibold text-slate-900 dark:text-white">Mode Sombre</p>
                    <p class="text-xs text-slate-500">
                      Activer le thème sombre automatiquement
                    </p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input checked="true" class="sr-only peer" type="checkbox" />
                  <div
                    class="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                  ></div>
                </label>
              </div>
            </div>
          </section>
          <section
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
            id="securite"
          >
            <div class="mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Sécurité</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                Gérez l'accès à votre compte financier
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
                  <h3 class="font-bold text-slate-900 dark:text-white">Mot de passe</h3>
                </div>
                <p class="text-sm text-slate-500 mb-4">
                  Dernière modification il y a 3 mois. Utilisez un mot de passe
                  robuste.
                </p>
                <button
                  class="w-full py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Changer le mot de passe
                </button>
              </div>
              <div
                class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
              >
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-green-500"
                    >verified_user</span
                  >
                  <h3 class="font-bold text-slate-900 dark:text-white">Double Authentification (2FA)</h3>
                </div>
                <p class="text-sm text-slate-500 mb-4">
                  Renforcez la sécurité avec un code envoyé sur votre mobile.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-green-500 uppercase"
                    >Activé</span
                  >
                  <button
                    class="text-sm text-primary font-bold hover:underline"
                  >
                    Configurer
                  </button>
                </div>
              </div>
            </div>
            <div
              class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-red-500">Zone de danger</h3>
                  <p class="text-sm text-slate-500">
                    Suppression définitive de votre compte et de toutes vos
                    données.
                  </p>
                </div>
                <button
                  class="px-6 py-2.5 border-2 border-red-500/20 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  Supprimer le compte
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
        </div>
        <footer class="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© 2026 Gestion Budgetaire Personnelle. Tous droits reserves.</p>
        </footer>
      </main>
    </div>
  </div>
</template>
