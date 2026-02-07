# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm install

# Génération du client Prisma
RUN npx prisma generate

# Copie du reste du code source
COPY . .

# Commande pour appliquer les migrations puis lancer le serveur
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]