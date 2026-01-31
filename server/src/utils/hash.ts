// server/src/utils/hash.ts

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashe un mot de passe en clair
 * @param plainPassword - Mot de passe en clair
 * @returns Mot de passe hashé
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compare un mot de passe en clair avec un hash
 * @param plainPassword - Mot de passe en clair
 * @param hashedPassword - Mot de passe hashé
 * @returns true si les mots de passe correspondent, false sinon
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};