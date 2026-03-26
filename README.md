# Budgefy

Plateforme de gestion financiere composee de trois volets:
- un backend API en Laravel
- un frontend en Vue 3 + Vite
- un espace de tests/documentation

## Structure du projet

- `Backend/`: application Laravel (API, logique metier, base de donnees, tests PHP).
- `Frontend/`: interface utilisateur Vue 3.
- `Testing/`: notes et organisation autour des tests.
- `conception/`: documentation UML (cas d'utilisation, classes, sequences).

## Prerequis

- PHP 8.3+
- Composer
- Node.js 18+ (recommande)
- npm
- Un SGBD configure dans `Backend/.env` (ou SQLite)

## Installation

### 1. Backend

Depuis `Backend/`:

```bash
composer run setup
```

Cette commande:
- installe les dependances PHP
- cree `.env` si absent
- genere la cle d'application
- execute les migrations
- installe les dependances front du backend
- compile les assets backend

### 2. Frontend

Depuis `Frontend/`:

```bash
npm install
```

## Lancer le projet en developpement

### Backend (serveur Laravel + queue + logs + Vite backend)

Depuis `Backend/`:

```bash
composer run dev
```

### Frontend Vue

Depuis `Frontend/`:

```bash
npm run dev
```

Le frontend tourne en general sur un port Vite (souvent 5173) et le backend Laravel sur 8000, selon votre configuration locale.

## Build production

### Backend assets

Depuis `Backend/`:

```bash
npm run build
```

### Frontend

Depuis `Frontend/`:

```bash
npm run build
```

## Tests

### Tests Laravel

Depuis `Backend/`:

```bash
composer run test
```

ou:

```bash
php artisan test
```

## Documentation utile

- UML et conception: voir `conception/README.md`
- Notes tests: voir `Testing/README.md`
- Details backend Laravel: voir `Backend/README.md`
- Details frontend Vue: voir `Frontend/README.md`

## Flux de travail recommande

1. Configurer et lancer le backend.
2. Lancer le frontend Vue.
3. Verifier la connexion frontend/backend.
4. Executer les tests backend avant chaque livraison.

## Licence

Ce projet est destine a un cadre academique/projet PFA. Adaptez la licence selon vos besoins avant une publication publique.
