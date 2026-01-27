import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Actualite {
  id?: number;
  titre: string;
  contenu: string;
  image?: string;
  date_publication?: string;
  auteur?: string;
}

// GET all
export const getAllActualites = async (): Promise<Actualite[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM actualites ORDER BY date_publication DESC"
  );
  return rows as Actualite[];
};

// GET by ID
export const getActualiteById = async (id: number): Promise<Actualite | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM actualites WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Actualite) : null;
};

// POST (create)
export const createActualite = async (data: Actualite): Promise<Actualite> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO actualites (titre, contenu, image, auteur)
     VALUES (?, ?, ?, ?)`,
    [
      data.titre,
      data.contenu,
      data.image,
      data.auteur,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateActualite = async (
  id: number,
  data: Partial<Actualite>
): Promise<Actualite | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE actualites SET 
      titre = COALESCE(?, titre),
      contenu = COALESCE(?, contenu),
      image = COALESCE(?, image),
      auteur = COALESCE(?, auteur)
    WHERE id = ?`,
    [
      data.titre,
      data.contenu,
      data.image,
      data.auteur,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getActualiteById(id);
};

// DELETE
export const deleteActualite = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM actualites WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};