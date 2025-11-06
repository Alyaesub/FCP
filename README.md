# ⚽ Site du Club FC Provence

Application fullstack moderne pour gérer un club de football local :  
📅 matchs, 👥 équipes, 📸 galeries, 📊 tableau de bord administrateur.

---

## 🚀 Stack technique

| Côté            | Techno                            |
| --------------- | --------------------------------- |
| Front-end       | React + TypeScript + Vite + SCSS  |
| Back-end        | Node.js + Express + TypeScript    |
| Base de données | MySQL (à venir)                   |
| Environnement   | Vite + ts-node-dev + Concurrently |

---

## 📁 Structure du projet

```
FCP/
├── client/        → Front React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── server/        → Back Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   └── app.ts
│   └── package.json
├── package.json
└── README.md
```

---

## 🧪 Lancer le projet en développement

### 1. Installer toutes les dépendances

```bash
# Depuis la racine
cd FCP

# Installer les dépendances du root (pour concurrently)
npm install

# Installer côté front
cd client
npm install

# Installer côté back
cd ../server
npm install
```

### 2. Lancer le front + le back en 1 seule commande

Depuis la **racine du projet `FCP/`** :

```bash
npm run dev
```

-   Le front sera dispo sur : [http://localhost:5173](http://localhost:5173)
-   Le back sur : [http://localhost:3000](http://localhost:3000)

---

## 🔍 Routes test

| Méthode | URL         | Résultat attendu                    |
| ------- | ----------- | ----------------------------------- |
| `GET`   | `/api/test` | `{ message: "API opérationnelle" }` |
| `GET`   | `/`         | `Cannot GET /` (normal)             |

---

## ✅ Fonctionnalités prévues

-   [x] Initialisation projet front & back
-   [x] Structure modulaire SCSS
-   [x] Communication front ↔ back (test `fetch`)
-   [x] Lancement fullstack via `concurrently`
-   [ ] Connexion à la base de données
-   [ ] Création de routes CRUD (équipes, joueurs, matchs, galeries…)
-   [ ] Upload images
-   [ ] Interface d’administration sécurisée

---

## 🧠 Déploiment

-   Déploiement prévue sur Vercel (front) + Render ou O2Switch (back)

---

## 🙌 Auteur

Développé par [Pascal Reynier](https://github.com/Alyaesub)  
Projet d’apprentissage et de professionnalisation front + back
