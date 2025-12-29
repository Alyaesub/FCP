type BannerScrollProps = {
  text: string;
  backgroundColor?: string;
  textColor?: string;
};

const BannerScroll = ({
  text,
  backgroundColor = 'var(--club-yellow)',
  textColor = 'var(--club-green)'
}: BannerScrollProps) => {
  return (
    <div 
      className="banner-scroll"
      style={{ 
        backgroundColor: backgroundColor 
      }}
    >
      <div className="banner-scroll__content">
        {/* répète le texte 8 fois pour une boucle fluide */}
        {Array(8).fill(null).map((_, index) => (
          <span 
            key={index} 
            className="banner-scroll__item"
            style={{ color: textColor }}
          >
            {text}
            <span className="banner-scroll__separator">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BannerScroll;