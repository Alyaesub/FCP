import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Evenement {
  id?: number;
  titre: string;
  description?: string;
  date?: string;
  lieu?: string;
  logo?: string;
  type: "match" | "tournoi" | "réunion" | "autre";
}

// GET all
export const getAllEvenements = async (): Promise<Evenement[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM evenements ORDER BY date DESC"
  );
  return rows as Evenement[];
};

// GET by ID
export const getEvenementById = async (id: number): Promise<Evenement | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM evenements WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Evenement) : null;
};

// GET by type
export const getEvenementsByType = async (type: string): Promise<Evenement[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM evenements WHERE type = ? ORDER BY date DESC",
    [type]
  );
  return rows as Evenement[];
};

// POST (create)
export const createEvenement = async (data: Evenement): Promise<Evenement> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO evenements (titre, description, date, lieu, logo, type)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.titre,
      data.description,
      data.date,
      data.lieu,
      data.logo,
      data.type,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateEvenement = async (
  id: number,
  data: Partial<Evenement>
): Promise<Evenement | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE evenements SET 
      titre = COALESCE(?, titre),
      description = COALESCE(?, description),
      date = COALESCE(?, date),
      lieu = COALESCE(?, lieu),
      logo = COALESCE(?, logo),
      type = COALESCE(?, type)
    WHERE id = ?`,
    [
      data.titre,
      data.description,
      data.date,
      data.lieu,
      data.logo,
      data.type,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getEvenementById(id);
};

// DELETE
export const deleteEvenement = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM evenements WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};