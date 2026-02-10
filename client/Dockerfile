# ========================================
# ÉTAPE 1 : BUILD (compilation Vite)
# ========================================
FROM node:20-alpine AS builder

# Argument pour l'URL de l'API
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tout le code source
COPY . .

# Build Vite pour la production (crée dist/)
RUN npm run build

# ========================================
# ÉTAPE 2 : PRODUCTION (servir avec Nginx)
# ========================================
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx (démarre automatiquement)
CMD ["nginx", "-g", "daemon off;"]