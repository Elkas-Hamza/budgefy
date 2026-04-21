<script setup>
import { ref } from 'vue'

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
            <span v-show="!isSidebarCollapsed" class="text-sm">Tableau de bord</span>
          </router-link>
          <router-link
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
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
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            to="/settings"
          >
            <span class="material-symbols-outlined text-[22px]">settings</span>
            <span v-show="!isSidebarCollapsed" class="text-sm">Parametres</span>
          </router-link>
        </nav>


        <div class="p-4 border-t border-slate-200 dark:border-slate-800">
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center gap-3">
            <div class="size-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden grid place-items-center">
              <span class="material-symbols-outlined text-slate-600 dark:text-slate-200">person</span>
            </div>
            <div v-show="!isSidebarCollapsed" class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate text-slate-900 dark:text-white">
                {{ authUser?.name || 'Utilisateur' }}
              </p>
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
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Gestion des Transactions</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Suivez et gérez vos revenus et dépenses en temps réel.
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
                  placeholder="Rechercher une transaction..."
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
                Aperçu des transactions
              </h3>
              <p class="text-slate-500 dark:text-slate-400 mt-2 text-lg">
                Vue rapide des mouvements récents et du solde global.
              </p>
            </div>
            <button
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
              <span class="material-symbols-outlined">add_circle</span>
              <span>Ajouter une Transaction</span>
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
                    Revenus Totaux
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">€4,250.00</p>
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
                    Dépenses Totales
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">€1,840.50</p>
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
                    Solde Net
                  </p>
                  <p class="text-2xl font-bold text-slate-900 dark:text-white">€2,409.50</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200 dark:border-slate-800">
              <div class="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-fit">
                <button class="px-6 py-2 rounded-md text-sm font-bold bg-white dark:bg-slate-800 text-primary shadow-sm transition-all">
                  Toutes
                </button>
                <button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                  Revenus
                </button>
                <button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                  Dépenses
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
                    <option>Ce mois-ci</option>
                    <option>Mois dernier</option>
                    <option>Cette année</option>
                    <option>Personnalisé</option>
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
                    <option>Toutes catégories</option>
                    <option>Alimentation</option>
                    <option>Loisirs</option>
                    <option>Logement</option>
                    <option>Salaire</option>
                  </select>
                </div>
                <button
                  class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span class="material-symbols-outlined text-sm">filter_list</span>
                  Plus de filtres
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                    <th class="px-6 py-4">Date</th>
                    <th class="px-6 py-4">Catégorie</th>
                    <th class="px-6 py-4">Description</th>
                    <th class="px-6 py-4 text-right">Montant</th>
                    <th class="px-6 py-4 text-center">Actions</th>
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
                    <td class="px-6 py-4 text-right font-bold text-emerald-500">+€3,200.00</td>
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
                    <td class="px-6 py-4 text-right font-bold text-rose-500">-€84.20</td>
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
                    <td class="px-6 py-4 text-right font-bold text-rose-500">-€950.00</td>
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
                    <td class="px-6 py-4 text-right font-bold text-rose-500">-€25.98</td>
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
                    <td class="px-6 py-4 text-right font-bold text-emerald-500">+€150.30</td>
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
                Affichage de <span class="font-bold text-slate-900 dark:text-white">1 à 5</span> sur
                <span class="font-bold text-slate-900 dark:text-white">42</span> transactions
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
