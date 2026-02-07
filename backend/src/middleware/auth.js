// src/middleware/auth.js
import jwt from 'jsonwebtoken';

/**
 * Middleware d'authentification par JWT
 * 1. Récupère le token du header Authorization
 * 2. Le vérifie avec la clé secrète
 * 3. Ajoute l'ID utilisateur décodé à l'objet `req`
 * 4. Passe au prochain middleware ou contrôleur
 */
const authMiddleware = (req, res, next) => {
  // Récupère le token du format "Bearer <token>"
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  // Si pas de token, refuse l'accès
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérifie et décode le token avec votre clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajoute l'ID utilisateur décodé à l'objet de requête
    // pour qu'il soit disponible dans les contrôleurs
    req.userId = decoded.userId;
    
    // Passe au middleware ou contrôleur suivant
    next();
  } catch (error) {
    // Token invalide ou expiré
    console.error('Erreur de vérification du token:', error.message);
    
    // Envoie une erreur 403 (Forbidden) pour un token invalide
    res.status(403).json({ error: 'Token invalide ou expiré.' });
  }
};

export default authMiddleware;