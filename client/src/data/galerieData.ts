// Import de photos temporaires 
import photo1 from '../assets/photoEquipe1.jpg';
import photo2 from '../assets/photoEquipe2.jpg';
import photo3 from '../assets/photoEquipe3.jpg';
import photo4 from '../assets/photoEquipe4.jpg';
import photo5 from '../assets/photoEquipe5.jpg';

export interface Evenement {
  id: number;
  nom: string;
  date: string;
}

export interface Photo {
  id: number;
  image: string;
  titre: string;
  evenementId: number | null; // null = photo mixte (pas d'événement spécifique)
}

// Liste des événements
export const evenements: Evenement[] = [
  {
    id: 1,
    nom: "Tournoi Achicourt 2024",
    date: "15/12/2024"
  },
  {
    id: 2,
    nom: "Match U9 vs Saint-Étienne",
    date: "08/01/2025"
  },
  {
    id: 3,
    nom: "Entraînement Seniors",
    date: "20/12/2024"
  },
  {
    id: 4,
    nom: "Fête de fin de saison",
    date: "25/06/2024"
  }
];

// Liste des photos
export const photos: Photo[] = [
  // Photos du Tournoi Achicourt
  { id: 1, image: photo1, titre: "Équipe U7 - Tournoi", evenementId: 1 },
  { id: 2, image: photo2, titre: "Victoire Tournoi", evenementId: 1 },
  { id: 3, image: photo3, titre: "Remise des médailles", evenementId: 1 },
  
  // Photos du match U9
  { id: 4, image: photo4, titre: "Match U9", evenementId: 2 },
  { id: 5, image: photo5, titre: "Célébration but", evenementId: 2 },
  
  // Photos de l'entraînement Seniors
  { id: 6, image: photo1, titre: "Échauffement", evenementId: 3 },
  { id: 7, image: photo2, titre: "Exercice tactique", evenementId: 3 },
  
  // Photos fête de fin de saison
  { id: 8, image: photo3, titre: "Barbecue du club", evenementId: 4 },
  { id: 9, image: photo4, titre: "Photo de groupe", evenementId: 4 },
  
  // Photos mixtes (pas d'événement spécifique)
  { id: 10, image: photo5, titre: "Ambiance stade", evenementId: null },
  { id: 11, image: photo1, titre: "Supporters", evenementId: null },
  { id: 12, image: photo2, titre: "Terrain", evenementId: null }
];
