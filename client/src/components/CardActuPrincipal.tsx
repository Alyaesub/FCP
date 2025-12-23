type CardActuPrincipalProps = {
  title: string;
  items: string[];
  date: string;
  location: string;
};

const CardActuPrincipal = ({
  title,
  items,
  date,
  location
}: CardActuPrincipalProps) => {
  return (
    <div className="card-actu-principale">
      {/* Encart jaune avec contenu */}
      <div className="card-actu-principale__content">
        <h3 className="card-actu-principale__title">{title}</h3>
        
        <ul className="card-actu-principale__list">
          {items.map((item, index) => (
            <li key={index} className="card-actu-principale__item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bandeau date et lieu */}
      <div className="card-actu-principale__footer">
        <span className="card-actu-principale__date">LE : {date}</span>
        <span className="card-actu-principale__separator">•</span>
        <span className="card-actu-principale__location">À : {location}</span>
      </div>
    </div>
  );
};

export default CardActuPrincipal;