import { useState } from 'react';
import CardMatch from './CardMatch';

type Match = {
  category: string;
  homeTeamLogo: string;
  homeTeamName: string;
  awayTeamLogo: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  date: string;
  location: string;
};

type CarouselMatchsProps = {
  matchs: Match[];
  variant?: 'green' | 'yellow';
};

const CarouselMatchs = ({ matchs, variant = 'green' }: CarouselMatchsProps) => {
  // Index du premier match affiché
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour aller au suivant (décale de 3)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % matchs.length);
  };

  // Fonction pour aller au précédent (décale de -3)
  const handlePrev = () => {
    setCurrentIndex((prev) => 
      (prev - 3 + matchs.length) % matchs.length
    );
  };

  // Sélectionner les 3 matchs à afficher
  const matchsAffiches = [
    matchs[currentIndex % matchs.length],
    matchs[(currentIndex + 1) % matchs.length],
    matchs[(currentIndex + 2) % matchs.length],
  ];

  return (
    <div className="carousel-matchs">
      {/* Flèche gauche */}
      <button 
        className="carousel-matchs__arrow carousel-matchs__arrow--left"
        onClick={handlePrev}
        aria-label="Matchs précédents"
      >
        ←
      </button>

      {/* Container avec les 3 cards */}
      <div className="carousel-matchs__container">
        {matchsAffiches.map((match, index) => (
          <CardMatch
            key={`${match.category}-${index}`}
            category={match.category}
            homeTeamLogo={match.homeTeamLogo}
            homeTeamName={match.homeTeamName}
            awayTeamLogo={match.awayTeamLogo}
            awayTeamName={match.awayTeamName}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            date={match.date}
            location={match.location}
            variant={variant}
          />
        ))}
      </div>

      {/* Flèche droite */}
      <button 
        className="carousel-matchs__arrow carousel-matchs__arrow--right"
        onClick={handleNext}
        aria-label="Matchs suivants"
      >
        →
      </button>
    </div>
  );
};

export default CarouselMatchs;