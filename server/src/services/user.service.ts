// server/src/services/user.service.ts

import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { dbPromise } from '../database/connect';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = '1d';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff';
  created_at?: Date;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'staff';
}

interface LoginData {
  email: string;
  password: string;
}

const generateToken = (userId: number, email: string, role: string): string => {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const register = async (data: RegisterData): Promise<{ id: number; token: string }> => {
  const { name, email, password, role = 'staff' } = data;

  const db = await dbPromise; 

  // 1. Vérifier si l'email existe déjà
  const [existingUsers] = await db.query<RowDataPacket[]>(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );

  if (existingUsers.length > 0) {
    throw new Error('Cet email est déjà utilisé');
  }

  // 2. Hasher le mot de passe
  const hashedPassword = await hashPassword(password);

  // 3. Insérer l'utilisateur en BDD
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );


  const userId = result.insertId;

  // 4. Générer un token JWT
  const token = generateToken(userId, email, role);

  return { id: userId, token };
};

export const login = async (data: LoginData): Promise<{ user: Omit<User, 'password'>; token: string }> => {
  const { email, password } = data;

  const db = await dbPromise; 

  // 1. Récupérer l'utilisateur par email
  const [users] = await db.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (users.length === 0) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const user = users[0] as User;

  // 2. Comparer le mot de passe
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // 3. Générer un token JWT
  const token = generateToken(user.id, user.email, user.role);

  // 4. Retourner les infos utilisateur (sans le password) + token
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const db = await dbPromise; 

  const [users] = await db.query<RowDataPacket[]>(
    'SELECT id, name, email, role, created_at FROM users'
  );

  return users as Omit<User, 'password'>[];
};

export const getUserById = async (id: number): Promise<Omit<User, 'password'> | null> => {
  const db = await dbPromise; 

  const [users] = await db.query<RowDataPacket[]>(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );

  if (users.length === 0) {
    return null;
  }

  return users[0] as Omit<User, 'password'>;
};