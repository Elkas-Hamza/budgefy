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
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            to="/categories"
          >
            <span class="material-symbols-outlined text-[22px]">label</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Categories</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Parametres</span>
          </router-link>
        </nav>
        <div class="p-8 border-t border-slate-200 dark:border-slate-800 mt-auto flex items-center">

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
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Gestion des Categories</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">Organisez vos flux financiers</p>
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
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div class="flex flex-col gap-1">
            <h1
              class="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight tracking-tight"
            >
              Gestion des Catégories
            </h1>
            <p class="text-slate-500 dark:text-slate-400 text-base font-normal">
              Organisez vos flux financiers avec des étiquettes personnalisées.
            </p>
          </div>
          <button
            class="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span class="material-symbols-outlined">add_circle</span>
            <span>Ajouter une Catégorie</span>
          </button>
        </div>
        <div class="mb-8 border-b border-slate-200 dark:border-slate-800">
          <div class="flex gap-8 overflow-x-auto no-scrollbar">
            <a
              class="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 px-2 whitespace-nowrap"
              href="#"
            >
              <span class="text-sm font-bold">Toutes les catégories</span>
            </a>
            <a
              class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors"
              href="#"
            >
              <span class="text-sm font-bold">Dépenses</span>
            </a>
            <a
              class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors"
              href="#"
            >
              <span class="text-sm font-bold">Revenus</span>
            </a>
            <a
              class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors"
              href="#"
            >
              <span class="text-sm font-bold">Inactives</span>
            </a>
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400"
              >
                <span class="material-symbols-outlined text-3xl"
                  >restaurant</span
                >
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Alimentation
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >Dépense</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >12 transactions</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400"
              >
                <span class="material-symbols-outlined text-3xl"
                  >directions_car</span
                >
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Transport
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >Dépense</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >8 transactions</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
              >
                <span class="material-symbols-outlined text-3xl">payments</span>
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Salaire
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                >Revenu</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >1 transaction</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400"
              >
                <span class="material-symbols-outlined text-3xl">home</span>
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Logement
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >Dépense</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >2 transactions</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400"
              >
                <span class="material-symbols-outlined text-3xl"
                  >medical_services</span
                >
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Santé
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >Dépense</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >3 transactions</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400"
              >
                <span class="material-symbols-outlined text-3xl"
                  >sports_esports</span
                >
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Loisirs
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >Dépense</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >15 transactions</span
              >
            </div>
          </div>
          <div
            class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="size-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400"
              >
                <span class="material-symbols-outlined text-3xl"
                  >featured_seasonal_and_gifts</span
                >
              </div>
              <div
                class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Cadeaux
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                >Revenu</span
              >
              <span class="text-xs text-slate-400 dark:text-slate-500"
                >2 transactions</span
              >
            </div>
          </div>
          <div
            class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 cursor-pointer group transition-all"
          >
            <div
              class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-3"
            >
              <span class="material-symbols-outlined text-2xl">add</span>
            </div>
            <span class="text-sm font-bold text-slate-500 dark:text-slate-400"
              >Nouvelle catégorie</span
            >
          </div>
        </div>
        <div class="mt-12">
          <h2
            class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4"
          >
            Actions rapides
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left"
            >
              <div
                class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">download</span>
              </div>
              <div>
                <p class="text-slate-900 dark:text-white font-bold text-sm">
                  Exporter les catégories
                </p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">
                  Télécharger au format CSV ou JSON
                </p>
              </div>
            </button>
            <button
              class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left"
            >
              <div
                class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">auto_fix_high</span>
              </div>
              <div>
                <p class="text-slate-900 dark:text-white font-bold text-sm">
                  Auto-catégorisation
                </p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">
                  Gérer les règles de détection
                </p>
              </div>
            </button>
            <button
              class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left"
            >
              <div
                class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">history</span>
              </div>
              <div>
                <p class="text-slate-900 dark:text-white font-bold text-sm">
                  Historique des modifications
                </p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">
                  Voir les changements récents
                </p>
              </div>
            </button>
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
