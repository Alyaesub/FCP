import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Composants
import Button from "../components/Button";
import CardMatch from '../components/CardMatch';
import CardActuPrincipal from '../components/CardActuPrincipal';
import CardActuMini from '../components/CardActuMini';
import CarouselJoueurs from '../components/CarouselJoueurs';
import SectionCTAHome from '../components/SectionCTA';
import CarouselEvenements from '../components/CarouselEvenement';
import BannerScroll from '../components/BannerScroll';

// Images fixes
import { IMAGES } from '../constants/images';

// API
import { getMatchsPasses, getActualites, getJoueurs, getEvenements } from '../api/index';
import type { Match, Actualite, Joueur, Evenement } from '../api/index';

function Home() {
  // ============================================
  // STATES
  // ============================================
  const [matchesPasses, setMatchesPasses] = useState<Match[]>([]);
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH des données au montage du composant
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // On lance les 4 requêtes en parallèle (plus rapide !)
        const [matchesRes, actualitesRes, jouleursRes, evenementsRes] = await Promise.all([
          getMatchsPasses(),
          getActualites(),
          getJoueurs(),
          getEvenements(),
        ]);

        setMatchesPasses(matchesRes);
        setActualites(actualitesRes);
        setJoueurs(jouleursRes);
        setEvenements(evenementsRes);
      } catch (err) {
        console.error('Erreur fetching Home:', err);
        setError('Oops ! Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================
  // TRANSFORMATION des données pour les composants
  // ============================================

  // Formater les joueurs pour le CarouselJoueurs
  // Le composant attend : { photo, numero, nom }
  const jouleursFormatted = joueurs.map((joueur) => ({
    photo: joueur.photo || IMAGES.photosJoueurs.joueurAnonyme,
    numero: joueur.numero || 0,
    nom: `${joueur.nom} ${joueur.prenom}`,
  }));

  // Formater les evenements pour le CarouselEvenements
  // Le composant attend : { type, title, logo?, logoAlt?, items?, date, location }
  const evenementsFormatted = evenements.map((evenement) => {
    if (evenement.type === 'match') {
      return {
        type: 'match' as const,
        title: evenement.titre,
        logo: IMAGES.logosAnonymes.logo1,
        logoAlt: 'Logo équipe',
        date: new Date(evenement.date).toLocaleDateString('fr-FR'),
        location: evenement.lieu || 'Lieu non défini',
      };
    }
    return {
      type: 'event' as const,
      title: evenement.titre,
      items: evenement.description ? evenement.description.split(',').map(item => item.trim()) : ['Aucun détail'],
      date: new Date(evenement.date).toLocaleDateString('fr-FR'),
      location: evenement.lieu || 'Lieu non défini',
    };
  });

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="home">
        <div className="home__loading">
          <div className="home__spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="home">
        <div className="home__error">
          <p>{error}</p>
          <Button variant="primary" size="medium" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <h1 className="home__hero-title">Bienvenue au FC Provence</h1>
        <p className="home__hero-subtitle">Plus qu'un club, une famille.</p>
        <div className="home__hero-cta">
          <Link to="/contact">
            <Button variant="secondary" size="small">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>

      {/* Section matchs passés */}
      <section className="home__result">
        <h2 className="home__result-title">Nos derniers matchs</h2>
        <div className="home__result-container">
          {matchesPasses.length > 0 ? (
            matchesPasses.slice(0, 3).map((match) => (
              <CardMatch
                key={match.id}
                category={match.equipe_domicile_nom}
                homeTeamLogo={match.equipe_domicile_logo || IMAGES.logo}
                variant="green"
                homeTeamName={match.equipe_domicile_nom}
                awayTeamLogo={match.equipe_exterieur_logo ||IMAGES.logosAnonymes.logo1}
                awayTeamName={match.equipe_exterieur_nom}
                homeScore={match.score_domicile ?? undefined}
                awayScore={match.score_exterieur ?? undefined}
                date={new Date(match.date).toLocaleDateString('fr-FR')}
                location={match.location}
              />
            ))
          ) : (
            <p className="home__result-empty">Aucun match pour le moment.</p>
          )}
        </div>
      </section>

      {/* Section actualités */}
      <section className="home__news">
        <div className="home__news-header">
          <h2 className="home__news-title">Actualités récentes</h2>
          <Link to="/actualites" className="home__news-link">
            Voir toutes les actualités →
          </Link>
        </div>
        <div className="home__news-container">
          {actualites.length > 0 ? (
            <>
              {/* Première actualité en grande carte */}
              <CardActuPrincipal
                title={actualites[0].titre}
                items={actualites[0].contenu.split(',').map(item => item.trim())}
                date={new Date(actualites[0].date_publication).toLocaleDateString('fr-FR')}
                location="FC Provence"
              />
              {/* Suivantes en mini cartes (max 2) */}
              <div className="home__news-mini">
                {actualites.slice(1, 3).map((actualite) => (
                  <CardActuMini
                    key={actualite.id}
                    title={actualite.titre}
                    items={actualite.contenu.split(',').map(item => item.trim())}
                    date={new Date(actualite.date_publication).toLocaleDateString('fr-FR')}
                    location="FC Provence"
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="home__news-empty">Aucune actualité pour le moment.</p>
          )}
        </div>
      </section>

      {/* Bandeau défilant */}
      <BannerScroll text="Découvrez nos équipes et nos joueurs" />

      {/* Section joueurs */}
      <section className="home__teams">
        <div className="home__teams-header">
          <h2 className="home__teams-title">Découvrez les équipes</h2>
          <Link to="/equipes" className="home__teams-link">
            Voir toutes nos équipes →
          </Link>
        </div>
        {jouleursFormatted.length > 0 ? (
          <CarouselJoueurs joueurs={jouleursFormatted} />
        ) : (
          <p className="home__teams-empty">Aucun joueur pour le moment.</p>
        )}
      </section>

      {/* Section CTA */}
      <section className="home__sectionCTA">
        <SectionCTAHome
          title="Découvrez les photos de nos matchs et événements"
          subtitle="Découvrez encore plus notre club et rejoignez nous dès maintenant."
          buttonText="Voir notre galerie photo"
          buttonLink="/galerie"
          image={IMAGES.sectionCTA.logo}
          imageAlt="Mascotte du club"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll text="Événements à venir" />

      {/* Section événements */}
      <section className="home__events">
        <h2 className="home__events-title">Nos prochains matchs et événements </h2>
        {evenementsFormatted.length > 0 ? (
          <CarouselEvenements evenements={evenementsFormatted} />
        ) : (
          <p className="home__events-empty">Aucun événement pour le moment.</p>
        )}
      </section>
    </div>
  );
}

export default Home;