# ========================================
# ÉTAPE 1 : BUILD (compilation TypeScript)
# ========================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (y compris devDependencies pour build)
RUN npm ci

# Copier tout le code source
COPY . .

# Compiler TypeScript → JavaScript (créer dist/)
RUN npm run build

# ========================================
# ÉTAPE 2 : PRODUCTION (image finale légère)
# ========================================
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape builder
COPY package*.json ./

# Installer SEULEMENT les dépendances de production (sans devDependencies)
RUN npm ci --only=production

# Copier le code compilé depuis l'étape builder
COPY --from=builder /app/dist ./dist

# Copier les fichiers SQL (migrations et seeds)
COPY --from=builder /app/src/database ./src/database

# Exposer le port du backend (défini dans .env)
EXPOSE 3000

# Lancer le serveur Node.js
CMD ["node", "dist/app.js"]