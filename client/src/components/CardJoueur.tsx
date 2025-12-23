type CardJoueurProps = {
  photo: string;
  numero: number;
  nom: string;
  poste?: string;
};

const CardJoueur = ({
  photo,
  numero,
  nom,
  poste
}: CardJoueurProps) => {
  return (
    <div className="card-joueur">
      {/* Image du joueur */}
      <img 
        src={photo} 
        alt={nom}
        className="card-joueur__photo"
      />
      
      {/* Overlay sombre */}
      <div className="card-joueur__overlay"></div>
      
      {/* Contenu (numéro + nom) */}
      <div className="card-joueur__content">
        <span className="card-joueur__numero">{numero}</span>
        <h4 className="card-joueur__nom">{nom}</h4>
        {poste && <span className="card-joueur__poste">{poste}</span>}
      </div>
    </div>
  );
};

export default CardJoueur;