import { useState } from 'react';
import CardEvenement from './CardEvenement';

type Evenement = {
  type: 'match' | 'event';
  title: string;
  date: string;
  location: string;
  logo?: string;
  logoAlt?: string;
  items?: string[];
};

type CarouselEvenementsProps = {
  evenements: Evenement[];
};

const CarouselEvenements = ({ evenements }: CarouselEvenementsProps) => {
  // Index du premier événement affiché
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour aller au suivant (décale de 3)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % evenements.length);
  };

  // Fonction pour aller au précédent (décale de -3)
  const handlePrev = () => {
    setCurrentIndex((prev) => 
      (prev - 3 + evenements.length) % evenements.length
    );
  };

  // Sélectionner les 3 événements à afficher
  const evenementsAffiches = [
    evenements[currentIndex % evenements.length],
    evenements[(currentIndex + 1) % evenements.length],
    evenements[(currentIndex + 2) % evenements.length],
  ];

  return (
    <div className="carousel-evenements">
      {/* Flèche gauche */}
      <button 
        className="carousel-evenements__arrow carousel-evenements__arrow--left"
        onClick={handlePrev}
        aria-label="Événements précédents"
      >
        ←
      </button>

      {/* Container avec les 3 cards */}
      <div className="carousel-evenements__container">
        {evenementsAffiches.map((evenement, index) => (
          <CardEvenement
            key={`${evenement.title}-${index}`}
            type={evenement.type}
            title={evenement.title}
            date={evenement.date}
            location={evenement.location}
            logo={evenement.logo}
            logoAlt={evenement.logoAlt}
            items={evenement.items}
          />
        ))}
      </div>

      {/* Flèche droite */}
      <button 
        className="carousel-evenements__arrow carousel-evenements__arrow--right"
        onClick={handleNext}
        aria-label="Événements suivants"
      >
        →
      </button>
    </div>
  );
};

export default CarouselEvenements;