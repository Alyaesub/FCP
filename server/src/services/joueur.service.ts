import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Joueur {
  id?: number;
  nom: string;
  prenom: string;
  date_naissance?: string;
  poste?: string;
  numero?: number;
  photo?: string;
  equipe_id?: number;
}

// GET all
export const getAllJoueurs = async (): Promise<Joueur[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM joueurs");
  return rows as Joueur[];
};

// GET by ID
export const getJoueurById = async (id: number): Promise<Joueur | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM joueurs WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Joueur) : null;
};

// GET by equipe_id
export const getJoueursByEquipeId = async (equipeId: number): Promise<Joueur[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM joueurs WHERE equipe_id = ?",
    [equipeId]
  );
  return rows as Joueur[];
};

// POST (create)
export const createJoueur = async (data: Joueur): Promise<Joueur> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO joueurs (nom, prenom, date_naissance, poste, numero, photo, equipe_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nom,
      data.prenom,
      data.date_naissance,
      data.poste,
      data.numero,
      data.photo,
      data.equipe_id,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateJoueur = async (
  id: number,
  data: Partial<Joueur>
): Promise<Joueur | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE joueurs SET 
      nom = COALESCE(?, nom),
      prenom = COALESCE(?, prenom),
      date_naissance = COALESCE(?, date_naissance),
      poste = COALESCE(?, poste),
      numero = COALESCE(?, numero),
      photo = COALESCE(?, photo),
      equipe_id = COALESCE(?, equipe_id)
    WHERE id = ?`,
    [
      data.nom,
      data.prenom,
      data.date_naissance,
      data.poste,
      data.numero,
      data.photo,
      data.equipe_id,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getJoueurById(id);
};

// DELETE
export const deleteJoueur = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM joueurs WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};