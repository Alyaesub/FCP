import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

    if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
      throw new Error("❌ Variables d'environnement DB manquantes");
    }

    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    console.log("✅ Connexion MySQL réussie !");
    return db;
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL :", error);
    throw error;
  }
}

export const dbPromise = connectDB();