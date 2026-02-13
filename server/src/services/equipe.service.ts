import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Equipe {
  id?: number;
  nom: string;
  slug?: string;
  categorie?: string;
  description?: string;
  ville?: string;
  logo?: string;
  photo_equipe?: string;
  entrainements?: string;
  lieu?: string;
  coach_nom?: string;
  coach_photo?: string;
  type: "club" | "exterieure";
}

// GET all
export const getAllEquipes = async (): Promise<Equipe[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM equipes");

  return rows as Equipe[];
};

// GET by ID
export const getEquipeById = async (id: number): Promise<Equipe | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM equipes WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Equipe) : null;
};

// POST (create)
export const createEquipe = async (data: Equipe): Promise<Equipe> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO equipes (nom, slug, categorie, description, ville, logo, photo_equipe, entrainements, lieu, coach_nom, coach_photo, type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nom,
      data.slug,
      data.categorie,
      data.description,
      data.ville,
      data.logo,
      data.photo_equipe,
      data.entrainements,
      data.lieu,
      data.coach_nom,
      data.coach_photo,
      data.type,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateEquipe = async (
  id: number,
  data: Partial<Equipe>
): Promise<Equipe | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE equipes SET 
      nom = COALESCE(?, nom),
      slug = COALESCE(?, slug),
      categorie = COALESCE(?, categorie),
      description = COALESCE(?, description),
      ville = COALESCE(?, ville),
      logo = COALESCE(?, logo),
      photo_equipe = COALESCE(?, photo_equipe),
      entrainements = COALESCE(?, entrainements),
      lieu = COALESCE(?, lieu),
      coach_nom = COALESCE(?, coach_nom),
      coach_photo = COALESCE(?, coach_photo),
      type = COALESCE(?, type)
    WHERE id = ?`,
    [
      data.nom,
      data.slug,
      data.categorie,
      data.description,
      data.ville,
      data.logo,
      data.photo_equipe,
      data.entrainements,
      data.lieu,
      data.coach_nom,
      data.coach_photo,
      data.type,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getEquipeById(id);
};

// DELETE
export const deleteEquipe = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM equipes WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};