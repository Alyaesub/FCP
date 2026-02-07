import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Galerie {
  id?: number;
  titre: string;
  description?: string;
  date?: string;
  equipe_id?: number;
}

// GET all
export const getAllGaleries = async (): Promise<Galerie[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT g.*, e.nom as equipe_nom
     FROM galeries g
     LEFT JOIN equipes e ON g.equipe_id = e.id
     ORDER BY g.date DESC`
  );
  return rows as Galerie[];
};

// GET by ID
export const getGalerieById = async (id: number): Promise<Galerie | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT g.*, e.nom as equipe_nom
     FROM galeries g
     LEFT JOIN equipes e ON g.equipe_id = e.id
     WHERE g.id = ?`,
    [id]
  );
  return rows.length > 0 ? (rows[0] as Galerie) : null;
};

// GET by equipe_id
export const getGaleriesByEquipeId = async (equipeId: number): Promise<Galerie[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT g.*, e.nom as equipe_nom
     FROM galeries g
     LEFT JOIN equipes e ON g.equipe_id = e.id
     WHERE g.equipe_id = ?
     ORDER BY g.date DESC`,
    [equipeId]
  );
  return rows as Galerie[];
};

// POST (create)
export const createGalerie = async (data: Galerie): Promise<Galerie> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO galeries (titre, description, date, equipe_id)
     VALUES (?, ?, ?, ?)`,
    [
      data.titre,
      data.description,
      data.date,
      data.equipe_id,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateGalerie = async (
  id: number,
  data: Partial<Galerie>
): Promise<Galerie | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE galeries SET 
      titre = COALESCE(?, titre),
      description = COALESCE(?, description),
      date = COALESCE(?, date),
      equipe_id = COALESCE(?, equipe_id)
    WHERE id = ?`,
    [
      data.titre,
      data.description,
      data.date,
      data.equipe_id,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getGalerieById(id);
};

// DELETE
export const deleteGalerie = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM galeries WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};

export const getPhotosByGalerieId = async (galerieId: number) => {
  const db = await dbPromise;
  const [rows] = await db.query(
    'SELECT * FROM photos WHERE galerie_id = ? ORDER BY uploaded_at DESC',
    [galerieId]
  );
  return rows;
};