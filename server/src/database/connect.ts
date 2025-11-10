import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "fcprovence_admin",
      password: process.env.DB_PASS || "FcProvence2025!",
      database: process.env.DB_NAME || "fcprovence",
    });

    console.log("✅ Connexion MySQL réussie !");
    return db;
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL :", error);
    throw error;
  }
}

export const dbPromise = connectDB();