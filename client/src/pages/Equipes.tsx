import { useState, useEffect } from 'react';

// Composants
import HeroPages from "../components/HeroPages";
import SectionCTATeam from '../components/SectionCTA';
import CardEquipe from '../components/CardEquipe';
import BannerScroll from "../components/BannerScroll";

// Images fixes
import { IMAGES } from '../constants/images';

// API
import { getEquipes } from '../api/index';
import type { Equipe } from '../api/index';

function Equipes() {
  // ============================================
  // STATES
  // ============================================
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH des équipes du club
  // ============================================
  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const equipesRes = await getEquipes();
        
        // Filtrer pour garder UNIQUEMENT les équipes du club
        // (Au cas où le backend retourne aussi les équipes adverses)
        const equipesClub = equipesRes.filter(equipe => {
          // Si ton backend a un champ "type"
          return equipe.type === 'club';
        });
        
        setEquipes(equipesClub);
      } catch (err) {
        console.error('Erreur fetching Équipes:', err);
        setError('Oops ! Erreur lors du chargement des équipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipes();
  }, []);

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="equipes">
        <div className="equipes__loading">
          <div className="equipes__spinner"></div>
          <p>Chargement des équipes...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="equipes">
        <div className="equipes__error">
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
    <div className="equipes">
      {/* Hero */}
      <section className="equipes__hero">
        <HeroPages title="Découvrez toutes nos équipes" />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
        text="Nos équipes de champions"
        backgroundColor="var(--club-green)"
        textColor="var(--club-yellow)"
      />

      {/* Grid des équipes */}
      <section className="equipes__grid-section">
        <div className="container">
          <h2 className="equipes__grid-title">Toutes les équipes de notre club</h2>
          <div className="equipes__grid">
            {equipes.length > 0 ? (
              equipes.map((equipe) => (
                <CardEquipe
                  key={equipe.id}
                  logo={equipe.logo || IMAGES.ecussons.u10}
                  nom={equipe.nom}
                  details={equipe.description || `L'équipe ${equipe.categorie}`}
                  slug={equipe.slug || `equipe-${equipe.id}`}
                />
              ))
            ) : (
              <p className="equipes__empty">Aucune équipe pour le moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
        text="N'attends plus rejoins nous vite"
        backgroundColor="var(--club-yellow)"
        textColor="var(--club-green)"
      />

      {/* Section CTA */}
      <section className="equipes__sectionCTA">
        <SectionCTATeam
          title="N'attendez plus rejoignez nous"
          subtitle="Découvrez encore plus notre club et rejoignez nous dès maintenant"
          buttonText="Contactez nous"
          buttonLink="/contact"
          image={IMAGES.sectionCTA.logo}
          imageAlt="Mascotte du club"
        />
      </section>
    </div>
  );
}

export default Equipes;