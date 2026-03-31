<template>
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 bg-white dark:bg-background-dark sticky top-0 z-50">
<div class="flex items-center gap-8">
<div class="flex items-center gap-4 text-primary">
<div class="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">GBP</h2>
</div>
<div class="hidden md:flex items-center gap-6">
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/dashboard">Tableau de bord</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/transactions">Transactions</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/categories">Catégories</router-link>
<router-link class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/settings">Paramètres</router-link>
</div>
</div>
<div class="flex items-center gap-4">
<label class="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
<div class="text-slate-400 flex items-center justify-center pl-3">
<span class="material-symbols-outlined text-sm">search</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm" placeholder="Rechercher..." value=""/>
</div>
</label>
<div class="flex gap-2">
<button class="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined">help</span>
</button>
</div>
<div class="size-10 rounded-full bg-primary/20 border-2 border-primary/40 overflow-hidden" data-alt="Photo de profil de l'utilisateur" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWnNtr5Fjx9BsR5-RNDQlECf7MP0m2vgp7NHlWeP_YL2TXh6CTHLv1utGa1JZBhASrM1wkD3ZvsrZyDYE-pQTGGxT6fsr2sjyKiIsdAY0N-4qkEHTpzzjylnGsAjsK99JjEiXdkUOsiS2J4UUZa_evswUaoDTNvinEsSu-6RJOnDsldEYa7UJ75sGrNKZPQLDqjZtbkGPIWp-J-_oZjXBQGQ_VY1tK9yXYfV-XWF2sr9zB2ExBBpecZrDkWjq7ni_3_Zj4mToARf65');"></div>
</div>
</header>
<main class="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
<div class="flex flex-col lg:flex-row gap-10">
<aside class="w-full lg:w-64 flex flex-col gap-2">
<div class="mb-6">
<h1 class="text-2xl font-black tracking-tight">Paramètres</h1>
<p class="text-slate-500 dark:text-slate-400 text-sm">Gérez votre compte et vos préférences</p>
</div>
<nav class="flex flex-col gap-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20" href="#profil">
<span class="material-symbols-outlined">person</span>
<span>Profil</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all" href="#preferences">
<span class="material-symbols-outlined">settings</span>
<span>Préférences</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all" href="#securite">
<span class="material-symbols-outlined">shield</span>
<span>Sécurité</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all" href="#notifications">
<span class="material-symbols-outlined">notifications_active</span>
<span>Notifications</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all" href="#abonnement">
<span class="material-symbols-outlined">credit_card</span>
<span>Abonnement</span>
</a>
</nav>
<div class="mt-10 p-4 rounded-xl bg-primary/10 border border-primary/20">
<p class="text-xs font-bold text-primary uppercase tracking-wider mb-2">Besoin d'aide ?</p>
<p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Consultez notre centre d'aide ou contactez le support.</p>
<button class="w-full py-2 bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors">Support client</button>
</div>
</aside>
<div class="flex-1 flex flex-col gap-12">
<section class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm" id="profil">
<div class="flex items-center justify-between mb-8">
<div>
<h2 class="text-xl font-bold">Mon Profil</h2>
<p class="text-slate-500 dark:text-slate-400 text-sm">Informations personnelles publiques et privées</p>
</div>
<button class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">Enregistrer</button>
</div>
<div class="flex flex-col md:flex-row gap-8 items-start">
<div class="relative group">
<div class="size-32 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 overflow-hidden" data-alt="Photo de profil détaillée" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgvxBtR7VfF9LV7yXfXxVAuByQpw6u9regpxcmXJIjHCVdhcaOCxFouw0DR6QOSlEXJ1UtazKbjcDdthzMspe10KVY-_1c7Ho-7cxI4hOgT8DM6CAwgOJ3Xe8BGlLhM5g-4bpxQGQh3dlw4xRb0FYNsbif_wSkNRKg_RkKi2nbzVc23Gxxf0WIh8vERFaa8wweP2hX3zR2P9j_f8j8xUY_jqPyZ4ckcD1r4Y6zcvAxp8PInvBnl9JE-adc_6_TmpIli9CU99OEH7PO');"></div>
<button class="absolute bottom-0 right-0 size-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-base">photo_camera</span>
</button>
</div>
<div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Prénom</label>
<input class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary" type="text" value="Jean"/>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Nom de famille</label>
<input class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary" type="text" value="Dupont"/>
</div>
<div class="flex flex-col gap-2 md:col-span-2">
<label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
<input class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary" type="email" value="jean.dupont@email.com"/>
</div>
</div>
</div>
</section>
<section class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm" id="preferences">
<div class="mb-8">
<h2 class="text-xl font-bold">Préférences de l'application</h2>
<p class="text-slate-500 dark:text-slate-400 text-sm">Personnalisez votre expérience utilisateur</p>
</div>
<div class="space-y-6">
<div class="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
<div class="flex items-center gap-4">
<div class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined">payments</span>
</div>
<div>
<p class="font-semibold">Devise principale</p>
<p class="text-xs text-slate-500">Utilisée pour vos rapports et totaux</p>
</div>
</div>
<select class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px]">
<option value="EUR">Euro (€)</option>
<option value="USD">Dollar ($)</option>
<option value="GBP">Livre (£)</option>
</select>
</div>
<div class="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
<div class="flex items-center gap-4">
<div class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined">language</span>
</div>
<div>
<p class="font-semibold">Langue</p>
<p class="text-xs text-slate-500">Interface utilisateur</p>
</div>
</div>
<select class="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-medium focus:ring-primary min-w-[120px]">
<option value="FR">Français</option>
<option value="EN">English</option>
<option value="ES">Español</option>
</select>
</div>
<div class="flex items-center justify-between py-4">
<div class="flex items-center gap-4">
<div class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined">dark_mode</span>
</div>
<div>
<p class="font-semibold">Mode Sombre</p>
<p class="text-xs text-slate-500">Activer le thème sombre automatiquement</p>
</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>
<section class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm" id="securite">
<div class="mb-8">
<h2 class="text-xl font-bold">Sécurité</h2>
<p class="text-slate-500 dark:text-slate-400 text-sm">Gérez l'accès à votre compte financier</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-primary">key</span>
<h3 class="font-bold">Mot de passe</h3>
</div>
<p class="text-sm text-slate-500 mb-4">Dernière modification il y a 3 mois. Utilisez un mot de passe robuste.</p>
<button class="w-full py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                    Changer le mot de passe
                                </button>
</div>
<div class="p-6 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-green-500">verified_user</span>
<h3 class="font-bold">Double Authentification (2FA)</h3>
</div>
<p class="text-sm text-slate-500 mb-4">Renforcez la sécurité avec un code envoyé sur votre mobile.</p>
<div class="flex items-center justify-between">
<span class="text-xs font-bold text-green-500 uppercase">Activé</span>
<button class="text-sm text-primary font-bold hover:underline">Configurer</button>
</div>
</div>
</div>
<div class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
<div class="flex items-center justify-between">
<div>
<h3 class="font-bold text-red-500">Zone de danger</h3>
<p class="text-sm text-slate-500">Suppression définitive de votre compte et de toutes vos données.</p>
</div>
<button class="px-6 py-2.5 border-2 border-red-500/20 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
                                    Supprimer le compte
                                </button>
</div>
</div>
</section>
</div>
</div>
</main>
<footer class="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark text-center">
<p class="text-slate-500 dark:text-slate-400 text-sm">© 2026 Gestion Budgétaire Personnelle. Tous droits réservés.</p>
</footer>
</div>


</template>
