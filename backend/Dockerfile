# backend/Dockerfile
# Étape 1 : Build et génération Prisma
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances (INCLUT devDependencies pour générer Prisma)
RUN npm ci

# Génération du client Prisma
RUN npx prisma generate

# Copie du reste du code source
COPY . .

# Étape 2 : Image de production
FROM node:20-alpine
WORKDIR /app

# Installation uniquement des dépendances de production
COPY package*.json ./
RUN npm ci --only=production

# Copie des fichiers générés Prisma depuis l'étape builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/src/generated ./src/generated

# Copie du code source
COPY . .

# Création d'un utilisateur non-root pour plus de sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Exposition du port
EXPOSE 3000

# Commande de démarrage : applique les migrations puis démarre
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]