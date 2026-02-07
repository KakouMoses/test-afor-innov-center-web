import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import des routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import authMiddleware from './middleware/auth.js';

const app = express();

// Middleware globaux
app.use(cors()); // Autorise les requêtes depuis votre frontend (ex: localhost:5173)
app.use(express.json()); // Permet de lire le JSON des requêtes

// Routes publiques (sans protection)
app.use('/api/auth', authRoutes);

// Routes protégées (nécessitent un token JWT valide)
app.use('/api/posts', authMiddleware, postRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.post('/api/test', function(req, res){
  res.json({ received: req.body });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, function(){
  console.log(`Backend running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({ error: 'Une erreur interne est survenue' });
});









