import { dbPromise } from "../database/connect";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Match {
  id?: number;
  date: string;
  location: string;
  equipe_domicile_id: number;
  equipe_exterieur_id: number;
  score_domicile?: number;
  score_exterieur?: number;
  is_home?: boolean;
  is_tournament?: boolean;
  tournament_id?: number;
}

// GET all
export const getAllMatches = async (): Promise<Match[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT m.*, 
      ed.nom as equipe_domicile_nom,
      ee.nom as equipe_exterieur_nom
     FROM matches m
     LEFT JOIN equipes ed ON m.equipe_domicile_id = ed.id
     LEFT JOIN equipes ee ON m.equipe_exterieur_id = ee.id
     ORDER BY m.date DESC`
  );
  return rows as Match[];
};

// GET by ID
export const getMatchById = async (id: number): Promise<Match | null> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT m.*, 
      ed.nom as equipe_domicile_nom,
      ee.nom as equipe_exterieur_nom
     FROM matches m
     LEFT JOIN equipes ed ON m.equipe_domicile_id = ed.id
     LEFT JOIN equipes ee ON m.equipe_exterieur_id = ee.id
     WHERE m.id = ?`,
    [id]
  );
  return rows.length > 0 ? (rows[0] as Match) : null;
};

// GET by equipe_id (matchs où l'équipe joue, domicile OU extérieur)
export const getMatchesByEquipeId = async (equipeId: number): Promise<Match[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT m.*, 
      ed.nom as equipe_domicile_nom,
      ee.nom as equipe_exterieur_nom
     FROM matches m
     LEFT JOIN equipes ed ON m.equipe_domicile_id = ed.id
     LEFT JOIN equipes ee ON m.equipe_exterieur_id = ee.id
     WHERE m.equipe_domicile_id = ? OR m.equipe_exterieur_id = ?
     ORDER BY m.date DESC`,
    [equipeId, equipeId]
  );
  return rows as Match[];
};

// GET matchs passés (date < maintenant)
export const getMatchesPasses = async (): Promise<Match[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT m.*, 
      ed.nom as equipe_domicile_nom,
      ee.nom as equipe_exterieur_nom
     FROM matches m
     LEFT JOIN equipes ed ON m.equipe_domicile_id = ed.id
     LEFT JOIN equipes ee ON m.equipe_exterieur_id = ee.id
     WHERE m.date < NOW()
     ORDER BY m.date DESC`
  );
  return rows as Match[];
};

// GET matchs à venir (date >= maintenant)
export const getMatchesFutur = async (): Promise<Match[]> => {
  const db = await dbPromise;
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT m.*, 
      ed.nom as equipe_domicile_nom,
      ee.nom as equipe_exterieur_nom
     FROM matches m
     LEFT JOIN equipes ed ON m.equipe_domicile_id = ed.id
     LEFT JOIN equipes ee ON m.equipe_exterieur_id = ee.id
     WHERE m.date >= NOW()
     ORDER BY m.date ASC`
  );
  return rows as Match[];
};

// POST (create)
export const createMatch = async (data: Match): Promise<Match> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO matches (date, location, equipe_domicile_id, equipe_exterieur_id, score_domicile, score_exterieur, is_home, is_tournament, tournament_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.date,
      data.location,
      data.equipe_domicile_id,
      data.equipe_exterieur_id,
      data.score_domicile,
      data.score_exterieur,
      data.is_home,
      data.is_tournament,
      data.tournament_id,
    ]
  );

  return { id: result.insertId, ...data };
};

// PUT (update)
export const updateMatch = async (
  id: number,
  data: Partial<Match>
): Promise<Match | null> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    `UPDATE matches SET
      date = COALESCE(?, date),
      location = COALESCE(?, location),
      equipe_domicile_id = COALESCE(?, equipe_domicile_id),
      equipe_exterieur_id = COALESCE(?, equipe_exterieur_id),
      score_domicile = COALESCE(?, score_domicile),
      score_exterieur = COALESCE(?, score_exterieur),
      is_home = COALESCE(?, is_home),
      is_tournament = COALESCE(?, is_tournament),
      tournament_id = COALESCE(?, tournament_id)
    WHERE id = ?`,
    [
      data.date,
      data.location,
      data.equipe_domicile_id,
      data.equipe_exterieur_id,
      data.score_domicile,
      data.score_exterieur,
      data.is_home,
      data.is_tournament,
      data.tournament_id,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;

  return getMatchById(id);
};

// DELETE
export const deleteMatch = async (id: number): Promise<boolean> => {
  const db = await dbPromise;
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM matches WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};