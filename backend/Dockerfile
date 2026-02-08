# backend/Dockerfile (version simplifiée)
FROM node:20-alpine
WORKDIR /app

# Copie des fichiers essentiels d'abord
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances (production + dev pour générer Prisma)
RUN npm ci

# Génération du client Prisma
RUN npx prisma generate

# Copie du reste du code
COPY . .

# Suppression des devDependencies optionnelle (pour une image plus petite)
# RUN npm prune --production

# Utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]