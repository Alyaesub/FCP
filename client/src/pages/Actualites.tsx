import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Composants
import HeroPages from "../components/HeroPages";
import BannerScroll from "../components/BannerScroll";
import CarouselEvenements from '../components/CarouselEvenement';
import CarouselMatchs from "../components/CarouselMatchs";

// Images fixes
import { IMAGES } from '../constants/images';

// API
import { getMatchsPasses, getMatchsFutur, getEvenements } from '../api/index';
import type { Match, Evenement } from '../api/index';

function Actualites() {
  // ============================================
  // STATES
  // ============================================
  const [matchsPasses, setMatchsPasses] = useState<Match[]>([]);
  const [matchsFutur, setMatchsFutur] = useState<Match[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH des données
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchsPassesRes, matchsFuturRes, evenementsRes] = await Promise.all([
          getMatchsPasses(),
          getMatchsFutur(),
          getEvenements(),
        ]);

        setMatchsPasses(matchsPassesRes);
        setMatchsFutur(matchsFuturRes);
        setEvenements(evenementsRes);
      } catch (err) {
        console.error('Erreur fetching Actualités:', err);
        setError('Oops ! Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================
  // TRANSFORMATION des données
  // ============================================

  // Formater les matchs passés pour CarouselMatchs
  // Le composant attend : { category, homeTeamLogo, homeTeamName, awayTeamLogo, awayTeamName, homeScore, awayScore, date, location }
  const matchsPassesFormatted = matchsPasses.map((match) => ({
    category: match.equipe_domicile_nom,
    homeTeamLogo: match.equipe_domicile_logo || IMAGES.logo, 
    homeTeamName: match.equipe_domicile_nom,
    awayTeamLogo: match.equipe_exterieur_logo || IMAGES.logosAnonymes.logo1,
    awayTeamName: match.equipe_exterieur_nom,
    homeScore: match.score_domicile ?? undefined,
    awayScore: match.score_exterieur ?? undefined,
    date: new Date(match.date).toLocaleDateString('fr-FR'),
    location: match.location,
  }));

  // Formater les matchs futurs pour CarouselEvenements
  // Le composant attend : { type: 'match', title, logo, logoAlt, date, location }
  const matchsFuturFormatted = matchsFutur.map((match) => ({
    type: 'match' as const,
    title: `Notre prochain match contre ${match.equipe_exterieur_nom}`,
    logo: match.equipe_exterieur_logo || IMAGES.logosAnonymes.logo1,
    logoAlt: `Logo ${match.equipe_exterieur_nom}`,
    date: new Date(match.date).toLocaleDateString('fr-FR'),
    location: match.location,
  }));

  // Formater les événements pour CarouselEvenements
  // Le composant attend : { type: 'event', title, items, date, location }
  const evenementsFormatted = evenements.map((evenement) => ({
    type: 'event' as const,
    title: evenement.titre,
    items: evenement.description 
      ? evenement.description.split(',').map(item => item.trim()) 
      : ['Détails à venir'],
    date: new Date(evenement.date).toLocaleDateString('fr-FR'),
    location: evenement.lieu || 'Lieu non défini',
  }));

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="actualites">
        <div className="actualites__loading">
          <div className="actualites__spinner"></div>
          <p>Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="actualites">
        <div className="actualites__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="actualites">
      {/* Hero */}
      <section className="actualites__heros">
        <HeroPages
          title="Découvrez toutes nos dernières actualités"
          subtitle="nos derniers matchs et événements à venir"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
        text="Découvre les résultats de nos derniers matchs"
        backgroundColor="var(--club-green)"
        textColor="var(--club-yellow)"
      />

      {/* Section matchs passés */}
      <section className="actualites__result">
        <h2 className="actualites__result-title">Nos derniers matchs</h2>
        {matchsPassesFormatted.length > 0 ? (
          <CarouselMatchs 
            matchs={matchsPassesFormatted}
            variant="yellow"
          />
        ) : (
          <p className="actualites__result-empty">Aucun match passé pour le moment.</p>
        )}
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
        text="Découvrez nos prochains matchs et nos dernières actualités"
        backgroundColor="var(--club-yellow)"
        textColor="var(--club-green)"
      />

      {/* Section matchs futurs */}
      <section className="actualites__events">
        <h2 className="actualites__events-title">Nos futurs matchs</h2>
        {matchsFuturFormatted.length > 0 ? (
          <CarouselEvenements evenements={matchsFuturFormatted} />
        ) : (
          <p className="actualites__events-empty">Aucun match à venir pour le moment.</p>
        )}
      </section>

      {/* Section événements */}
      <section className="actualites__events">
        <h2 className="actualites__events-title">Nos dernières news</h2>
        {evenementsFormatted.length > 0 ? (
          <>
            <CarouselEvenements evenements={evenementsFormatted} />
            <div className="actualites__events-footer">
              <Link to="/galerie" className="actualites__events-link">
                Découvrez les photos de tous nos événements →
              </Link>
            </div>
          </>
        ) : (
          <p className="actualites__events-empty">Aucun événement pour le moment.</p>
        )}
      </section>
    </div>
  );
}

export default Actualites;