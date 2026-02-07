// src/routes/posts.js
import express from 'express';
import { getPosts, createPost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Toutes ces routes sont protégées par le middleware d'authentification
router.get('/', getPosts);       // GET /api/posts
router.post('/', createPost);    // POST /api/posts
router.delete('/:id', deletePost); // DELETE /api/posts/123

export default router;