interface CardPhotoProps {
  image: string;
  titre: string;
  onClick: () => void;
}

function CardPhoto({ image, titre, onClick }: CardPhotoProps) {
  return (
    <div className="card-photo" onClick={onClick}>
      <img 
        src={image} 
        alt={titre}
        className="card-photo__image"
      />
      <div className="card-photo__overlay">
        <p className="card-photo__titre">{titre}</p>
      </div>
    </div>
  );
}

export default CardPhoto;