// src/routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Crée un nouvel utilisateur
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Authentifie un utilisateur et retourne un token JWT
 */
router.post('/login', login);

export default router;