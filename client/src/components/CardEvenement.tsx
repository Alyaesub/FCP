type CardEvenementProps = {
  type: 'match' | 'event';
  title: string;
  date: string;
  location: string;
  logo?: string;
  logoAlt?: string;
  items?: string[];
};

const CardEvenement = ({
  type,
  title,
  date,
  location,
  logo,
  logoAlt,
  items
}: CardEvenementProps) => {
  return (
    <div className="card-evenement">
      {/* Titre */}
      <h3 className="card-evenement__title">{title}</h3>

      {/* Contenu selon le type */}
      <div className="card-evenement__body">
        {type === 'match' && logo && (
          <div className="card-evenement__logo">
            <img src={logo} alt={logoAlt || 'Logo équipe'} />
          </div>
        )}

        {type === 'event' && items && items.length > 0 && (
          <ul className="card-evenement__list">
            {items.map((item, index) => (
              <li key={index} className="card-evenement__item">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer avec date et lieu */}
      <div className="card-evenement__footer">
        <span className="card-evenement__date">LE : {date}</span>
        <span className="card-evenement__location">À : {location}</span>
      </div>
    </div>
  );
};

export default CardEvenement;