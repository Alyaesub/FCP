import mascotteLion from '../assets/mascotte-lionBallon-sansBG.png'
import mascotteLionne from '../assets/mascotte-lionne-sansBG.png'

interface HeroPagesProps {
  title: string;
  subtitle?: string;
}

const HeroPages = ({ title, subtitle }: HeroPagesProps) => {
  return (
    <section className="hero">
      <div className="hero__mascot hero__mascot--left">
        <img src={mascotteLion} alt="Mascotte FC Provence" />
      </div>

      <div className="hero__content">
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        <h1 className="hero__title">{title}</h1>
      </div>

      <div className="hero__mascot hero__mascot--right">
        <img src={mascotteLionne} alt="Mascotte FC Provence" />
      </div>
    </section>
  );
};

export default HeroPages;