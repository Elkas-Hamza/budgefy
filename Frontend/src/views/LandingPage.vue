<template>
<body class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
<div class="flex items-center gap-4 text-primary">
<div class="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">BudgetPro</h2>
</div>
<div class="flex flex-1 justify-end gap-8">
<nav class="hidden md:flex items-center gap-9">
<a class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Fonctionnalités</a>
<a class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Tarifs</a>
<a class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Sécurité</a>
<a class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">FAQ</a>
</nav>
<div class="flex gap-3">
<!-- dark and  light mode -->
<button @click="dark_light()"
  class="flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
  <span class="material-symbols-outlined dark:hidden">dark_mode</span>
  <span class="material-symbols-outlined hidden dark:block">light_mode</span>
</button>
<!-- dark and light mode end  -->

 <router-link
              class="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              to="/login"
            >
              <span>Se connecter</span>
</router-link>
 <router-link
              class="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              to="/login"
            >
              <span>Commencer</span>
            </router-link>
</div>
</div>
</header>
<main class="flex-1">
<div class="max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-24">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div class="flex flex-col gap-8 order-2 lg:order-1">
<div class="flex flex-col gap-4 text-left">
<span class="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 w-fit px-3 py-1 rounded-full">Liberté Financière</span>
<h1 class="text-slate-900 dark:text-white text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                                    Gestion Budgétaire <span class="text-primary">Personnelle</span>
</h1>
<p class="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
                                    Prenez le contrôle de vos finances. Suivez vos revenus, vos dépenses et améliorez votre santé financière avec notre outil intuitif et sécurisé.
                                </p>
</div>
<div class="flex flex-col sm:flex-row gap-4">
  <router-link
                  class="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform"
                  to="/login"
                >
                  Commencer Gratuitement
                </router-link>
<button class="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Voir la Démo
                                </button>
</div>
<div class="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
<div class="flex -space-x-2"><img alt="User 1" class="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/><img alt="User 2" class="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/><img alt="User 3" class="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
<span>Plus de 50,000 utilisateurs nous font confiance</span>
</div>
</div>
<div class="order-1 lg:order-2">
<div class="relative">
<div class="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-30"></div>
<div class="relative bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl aspect-video w-full flex items-center justify-center" data-alt="Dashboard showing financial charts and expense tracking graphs" style='background-image: url("https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); background-size: cover; background-position: center;'>
<div class="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
<div class="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-white text-4xl">play_arrow</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="bg-slate-50 dark:bg-slate-900/50 py-20">
<div class="max-w-7xl mx-auto px-6 md:px-20">
<div class="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
<h2 class="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight">
                                Pourquoi choisir BudgetPro ?
                            </h2>
<p class="text-slate-600 dark:text-slate-400 text-lg">
                                Tout ce dont vous avez besoin pour maîtriser votre argent sans effort au quotidien.
                            </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
<div class="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">query_stats</span>
</div>
<div class="flex flex-col gap-3">
<h3 class="text-slate-900 dark:text-white text-xl font-bold">Suivi Automatique</h3>
<p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                        Synchronisez vos comptes bancaires en toute sécurité et visualisez vos transactions en temps réel sans saisie manuelle.
                                    </p>
</div>
</div>
<div class="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
<div class="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">verified_user</span>
</div>
<div class="flex flex-col gap-3">
<h3 class="text-slate-900 dark:text-white text-xl font-bold">Sécurité Bancaire</h3>
<p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                        Vos données sont protégées par un chiffrement de niveau militaire (AES-256). Nous ne vendons jamais vos données.
                                    </p>
</div>
</div>
<div class="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
<div class="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">monitoring</span>
</div>
<div class="flex flex-col gap-3">
<h3 class="text-slate-900 dark:text-white text-xl font-bold">Analyses Détaillées</h3>
<p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                        Identifiez vos habitudes de consommation grâce à des graphiques intelligents et des rapports personnalisés.
                                    </p>
