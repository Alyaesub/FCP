import { Link } from 'react-router-dom';


interface CardEquipeProps {
  logo: string;
  nom: string;
  details: string;
  slug: string;
}

function CardEquipe({ logo, nom, details, slug }: CardEquipeProps) {
  return (
    <Link to={`/equipes/${slug}`} className="card-equipe">
      <div className="card-equipe__image-container">
        <img 
          src={logo} 
          alt={nom} 
          className="card-equipe__image"
        />
      </div>
      
      <div className="card-equipe__content">
        <h3 className="card-equipe__nom">{nom}</h3>
        <p className="card-equipe__details">{details}</p>
      </div>
    </Link>
  );
}

export default CardEquipe;