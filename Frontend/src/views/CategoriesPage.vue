<template>
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-3 bg-white dark:bg-background-dark sticky top-0 z-50">
<div class="flex items-center gap-8">
<div class="flex items-center gap-4 text-primary">
<div class="size-8 bg-primary/20 rounded-lg flex items-center justify-center">
<span class="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">BudgetPro</h2>
</div>
<label class="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
<div class="text-slate-400 dark:text-slate-500 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4">
<span class="material-symbols-outlined text-xl">search</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-0 focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-sm font-normal" placeholder="Rechercher une catégorie..." value=""/>
</div>
</label>
</div>
<div class="flex flex-1 justify-end gap-6 items-center">
<nav class="hidden md:flex items-center gap-6">
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/dashboard">Tableau de bord</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/transactions">Transactions</router-link>
<router-link class="text-primary text-sm font-bold border-b-2 border-primary pb-1" to="/categories">Catégories</router-link>
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Rapports</a>
</nav>
<div class="flex gap-2">
<button class="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<router-link class="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" to="/settings">
<span class="material-symbols-outlined">settings</span>
</router-link>
</div>
<div class="bg-primary/10 rounded-full size-10 flex items-center justify-center border border-primary/20 overflow-hidden">
<img alt="Profile" class="w-full h-full object-cover" data-alt="User avatar illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq6hnGmNz1a5MagGKZaubddOxkuzJyDEUC7ieitaJdSq1E53G2co4pnyi2u9q_RDbHJwcsLPaiP7rJKChWjf4O9fzYIMsaIcyZ_6xnIYL4uOzi4kcuLpX6HZIJsoU-b53e_rkE7ZTkmjLPEZLpIwDUAT2o3hs7D9QrJIcVEJqMK8-i6Xu_knFzMFAP9kdEP6dFrgTQWkMTcMl48otXwVjNkTYOPQmeLdoZN2ythq4Dxn2FeP9zA3BE6K-psYBlHSex-EWR-g7DR0ao"/>
</div>
</div>
</header>
<main class="flex-1 px-6 md:px-20 py-8 max-w-[1400px] mx-auto w-full">
<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
<div class="flex flex-col gap-1">
<h1 class="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight tracking-tight">Gestion des Catégories</h1>
<p class="text-slate-500 dark:text-slate-400 text-base font-normal">Organisez vos flux financiers avec des étiquettes personnalisées.</p>
</div>
<button class="flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
<span class="material-symbols-outlined">add_circle</span>
<span>Ajouter une Catégorie</span>
</button>
</div>
<div class="mb-8 border-b border-slate-200 dark:border-slate-800">
<div class="flex gap-8 overflow-x-auto no-scrollbar">
<a class="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 px-2 whitespace-nowrap" href="#">
<span class="text-sm font-bold">Toutes les catégories</span>
</a>
<a class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors" href="#">
<span class="text-sm font-bold">Dépenses</span>
</a>
<a class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors" href="#">
<span class="text-sm font-bold">Revenus</span>
</a>
<a class="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pb-3 px-2 whitespace-nowrap transition-colors" href="#">
<span class="text-sm font-bold">Inactives</span>
</a>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
<span class="material-symbols-outlined text-3xl">restaurant</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Alimentation</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">Dépense</span>
<span class="text-xs text-slate-400 dark:text-slate-500">12 transactions</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
<span class="material-symbols-outlined text-3xl">directions_car</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Transport</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">Dépense</span>
<span class="text-xs text-slate-400 dark:text-slate-500">8 transactions</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
<span class="material-symbols-outlined text-3xl">payments</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Salaire</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">Revenu</span>
<span class="text-xs text-slate-400 dark:text-slate-500">1 transaction</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
<span class="material-symbols-outlined text-3xl">home</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Logement</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">Dépense</span>
<span class="text-xs text-slate-400 dark:text-slate-500">2 transactions</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
<span class="material-symbols-outlined text-3xl">medical_services</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Santé</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">Dépense</span>
<span class="text-xs text-slate-400 dark:text-slate-500">3 transactions</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
<span class="material-symbols-outlined text-3xl">sports_esports</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Loisirs</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">Dépense</span>
<span class="text-xs text-slate-400 dark:text-slate-500">15 transactions</span>
</div>
</div>
<div class="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xl hover:border-primary/30 transition-all">
<div class="flex justify-between items-start mb-4">
<div class="size-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
<span class="material-symbols-outlined text-3xl">featured_seasonal_and_gifts</span>
</div>
<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-slate-400 hover:text-primary rounded-md hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
<h3 class="text-lg font-bold text-slate-900 dark:text-white">Cadeaux</h3>
<div class="flex items-center gap-2 mt-1">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">Revenu</span>
<span class="text-xs text-slate-400 dark:text-slate-500">2 transactions</span>
</div>
</div>
<div class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 cursor-pointer group transition-all">
<div class="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-3">
<span class="material-symbols-outlined text-2xl">add</span>
</div>
<span class="text-sm font-bold text-slate-500 dark:text-slate-400">Nouvelle catégorie</span>
</div>
</div>
<div class="mt-12">
<h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-4">Actions rapides</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<button class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left">
<div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">download</span>
</div>
<div>
<p class="text-slate-900 dark:text-white font-bold text-sm">Exporter les catégories</p>
<p class="text-slate-500 dark:text-slate-400 text-xs">Télécharger au format CSV ou JSON</p>
</div>
</button>
<button class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left">
<div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">auto_fix_high</span>
</div>
<div>
<p class="text-slate-900 dark:text-white font-bold text-sm">Auto-catégorisation</p>
<p class="text-slate-500 dark:text-slate-400 text-xs">Gérer les règles de détection</p>
</div>
</button>
<button class="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-left">
<div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">history</span>
</div>
<div>
<p class="text-slate-900 dark:text-white font-bold text-sm">Historique des modifications</p>
<p class="text-slate-500 dark:text-slate-400 text-xs">Voir les changements récents</p>
</div>
</button>
</div>
</div>
</main>
<footer class="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 px-6 md:px-20 bg-white dark:bg-background-dark text-center">
<p class="text-slate-500 dark:text-slate-400 text-sm">© 2026 Gestion Budgétaire Personnelle. Tous droits réservés.</p>
</footer>
</div>
</div>


</template>
