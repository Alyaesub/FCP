import { useState } from 'react';
import CardJoueur from './CardJoueur';

type Joueur = {
  photo: string;
  numero: number;
  nom: string;
  poste?: string;
};

type CarouselJoueursProps = {
  joueurs: Joueur[];
};

const CarouselJoueurs = ({ joueurs }: CarouselJoueursProps) => {
  // Index du premier joueur affiché
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour aller au suivant (décale de 3)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % joueurs.length);
  };

  // Fonction pour aller au précédent (décale de -3)
  const handlePrev = () => {
    setCurrentIndex((prev) => 
      (prev - 3 + joueurs.length) % joueurs.length
    );
  };

  // Sélectionner les 3 joueurs à afficher
  const joueursAffiches = [
    joueurs[currentIndex % joueurs.length],
    joueurs[(currentIndex + 1) % joueurs.length],
    joueurs[(currentIndex + 2) % joueurs.length],
  ];

  return (
    <div className="carousel-joueurs">
      {/* Flèche gauche */}
      <button 
        className="carousel-joueurs__arrow carousel-joueurs__arrow--left"
        onClick={handlePrev}
        aria-label="Joueurs précédents"
      >
        ←
      </button>

      {/* Container avec les 3 cards */}
      <div className="carousel-joueurs__container">
        {joueursAffiches.map((joueur, index) => (
          <CardJoueur
            key={`${joueur.nom}-${index}`}
            photo={joueur.photo}
            numero={joueur.numero}
            nom={joueur.nom}
            poste={joueur.poste}
          />
        ))}
      </div>

      {/* Flèche droite */}
      <button 
        className="carousel-joueurs__arrow carousel-joueurs__arrow--right"
        onClick={handleNext}
        aria-label="Joueurs suivants"
      >
        →
      </button>
    </div>
  );
};

export default CarouselJoueurs;