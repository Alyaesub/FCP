import { Link } from 'react-router-dom';
import Button from './Button';

type SectionCTAHomeProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
};

const SectionCTAHome = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
  imageAlt
}: SectionCTAHomeProps) => {
  return (
    <section className="section-cta">
      <div className="section-cta__container">
        {/* Contenu texte + bouton */}
        <div className="section-cta__content">
          <h2 className="section-cta__title">{title}</h2>
          <p className="section-cta__subtitle">{subtitle}</p>
          <Link to={buttonLink}>
            <Button variant="primary" size="large">
              {buttonText}
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="section-cta__image">
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
};

export default SectionCTAHome;