import logo from '../assets/logo-rond-sansBg.png'
import photoCoach from '../assets/mascotte-lion-sansBG.png'
import photoJoueur from '../assets/mascotte-ballon.png'
import photoJoueuse from '../assets/mascotte-lionneBallon.png'
import photoEquipe1 from '../assets/photoEquipe1.jpg';
import photoEquipe2 from '../assets/photoEquipe2.jpg'
import photoEquipe3 from '../assets/photoEquipe3.jpg';
import photoEquipe4 from '../assets/photoEquipe4.jpg';
import photoEquipe5 from '../assets/photoEquipe5.jpg';


export interface Joueur {
  id: number;
  nom: string;
  numero: number;
  photo: string;
  poste?: string;
}

export interface Equipe {
  id: number;
  slug: string;
  nom: string;
  categorie: string;
  description: string;
  logo: string;
  coach: {
    nom: string;
    photo: string;
  };
  photoEquipe: string;
  entrainements: string;
  lieu: string;
  joueurs: Joueur[];
}

// Données temporaires
export const equipesData: Equipe[] = [
  {
    id: 1,
    slug: "u7",
    nom: "FCP U7",
    categorie: "U7",
    description: "L'équipe des baby, nos plus jeunes champions en herbe !",
    logo: logo,
    coach: {
      nom: "Jean Dupont",
      photo: photoCoach,
    },
    photoEquipe: photoEquipe1,
    entrainements: "Mercredi 17h - Samedi 10h",
    lieu: "Stade Municipal de Provence",
    joueurs: [
      {
        id: 1,
        nom: "WELLINGTON",
        numero: 19,
        photo: photoJoueur,
        poste: "Attaquant"
      },
      {
        id: 2,
        nom: "OLIVEIRA",
        numero: 7,
        photo: photoJoueuse,
        poste: "Milieu"
      },
      {
        id: 3,
        nom: "LORRAM",
        numero: 2,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 4,
        nom: "SANTOS",
        numero: 10,
        photo: photoJoueuse,
        poste: "Attaquant"
      },
      {
        id: 5,
        nom: "SILVA",
        numero: 5,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 6,
        nom: "COSTA",
        numero: 11,
        photo: photoJoueur,
        poste: "Milieu"
      }
    ]
  },
  {
    id: 2,
    slug: "u9",
    nom: "FCP U9",
    categorie: "U9",
    description: "Les jeunes pousses du FC Provence, pleines d'énergie et de talent !",
    logo: logo,
    coach: {
      nom: "Pierre Martin",
      photo: photoCoach
    },
    photoEquipe: photoEquipe5,
    entrainements: "Lundi 18h - Samedi 14h",
    lieu: "Stade Municipal de Provence",
    joueurs: [
      {
        id: 7,
        nom: "BERNARD",
        numero: 9,
        photo: photoJoueur,
        poste: "Attaquant"
      },
      {
        id: 8,
        nom: "GARCIA",
        numero: 4,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 9,
        nom: "MARTINEZ",
        numero: 8,
        photo: photoJoueur,
        poste: "Milieu"
      }
    ]
  },
  {
    id: 3,
    slug: "u10",
    nom: "FCP U10",
    categorie: "U10",
    description: "Les futurs champions du FC Provence !",
    logo: logo,
    coach: {
      nom: "Michel Leblanc",
      photo: photoCoach
    },
    photoEquipe: photoEquipe4,
    entrainements: "À définir",
    lieu: "Stade Municipal de Provence",
    joueurs: [
      {
        id: 7,
        nom: "BERNARD",
        numero: 9,
        photo: photoJoueur,
        poste: "Attaquant"
      },
      {
        id: 8,
        nom: "GARCIA",
        numero: 4,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 9,
        nom: "MARTINEZ",
        numero: 8,
        photo: photoJoueur,
        poste: "Milieu"
      }
    ]
  },
  {
    id: 4,
    slug: "u12",
    nom: "FCP U12",
    categorie: "U12",
    description: "L'avenir du club !",
    logo: logo,
    coach: {
      nom: "Thomas Rousseau",
      photo: photoCoach
    },
    photoEquipe: photoEquipe3,
    entrainements: "À définir",
    lieu: "Stade Municipal de Provence",
    joueurs: [
      {
        id: 7,
        nom: "BERNARD",
        numero: 9,
        photo: photoJoueur,
        poste: "Attaquant"
      },
      {
        id: 8,
        nom: "GARCIA",
        numero: 4,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 9,
        nom: "MARTINEZ",
        numero: 8,
        photo: photoJoueur,
        poste: "Milieu"
      }
    ]
  },
  {
    id: 5,
    slug: "seniors",
    nom: "Seniors",
    categorie: "Seniors",
    description: "L'équipe première du FC Provence !",
    logo: logo,
    coach: {
      nom: "Laurent Durand",
      photo: photoCoach
    },
    photoEquipe: photoEquipe2,
    entrainements: "À définir",
    lieu: "Stade Municipal de Provence",
    joueurs: [
      {
        id: 7,
        nom: "BERNARD",
        numero: 9,
        photo: photoJoueur,
        poste: "Attaquant"
      },
      {
        id: 8,
        nom: "GARCIA",
        numero: 4,
        photo: photoJoueur,
        poste: "Défenseur"
      },
      {
        id: 9,
        nom: "MARTINEZ",
        numero: 8,
        photo: photoJoueur,
        poste: "Milieu"
      }
    ]
  }
];