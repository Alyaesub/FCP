# ⚽ FC Provence — plateforme club

Application fullstack (React + Express) pour gérer un club de football : 📅 matchs, 👥 équipes, 📸 galeries et 📊 tableau de bord admin.

---

## Vue d’ensemble

-   Front-end Vite + React + TypeScript, styles SCSS modulaires.
-   API Express en TypeScript avec CORS et parsing JSON.
-   Connexion MySQL via `mysql2/promise` configurée par variables d’environnement.
-   Démarrage simultané front/back grâce à `concurrently`.

---

## Stack & versions

| Domaine         | Techno                       | Version                 |
| --------------- | ---------------------------- | ----------------------- |
| Front-end       | React                        | 19.1.1                  |
|                 | React DOM                    | 19.1.1                  |
|                 | Vite                         | 7.1.7                   |
|                 | TypeScript                   | 5.9.3                   |
|                 | ESLint / eslint-plugin-react | 9.36.0 / 5.2.0          |
|                 | SCSS                         | via Vite                |
| Back-end        | Node.js (recommandé)         | ≥ 18.x                  |
|                 | Express                      | 5.1.0                   |
|                 | cors                         | 2.8.5                   |
|                 | dotenv                       | 17.2.3                  |
|                 | ts-node-dev                  | 2.0.0                   |
|                 | TypeScript                   | 5.9.3                   |
| Outils racine   | concurrently                 | 9.2.1                   |
| Base de données | MySQL                        | à configurer via `.env` |

---

## Structure du projet

```
FCP/
├── client/           → Front React + Vite (TypeScript, SCSS)
│   └── src/
│       ├── components/
│       ├── styles/
│       ├── App.tsx
│       └── main.tsx
├── server/           → API Express + TypeScript
│   └── src/
│       ├── Controllers/
│       ├── Models/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── database/
│       └── app.ts
├── package.json      → scripts global + concurrently
└── README.md
```

---

## Prérequis

-   Node.js ≥ 18 (compatible Vite 7 et TypeScript 5.9)
-   npm (inclus avec Node)
-   MySQL accessible (local ou distant) si vous souhaitez tester la connexion BDD

---

## Installation

```bash
# 1) Installer les dépendances globales (concurrently)
npm install

# 2) Installer le front
cd client && npm install

# 3) Installer le back
cd ../server && npm install
```

### Configuration `server/.env`

```bash
DB_HOST=localhost
DB_USER=fcprovence_admin
DB_PASS=************
DB_NAME=********
```

Les valeurs par défaut sont prévues dans `connect.ts` mais il est conseillé d’utiliser un fichier `.env`.

---

## Démarrage

-   Lancer front + back depuis la racine : `npm run dev`

    -   Front : http://localhost:5173
    -   API : http://localhost:3000

-   Lancer uniquement le front : `npm run dev --prefix client`
-   Lancer uniquement l’API : `npm run dev --prefix server`

---

## Routes d’essai

| Méthode | URL         | Résultat attendu                            |
| ------- | ----------- | ------------------------------------------- |
| GET     | `/api/test` | `{ "message": "API opérationnelle OK BG" }` |
| GET     | `/`         | `Cannot GET /` (normal)                     |

---

## Backlog / suivi

-   [x] Initialisation front & back
-   [x] Base SCSS modulaire
-   [x] Communication front ↔ back (fetch)
-   [x] Lancement fullstack via `concurrently`
-   [ ] Connexion MySQL finalisée (migrations + seeds)
-   [ ] Routes CRUD (équipes, joueurs, matchs, galeries…)
-   [ ] Upload images
-   [ ] Interface d’administration sécurisée

---

## Déploiement

-

---

## Auteur

Alyaesub
