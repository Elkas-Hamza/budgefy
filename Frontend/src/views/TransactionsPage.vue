<template>
<div class="flex flex-col min-h-screen">
<header class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark sticky top-0 z-50">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex items-center justify-between h-16">
<div class="flex items-center gap-8">
<div class="flex items-center gap-3 text-primary">
<span class="material-symbols-outlined text-3xl">account_balance_wallet</span>
<h1 class="text-slate-900 dark:text-white text-lg font-extrabold tracking-tight">Budgefy</h1>
</div>
<nav class="hidden md:flex items-center gap-6">
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" to="/dashboard">Tableau de bord</router-link>
<router-link class="text-primary text-sm font-semibold border-b-2 border-primary pb-1" to="/transactions">Transactions</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" to="/categories">Catégories</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" to="/settings">Paramètres</router-link>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
<input class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-primary w-48 lg:w-64 transition-all" placeholder="Rechercher..." type="text"/>
</div>
<router-link class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2" to="/settings">
<span class="material-symbols-outlined text-sm">person</span>
<span>Mon Profil</span>
</router-link>
<div class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center border-2 border-primary/20" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbm5Z1k0ywysAQpr7sqsXcfCqdlGA9bqPEw9L-ux7dKfMteezD6AOuzmXAn5XVgE9kBEUhLKSvbCtwMBiFB8JSXGoL-X37L-YESbH3SFSkOl1oGXUxsCYuLhA-zaipwHovT5_tYAme0UGejZRIDsUR7lGwTJXhggU74BGR6RGWgLfxdhvASbxVGcG6SqqygdOL9jy_zHX-ug0pP5vo0hcYwcq4B401uwnGaLXOgpPKitvuyM5YeJlnRkmhGy4eU9hgRWZqmitc_1jf')"></div>
</div>
</div>
</div>
</header>
<main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div>
<h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestion des Transactions</h2>
<p class="text-slate-500 dark:text-slate-400 mt-2 text-lg">Suivez et gérez vos revenus et dépenses en temps réel.</p>
</div>
<button class="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">add_circle</span>
<span>Ajouter une Transaction</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
<div class="flex items-center gap-4">
<div class="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
<span class="material-symbols-outlined">trending_up</span>
</div>
<div>
<p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Revenus Totaux</p>
<p class="text-2xl font-bold text-slate-900 dark:text-white">€4,250.00</p>
</div>
</div>
</div>
<div class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
<div class="flex items-center gap-4">
<div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
<span class="material-symbols-outlined">trending_down</span>
</div>
<div>
<p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dépenses Totales</p>
<p class="text-2xl font-bold text-slate-900 dark:text-white">€1,840.50</p>
</div>
</div>
</div>
<div class="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
<div class="flex items-center gap-4">
<div class="p-3 bg-primary/10 text-primary rounded-xl">
<span class="material-symbols-outlined">account_balance</span>
</div>
<div>
<p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Solde Net</p>
<p class="text-2xl font-bold text-slate-900 dark:text-white">€2,409.50</p>
</div>
</div>
</div>
</div>
<div class="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
<div class="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200 dark:border-slate-800">
<div class="flex p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg w-fit">
<button class="px-6 py-2 rounded-md text-sm font-bold bg-white dark:bg-slate-800 text-primary shadow-sm transition-all">Toutes</button>
<button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">Revenus</button>
<button class="px-6 py-2 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all">Dépenses</button>
</div>
<div class="flex flex-wrap items-center gap-3">
<div class="relative min-w-[200px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
<select class="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
<option>Ce mois-ci</option>
<option>Mois dernier</option>
<option>Cette année</option>
<option>Personnalisé</option>
</select>
</div>
<div class="relative min-w-[180px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">category</span>
<select class="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
<option>Toutes catégories</option>
<option>Alimentation</option>
<option>Loisirs</option>
<option>Logement</option>
<option>Salaire</option>
</select>
</div>
<button class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
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
<td class="px-6 py-4 text-sm font-medium">12 Mai 2024</td>
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
<td class="px-6 py-4 text-sm font-medium">10 Mai 2024</td>
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
<td class="px-6 py-4 text-sm font-medium">08 Mai 2024</td>
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
<td class="px-6 py-4 text-sm font-medium">05 Mai 2024</td>
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
<td class="px-6 py-4 text-sm font-medium">02 Mai 2024</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
<span class="material-symbols-outlined text-[14px]">monitoring</span> Dividend</span></td>
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
<div class="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-slate-900/40">
<p class="text-sm text-slate-500 dark:text-slate-400">Affichage de <span class="font-bold text-slate-900 dark:text-white">1 à 5</span> sur <span class="font-bold text-slate-900 dark:text-white">42</span> transactions</p>
<div class="flex gap-2">
<button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled="false">
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
</main>
<footer class="mt-auto py-8 border-t border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 text-center">
<p class="text-slate-500 dark:text-slate-400 text-sm">© 2026 Gestion Budgétaire Personnelle. Tous droits réservés.</p>
</div>
</footer>
</div>
<div class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 hidden">
<div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
<div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
<h3 class="text-xl font-bold">Nouvelle Transaction</h3>
<button class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<div class="p-6 space-y-4">
<div class="grid grid-cols-2 gap-4">
<div class="col-span-2">
<label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Montant</label>
<div class="relative">
<span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">€</span>
<input class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-8 py-3 focus:ring-2 focus:ring-primary" placeholder="0.00" step="0.01" type="number"/>
</div>
</div>
<div>
<label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Date</label>
<input class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" type="date"/>
</div>
<div>
<label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Type</label>
<select class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary">
<option>Dépense</option>
<option>Revenu</option>
</select>
</div>
<div class="col-span-2">
<label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Catégorie</label>
<select class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary">
<option>Alimentation</option>
<option>Logement</option>
<option>Loisirs</option>
<option>Transports</option>
<option>Santé</option>
<option>Salaire</option>
</select>
</div>
<div class="col-span-2">
<label class="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Description</label>
<textarea class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="Détails de la transaction..." rows="3"></textarea>
</div>
</div>
</div>
<div class="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3 justify-end">
<button class="px-6 py-2.5 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">Annuler</button>
<button class="px-6 py-2.5 font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20">Enregistrer</button>
</div>
</div>
</div>


</template>
