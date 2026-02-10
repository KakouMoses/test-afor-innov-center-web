# test-afor-innov-center-web

## Description

Ce projet est une application web full-stack basique pour une webapp de notes minimaliste. Il comprend un frontend en React pour l'interface utilisateur, un backend en Node.js avec Express pour la logique serveur, et une base de données PostgreSQL gérée via Prisma ORM. L'application est conteneurisée avec Docker pour faciliter le déploiement et le développement.

Le but principal de ce projet est de démontrer ma capacité à réaliser une plateforme web basique, permettant de gérer des fonctionnalités telles que l'authentification des utilisateurs, la gestion de données, et des interactions frontend-backend. 

## Technologies Utilisées

### Frontend
- React.js (v19)
- Vite (pour le build et le développement)
- Tailwind CSS (pour le styling)
- Axios (pour les requêtes API)
- Framer Motion (pour les animations)
- Lucide React (pour les icônes)
- Autres : Radix UI, Class Variance Authority, etc.

### Backend
- Node.js avec Express.js
- Prisma ORM (pour la gestion de la base de données)
- PostgreSQL (base de données)
- JWT (pour l'authentification)
- Bcrypt (pour le hachage des mots de passe)
- CORS et Dotenv (pour la configuration)

### Autres
- Docker et Docker Compose (pour la conteneurisation)
- Nodemon (pour le développement backend)

## Prérequis

- Docker et Docker Compose installés sur votre machine.
- Node.js (v20 ou supérieur) pour le développement local sans Docker.
- Git pour cloner le repository.

## Installation

1. Clonez le repository :
   ```
   git clone https://github.com/KakouMoses/test-afor-innov-center-web.git
   cd test-afor-innov-center-web
   ```

2. Configurez les variables d'environnement :
   - Dans le dossier `backend`, créez un fichier `.env` avec les variables nécessaires (ex. : `DATABASE_URL`, `JWT_SECRET`).
  
3. Importez les différentes dépendances du frontend et du backend :
   ```
   cd frontend
   npm install
   cd backend
   npm install
   ```
4. 

5. Construisez et lancez les conteneurs avec Docker Compose :
   ```
   docker-compose up --build
   ```
   - Cela lancera :
     - PostgreSQL sur le port 5432.
     - Backend sur le port 3001.
     - Frontend sur le port 5173 (ou 80 en production).
     - Prisma Studio (optionnel) sur le port 5555.

6. Appliquez les migrations Prisma (depuis le conteneur backend ou localement) :
   ```
   docker exec -it aforapp-backend npx prisma migrate deploy
   ```

## Utilisation

- Accédez au frontend : [http://localhost:5173](http://localhost:5173)
- API backend : [http://localhost:3001/api](http://localhost:3001/api)
- Prisma Studio (pour explorer la BDD) : [http://localhost:5555](http://localhost:5555)

Pour le développement :
- Backend : `cd backend && npm run dev`
- Frontend : `cd frontend && npm run dev`

## Structure du Projet

- **backend/** : Contient le code serveur (Express, Prisma).
  - `src/app.js` : Point d'entrée principal.
  - `prisma/` : Schéma et migrations de la base de données.
- **frontend/** : Contient l'application React.
  - `src/` : Composants, pages, et logique frontend.
- **db/** : Données PostgreSQL (gérées par Docker).
- **docker-compose.yaml** : Configuration des services Docker.
- **.gitignore** : Fichiers à ignorer par Git.

## Contribution

Les contributions sont bienvenues ! Veuillez forker le repository, créer une branche pour vos modifications, et soumettre une pull request.

## Licence

Ce projet est sous licence ISC (voir le fichier `backend/package.json` pour plus de détails).

## Auteur

Kakou Kacou Moïse  
Contact : [GitHub](https://github.com/KakouMoses)
