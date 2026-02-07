// src/controllers/postController.js
import { prisma } from '../config/prisma.js';

// Récupérer TOUS les posts de l'utilisateur connecté
export const getPosts = async (req, res) => {
  try {
    // req.userId est défini par le middleware auth.js
    const posts = await prisma.post.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }, // Du plus récent au plus ancien
      select: { // Sécurité : on ne renvoie que les données nécessaires
        id: true,
        content: true,
        createdAt: true,
        user: { select: { username: true } } // Inclut le pseudonyme (username) de l'auteur
      }
    });
    res.json(posts);
  } catch (error) {
    console.error('Erreur getPosts:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un NOUVEAU post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Validation basique
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Le contenu ne peut pas être vide' });
    }

    const post = await prisma.post.create({
      data: {
        content: content.trim(),
        userId: req.userId // Lié à l'utilisateur connecté
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: { select: { username: true } }
      }
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Erreur createPost:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// SUPPRIMER un post (si l'utilisateur en est le propriétaire)
export const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    
    // Vérifie que le post existe ET appartient à l'utilisateur
    const post = await prisma.post.findFirst({
      where: { id: postId, userId: req.userId }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post non trouvé' });
    }
    
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).send(); // Succès sans contenu
  } catch (error) {
    console.error('Erreur deletePost:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};