import { useParams, Navigate } from 'react-router-dom';
import { equipesData } from '../data/equipesData';
import CardJoueur from '../components/CardJoueur';

function EquipeDetails() {
  // Récupère le slug depuis l'URL (/equipes/u7 → slug = "u7")
  const { slug } = useParams<{ slug: string }>();

  // Trouve l'équipe correspondante dans les données
  const equipe = equipesData.find(eq => eq.slug === slug);

  // Si l'équipe n'existe pas, redirige vers la page équipes
  if (!equipe) {
    return <Navigate to="/equipes" replace />;
  }

  return (
    <>
      <main className="equipe-details">
        {/* Hero - Titre de l'équipe */}
        <section className="equipe-details__hero">
          <div className="container">
            <div className="equipe-details__hero-content">
              <h1 className="equipe-details__hero-title">
                L'équipe des :
              </h1>
              <img 
                src={equipe.logo} 
                alt={equipe.nom}
                className="equipe-details__hero-logo"
              />
            </div>
          </div>
        </section>

        {/* Section Coach */}
        <section className="equipe-details__coach">
          <div className="container">
            <h2 className="equipe-details__coach-title">Le coach :</h2>
            <div className="equipe-details__coach-content">
              <img 
                src={equipe.coach.photo} 
                alt={equipe.coach.nom}
                className="equipe-details__coach-photo"
              />
              <p className="equipe-details__coach-nom">{equipe.coach.nom}</p>
            </div>
          </div>
        </section>

        {/* Photo de l'équipe */}
        <section className="equipe-details__photo">
          <div className="container">
            <img 
              src={equipe.photoEquipe} 
              alt={`Photo de l'équipe ${equipe.nom}`}
              className="equipe-details__photo-img"
            />
          </div>
        </section>

        {/* Grid des joueurs */}
        {equipe.joueurs.length > 0 && (
          <section className="equipe-details__joueurs">
            <div className="container">
              <div className="equipe-details__joueurs-grid">
                {equipe.joueurs.map(joueur => (
                  <CardJoueur
                    key={joueur.id}
                    photo={joueur.photo}
                    numero={joueur.numero}
                    nom={joueur.nom}
                    poste={joueur.poste}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default EquipeDetails;
