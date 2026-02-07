// src/controllers/authController.js
import { prisma } from '../config/prisma.js'; // Import depuis le fichier config
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '7d';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis."})
    }
    
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet pseudo existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.status(201).json({ message: "Utilisateur créé avec succès.",id: user.id, username: user.username });
  } catch (error) {    
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
  }
};

/**
 * Connexion d'un utilisateur
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation basique
    if (!username || !password) {
      return res.status(400).json({ error: 'Username et mot de passe requis.' });
    }

    // Cherche l'utilisateur par username
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // Si l'utilisateur n'existe pas ou que le mot de passe est incorrect
    if (!user) {
      // Pour des raisons de sécurité, on ne précise pas si c'est l'username ou le mot de passe qui est incorrect
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    // Compare le mot de passe fourni avec le hash stocké
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    // Crée un token JWT avec l'ID utilisateur
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Retourne le token et les infos utilisateur
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Connexion réussie.',
      token,
      user: userWithoutPassword,
      expiresIn: JWT_EXPIRES_IN
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};