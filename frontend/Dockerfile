# frontend/Dockerfile
# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (y compris devDependencies pour la build)
RUN npm ci

# Copie du reste du code source
COPY . .

# Build de l'application pour production
RUN npm run build

# Étape 2 : Serveur de production léger
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copie les fichiers buildés depuis l'étape builder
COPY --from=builder /app/dist .

# Copie la configuration nginx personnalisée (optionnel)
# COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

# Démarrage de nginx
CMD ["nginx", "-g", "daemon off;"]