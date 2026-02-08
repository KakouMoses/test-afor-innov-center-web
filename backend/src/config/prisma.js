// src/config/prisma.js
import { PrismaClient } from '../generated/prisma/client.js'; // Notez le nouveau chemin
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// Création de l'adaptateur puis du client
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });