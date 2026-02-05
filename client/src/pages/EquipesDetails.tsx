import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

// Composants
import CardJoueur from '../components/CardJoueur';

// Images fixes
import { IMAGES } from '../constants/images';

// API
import { getEquipes, getJoueursByEquipe } from '../api/index';
import type { Equipe, Joueur } from '../api/index';

function EquipeDetails() {
  // ============================================
  // RÉCUPÉRATION DU SLUG
  // ============================================
  const { slug } = useParams<{ slug: string }>();

  // ============================================
  // STATES
  // ============================================
  const [equipe, setEquipe] = useState<Equipe | null>(null);
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  // ============================================
  // FETCH équipe + joueurs
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Récupérer toutes les équipes
        const equipesRes = await getEquipes();
        
        // 2. Trouver l'équipe qui correspond au slug
        const equipeFound = equipesRes.find(eq => eq.slug === slug);
        
        if (!equipeFound) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        setEquipe(equipeFound);
        
        // 3. Récupérer les joueurs de cette équipe
        const joueursRes = await getJoueursByEquipe(equipeFound.id);
        setJoueurs(joueursRes);
        
      } catch (err) {
        console.error('Erreur fetching EquipeDetails:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="equipe-details">
        <div className="equipe-details__loading">
          <div className="equipe-details__spinner"></div>
          <p>Chargement de l'équipe...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // NOT FOUND - Redirection
  // ============================================
  if (notFound || !equipe) {
    return <Navigate to="/equipes" replace />;
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <main className="equipe-details">
      {/* Hero - Titre de l'équipe */}
      <section className="equipe-details__hero">
        <div className="container">
          <div className="equipe-details__hero-content">
            <h1 className="equipe-details__hero-title">L'équipe des :</h1>
            <img 
              src={equipe.logo || IMAGES.ecussons.u10} 
              alt={equipe.nom}
              className="equipe-details__hero-logo"
            />
          </div>
        </div>
      </section>

      {/* Section Coach */}
      {equipe.coach_nom && (
        <section className="equipe-details__coach">
          <div className="container">
            <h2 className="equipe-details__coach-title">Le coach :</h2>
            <div className="equipe-details__coach-content">
              <img 
                src={equipe.coach_photo || IMAGES.coach.anonyme} 
                alt={equipe.coach_nom}
                className="equipe-details__coach-photo"
              />
              <p className="equipe-details__coach-nom">{equipe.coach_nom}</p>
            </div>
          </div>
        </section>
      )}

      {/* Photo de l'équipe */}
      {equipe.photo_equipe && (
        <section className="equipe-details__photo">
          <div className="container">
            <img 
              src={equipe.photo_equipe} 
              alt={`Photo de l'équipe ${equipe.nom}`}
              className="equipe-details__photo-img"
            />
          </div>
        </section>
      )}

      {/* Grid des joueurs */}
      {joueurs.length > 0 && (
        <section className="equipe-details__joueurs">
          <div className="container">
            <div className="equipe-details__joueurs-grid">
              {joueurs.map((joueur) => (
                <CardJoueur
                  key={joueur.id}
                  photo={joueur.photo || IMAGES.photosJoueurs.joueurAnonyme}
                  numero={joueur.numero || 0}
                  nom={`${joueur.nom} ${joueur.prenom}`}
                  poste={joueur.poste}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Message si pas de joueurs */}
      {joueurs.length === 0 && (
        <section className="equipe-details__joueurs">
          <div className="container">
            <p className="equipe-details__joueurs-empty">
              Aucun joueur enregistré pour cette équipe pour le moment.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

export default EquipeDetails;