</div>
</div>
</div>
</div>
</div>
<div class="max-w-4xl mx-auto px-6 md:px-20 py-24">
<div class="text-center mb-16">
<h2 class="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight mb-4">Questions Fréquemment Posées</h2>
<p class="text-slate-600 dark:text-slate-400">Nous sommes là pour répondre à toutes vos interrogations sur BudgetPro.</p>
</div>
<div class="flex flex-col gap-4">
<details class="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 px-6 py-4" open="">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
<p class="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Mes données bancaires sont-elles en sécurité ?</p>
<div class="text-primary transition-transform duration-300 group-open:rotate-180">
<span class="material-symbols-outlined">expand_more</span>
</div>
</summary>
<div class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                Oui, la sécurité est notre priorité absolue. Nous utilisons un chiffrement AES-256 et des protocoles de sécurité TLS 1.3 de niveau bancaire pour garantir la protection totale de vos informations financières. Nous n'avons jamais accès à vos identifiants bancaires directs.
                            </div>
</details>
<details class="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 px-6 py-4">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
<p class="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Quelles sont les fonctionnalités principales ?</p>
<div class="text-primary transition-transform duration-300 group-open:rotate-180">
<span class="material-symbols-outlined">expand_more</span>
</div>
</summary>
<div class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                BudgetPro offre une synchronisation bancaire automatique, la catégorisation intelligente des dépenses par IA, la création de budgets mensuels, le suivi d'objectifs d'épargne, et des analyses graphiques avancées pour visualiser votre patrimoine net.
                            </div>
</details>
<details class="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 px-6 py-4">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
<p class="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Combien coûte l'application ?</p>
<div class="text-primary transition-transform duration-300 group-open:rotate-180">
<span class="material-symbols-outlined">expand_more</span>
</div>
</summary>
<div class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                Nous proposons une version gratuite limitée pour les débutants. Notre offre "Premium" est à 4,99€/mois et débloque la synchronisation automatique illimitée et les rapports avancés. Une offre "Famille" est également disponible pour 9,99€/mois.
                            </div>
</details>
<details class="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 px-6 py-4">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
<p class="text-slate-900 dark:text-white text-lg font-semibold leading-normal">Puis-je exporter mes données ?</p>
<div class="text-primary transition-transform duration-300 group-open:rotate-180">
<span class="material-symbols-outlined">expand_more</span>
</div>
</summary>
<div class="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                Absolument. Vos données vous appartiennent. Vous pouvez exporter l'intégralité de vos transactions et de vos rapports au format CSV, Excel ou PDF à tout moment depuis vos réglages.
                            </div>
</details>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 md:px-20 py-16">
<div class="bg-primary rounded-[2rem] p-10 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
<div class="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
<h2 class="text-white text-3xl md:text-5xl font-black leading-tight max-w-2xl relative z-10">
                            Prêt à transformer votre santé financière ?
                        </h2>
<p class="text-white/90 text-lg md:text-xl max-w-xl relative z-10">
                            Rejoignez des milliers de personnes qui ont déjà repris le contrôle sur leur argent. Essai gratuit de 14 jours, sans carte bancaire.
                        </p>
  <router-link
              class="bg-white text-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-slate-50 transition-colors shadow-2xl relative z-10"
              to="/login"
            >
              Commencer maintenant
            </router-link>
</div>
</div>
</main>
<footer class="border-t border-slate-200 dark:border-slate-800 py-12 px-6 md:px-20 bg-white dark:bg-background-dark">
<div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
<div class="col-span-2 md:col-span-1 flex flex-col gap-4">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined font-bold">account_balance_wallet</span>
<span class="font-bold text-xl text-slate-900 dark:text-white">BudgetPro</span>
</div>
<p class="text-slate-500 text-sm leading-relaxed">
                            L'application intelligente pour gérer votre argent, épargner davantage et vivre sereinement.
                        </p>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-bold text-slate-900 dark:text-white">Produit</h4>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Fonctionnalités</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Tarifs</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Sécurité</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-bold text-slate-900 dark:text-white">Société</h4>
<a class="text-slate-500 text-sm hover:text-primary" href="#">À propos</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Contact</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Blog</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="font-bold text-slate-900 dark:text-white">Légal</h4>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Confidentialité</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Mentions légales</a>
<a class="text-slate-500 text-sm hover:text-primary" href="#">Cookies</a>
</div>
</div>
<div class="max-w-7xl mx-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
<p>© 2026 Gestion Budgétaire Personnelle. Tous droits réservés.</p>
<div class="flex gap-6">
<a class="hover:text-primary" href="#">Twitter</a>
<a class="hover:text-primary" href="#">LinkedIn</a>
<a class="hover:text-primary" href="#">Facebook</a>
</div>
</div>
</footer>
</div>
</div>
</body>
</template>

<script setup>
const dark_light = window.dark_light
</script>
