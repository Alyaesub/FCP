//import img 
import { IMAGES } from '../constants/images';

interface HeroPagesProps {
  title: string;
  subtitle?: string;
}

const HeroPages = ({ title, subtitle }: HeroPagesProps) => {
  return (
    <section className="hero">
      <div className="hero__mascot hero__mascot--left">
        <img src={IMAGES.mascottes.lionBallon} alt="Mascotte FC Provence" />
      </div>

      <div className="hero__content">
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        <h1 className="hero__title">{title}</h1>
      </div>

      <div className="hero__mascot hero__mascot--right">
        <img src={IMAGES.mascottes.lionne} alt="Mascotte FC Provence" />
      </div>
    </section>
  );
};

export default HeroPages;