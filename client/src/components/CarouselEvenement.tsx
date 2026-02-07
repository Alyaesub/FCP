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
  const length = evenements?.length ?? 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const step = length >= 3 ? 3 : length; // 0, 1, 2 ou 3
  const arrowsDisabled = length <= 2;

  const handleNext = () => {
    if (arrowsDisabled || length === 0) return;
    setCurrentIndex((prev) => (prev + step) % length);
  };

  const handlePrev = () => {
    if (arrowsDisabled || length === 0) return;
    setCurrentIndex((prev) => (prev - step + length) % length);
  };

  // Rien à afficher
  if (length === 0) return null;

  // Génère exactement step éléments, jamais undefined
  const evenementsAffiches = Array.from({ length: step }, (_, i) => {
    return evenements[(currentIndex + i) % length];
  });

  return (
    <div className="carousel-evenements">
      {!arrowsDisabled && (
        <button
          className="carousel-evenements__arrow carousel-evenements__arrow--left"
          onClick={handlePrev}
          aria-label="Événements précédents"
          disabled={arrowsDisabled}
        >
          ←
        </button>
      )}
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
      
      {!arrowsDisabled && (
        <button
          className="carousel-evenements__arrow carousel-evenements__arrow--right"
          onClick={handleNext}
          aria-label="Événements suivants"
          disabled={arrowsDisabled}
        >
          →
        </button>
      )}
    </div>
  );
};

export default CarouselEvenements;