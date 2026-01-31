import HeroPages from "../components/HeroPages";
import SectionCTATeam from '../components/SectionCTA';
import CardEquipe from '../components/CardEquipe';
import BannerScroll from "../components/BannerScroll";

//import img 
import { IMAGES } from '../constants/images';

function Equipes() {
  return (
    <div className="equipes">
      <section className="equipes__hero">
        <HeroPages
        title="Découvrez toutes nos équipes"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text="Nos equipes de champions"
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      <section className="equipes__grid-section">
        <div className="container">
          <h2 className="equipes__grid-title">toutes les équipes de notre club</h2>
          <div className="equipes__grid">
            <CardEquipe
              logo={IMAGES.ecussons.u7}
              nom="FCP U7"
              details="L'équipe des baby"
              slug="u7"
            />
            <CardEquipe
              logo={IMAGES.ecussons.u9}
              nom="FCP U9"
              details="Les jeunes pousses"
              slug="u9"
            />
            <CardEquipe
              logo={IMAGES.ecussons.u10}
              nom="FCP U10"
              details="Les futurs champions"
              slug="u10"
            />
            <CardEquipe
              logo={IMAGES.ecussons.u12}
              nom="FCP U12"
              details="L'avenir du club"
              slug="u12"
            />
            <CardEquipe
              logo={IMAGES.ecussons.seniors}
              nom="Seniors"
              details="L'équipe première"
              slug="seniors"
            />
          </div>
        </div>
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text="N'attend plus rejoins nous vite"
      backgroundColor="var(--club-yellow)"
      textColor="var(--club-green)"
      />

      {/* section CTA home -> gallery */}
      <section className='equipes__sectionCTA'>
        <SectionCTATeam
        title="N'attendez plus rejoingnez nous"
        subtitle='Découvrez encore plus notre club et rejoignez nous des maintenant'
        buttonText='Contactez nous'
        buttonLink='/contact'
        image= {IMAGES.sectionCTA.logo}
        imageAlt='Mascotte du club'
        />
      </section>
    </div>
  )
}

export default Equipes;