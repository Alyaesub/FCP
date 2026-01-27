import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Photo {
  id?: number;
  galerie_id: number;
  filename: string;
  titre?: string;
  description?: string;
  uploaded_at?: string;
}

// GET all
export const getAllPhotos = async (): Promise<Photo[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT p.*, g.titre as galerie_titre
     FROM photos p
     LEFT JOIN galeries g ON p.galerie_id = g.id
     ORDER BY p.uploaded_at DESC`
  );
  return rows as Photo[];
};

// GET by ID
export const getPhotoById = async (id: number): Promise<Photo | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT p.*, g.titre as galerie_titre
     FROM photos p
     LEFT JOIN galeries g ON p.galerie_id = g.id
     WHERE p.id = ?`,
    [id]
  );
  return rows.length > 0 ? (rows[0] as Photo) : null;
};

// GET by galerie_id
export const getPhotosByGalerieId = async (galerieId: number): Promise<Photo[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT p.*, g.titre as galerie_titre
     FROM photos p
     LEFT JOIN galeries g ON p.galerie_id = g.id
     WHERE p.galerie_id = ?
     ORDER BY p.uploaded_at DESC`,
    [galerieId]
  );
  return rows as Photo[];
};

// POST (create)
export const createPhoto = async (data: Photo): Promise<Photo> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO photos (galerie_id, filename, titre, description)
     VALUES (?, ?, ?, ?)`,
    [
      data.galerie_id,
      data.filename,
      data.titre,
      data.description,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updatePhoto = async (
  id: number,
  data: Partial<Photo>
): Promise<Photo | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE photos SET 
      galerie_id = COALESCE(?, galerie_id),
      filename = COALESCE(?, filename),
      titre = COALESCE(?, titre),
      description = COALESCE(?, description)
    WHERE id = ?`,
    [
      data.galerie_id,
      data.filename,
      data.titre,
      data.description,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getPhotoById(id);
};

// DELETE
export const deletePhoto = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM photos WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};