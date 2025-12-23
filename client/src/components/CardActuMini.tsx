type CardActuMiniProps = {
  title: string;
  items?: string[]
  date: string;
  location: string;
};

const CardActuMini = ({
  title,
  items,
  date,
  location
}: CardActuMiniProps) => {
  return (
    <div className="card-actu-mini">
      {/* Titre */}
      <h4 className="card-actu-mini__title">{title}</h4>

      {/* Liste si on a des items */}
      {items && items.length > 0 && (
        <ul className="card-actu-mini__list">
          {items.map((item, index) => (
            <li key={index} className="card-actu-mini__item">
              {item}
            </li>
          ))}
        </ul>
      )}
      
      {/* Footer avec date et lieu */}
      <div className="card-actu-mini__footer">
        <span className="card-actu-mini__date">{date}</span>
        <span className="card-actu-mini__separator">•</span>
        <span className="card-actu-mini__location">{location}</span>
      </div>
    </div>
  );
}

export default CardActuMini