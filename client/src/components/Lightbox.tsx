interface LightboxProps {
  image: string;
  titre: string;
  onClose: () => void;
}

function Lightbox({ image, titre, onClose }: LightboxProps) {
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__overlay"></div>
      
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose}>
          ✕
        </button>
        
        <img 
          src={image} 
          alt={titre}
          className="lightbox__image"
        />
        
        <p className="lightbox__titre">{titre}</p>
      </div>
    </div>
  );
}

export default Lightbox;