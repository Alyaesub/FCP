# ⚽ FC Provence — Plateforme Club

Application fullstack (React + Express) pour gérer un club de football : 📅 matchs, 👥 équipes, 📸 galeries et 📊 tableau de bord admin.

---

## Vue d'ensemble

-   **Front-end** : Vite + React + TypeScript, styles SCSS modulaires avec méthodologie BEM
-   **API** : Express en TypeScript avec CORS et parsing JSON
-   **Base de données** : MySQL via `mysql2/promise` configurée par variables d'environnement
-   **Démarrage** : Simultané front/back grâce à `concurrently`
-   **Routing** : React Router DOM pour navigation SPA
-   **Formulaires** : React Hook Form + Zod pour validation

---

## Stack & versions

| Domaine       | Techno                       | Version                 |
| ------------- | ---------------------------- | ----------------------- |
| **Front-end** | React                        | 19.1.1                  |
|               | React DOM                    | 19.1.1                  |
|               | React Router DOM             | 6.x                     |
|               | Vite                         | 7.1.7                   |
|               | TypeScript                   | 5.9.3                   |
|               | SCSS                         | via sass                |
|               | Axios                        | ^1.x                    |
|               | React Hook Form              | ^7.x                    |
|               | Zod                          | ^3.x                    |
|               | ESLint / eslint-plugin-react | 9.36.0 / 5.2.0          |
| **Back-end**  | Node.js (recommandé)         | ≥ 18.x                  |
|               | Express                      | 5.1.0                   |
|               | cors                         | 2.8.5                   |
|               | dotenv                       | 17.2.3                  |
|               | ts-node-dev                  | 2.0.0                   |
|               | TypeScript                   | 5.9.3                   |
| **Outils**    | concurrently                 | 9.2.1                   |
| **BDD**       | MySQL                        | à configurer via `.env` |

---

## Prérequis

-   **Node.js** ≥ 18 (compatible Vite 7 et TypeScript 5.9)
-   **npm** (inclus avec Node)
-   **MySQL** accessible (local ou distant)

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
DB_USER=***********
DB_PASS=************
DB_NAME=fcprovence
PORT=3000
```

Les valeurs par défaut sont prévues dans `connect.ts` mais il est conseillé d'utiliser un fichier `.env`.

---

## Démarrage

-   **Lancer front + back** depuis la racine :

```bash
    npm run dev
```

    -   Front : http://localhost:5173
    -   API : http://localhost:3000

-   **Lancer uniquement le front** :

```bash
    npm run dev --prefix client
```

-   **Lancer uniquement l'API** :

```bash
    npm run dev --prefix server
```

---

## Design System

### Couleurs du club

| Couleur             | Code hex  | Usage                               |
| ------------------- | --------- | ----------------------------------- |
| Vert du club        | `#02572d` | Fond header/footer, boutons primary |
| Jaune/Or du club    | `#fab131` | Accents, boutons secondary, titres  |
| Fond clair          | `#f9f9f9` | Arrière-plans sections              |
| Texte principal     | `#333333` | Texte général                       |
| Accent bleu moderne | `#dceeff` | Accents secondaires (optionnel)     |

### Méthodologie CSS

-   **BEM** (Block Element Modifier) pour nommer les classes
-   **SCSS** avec variables globales (`:root`)
-   **Responsive** : mobile-first avec breakpoints à 600px et 968px

Exemple :

```scss
.header {
	&__container {
	}
	&__logo {
	}
	&__nav {
	}
}
```

---

## Scripts disponibles

### Racine

-   `npm run dev` : Lance front + back simultanément

### Client

-   `npm run dev` : Serveur de développement Vite
-   `npm run build` : Build de production
-   `npm run preview` : Prévisualisation du build
-   `npm run lint` : Linter ESLint

### Server

-   `npm run dev` : Serveur Express avec hot-reload (ts-node-dev)
-   `npm run build` : Compilation TypeScript
-   `npm start` : Lance le serveur compilé (production)

---

## Conventions de code

-   **TypeScript** : Typage strict activé
-   **ESLint** : Configuration React + TypeScript
-   **Prettier** : Formatage automatique (recommandé)
-   **Nommage** :
    -   Composants : PascalCase (`Header.tsx`)
    -   Fichiers SCSS : kebab-case avec underscore (`_header.scss`)
    -   Classes CSS : BEM (`header__logo`, `btn--primary`)
-   **Architecture** : Séparation logique/style (composant .tsx + fichier .scss séparé)

---

## Ressources & Documentation

-   [React Documentation](https://react.dev/)
-   [Vite Documentation](https://vitejs.dev/)
-   [React Router Documentation](https://reactrouter.com/)
-   [TypeScript Documentation](https://www.typescriptlang.org/)
-   [SCSS Documentation](https://sass-lang.com/)
-   [BEM Methodology](http://getbem.com/)

---

## Auteur

**Alyaesub**

---

## Licence

Projet personnel - Tous droits réservés
