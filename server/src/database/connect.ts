import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Création POOL de connexions
function createDBPool() {
  const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

  console.log("🔍 CONFIGURATION POOL MYSQL:", { DB_HOST, DB_USER, DB_NAME });

  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error("❌ Variables d'environnement DB manquantes");
  }

  const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    charset: 'utf8mb4',
    
    // PARAMÈTRES ANTI-TIMEOUT
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,          //  Garde les connexions vivantes
    keepAliveInitialDelay: 0,
    connectTimeout: 10000,           // 10 secondes pour établir la connexion
  });

  // Test de connexion au démarrage
  pool.getConnection()
    .then(async (connection) => {
      console.log("✅ Pool MySQL créé avec succès");
      await connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
      console.log("✅ Encodage UTF-8 configuré");
      connection.release();
    })
    .catch((error) => {
      console.error("❌ Erreur pool MySQL:", error);
      process.exit(1);
    });

  return pool;
}

const pool = createDBPool();

export const dbPromise = Promise.resolve(pool);