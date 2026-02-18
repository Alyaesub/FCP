import HeroPages from "../components/HeroPages";
import BannerScroll from "../components/BannerScroll";
import SectionCTATeam from '../components/SectionCTA';

//import img 
import { IMAGES } from '../constants/images';

//import du SEO
import useSEO from '../hooks/useSEO';

function Contact() {
  //SEO
  useSEO({
  title: 'Contact & Rejoindre le club',
  description: 'Contactez le FC Provençal ou rejoignez-nous — informations pratiques, adresse et horaires.',
  url: '/contact'
});
  return (
    <div className="contact">
      <section className="contact__hero">
        <HeroPages
        title="Rejoingez-nous"
        subtitle="N’attendez plus : découvrez comment nous rejoindre"
        />
      </section>

      <BannerScroll
      text="Chosissez votre manière de nous contacter"
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      {/* Section Infos Contact */}
      <section className="contact__infos">
        <div className="container">
          <h2 className="contact__infos-title">Choisissez comment nous contactez</h2>
          
          <div className="contact__infos-grid">
            {/* Card Adresse */}
            <div className="contact__info-card">
              <h3 className="contact__info-card-title">Notre adresse</h3>
              <p className="contact__info-card-text">
                Stade Municipal de Mas-Thibert<br />
                Avenue Alain Guigue<br />
                13104 Mas-Thibert
              </p>
            </div>

            {/* Card Email */}
            <div className="contact__info-card">
              <h3 className="contact__info-card-title">Notre email</h3>
              <a 
                href="mailto:fcprovencale@gmail.com" 
                className="contact__info-card-link"
              >
                fcprovencale@gmail.com
              </a>
            </div>

            {/* Card Téléphone */}
            <div className="contact__info-card">
              <h3 className="contact__info-card-title">Téléphone</h3>
              <a 
                href="tel:+33680689162" 
                className="contact__info-card-link"
              >
                06 80 68 91 62
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* section CTA */}
      <section className='equipes__sectionCTA'>
        <SectionCTATeam
        title="N'attendez plus rejoignez-nous"
        subtitle='Découvrez encore plus notre club et rejoignez-nous des maintenant'
        buttonText='Contactez nous par mail'
        buttonLink="mailto:fcprovencale@gmail.com"
        image= {IMAGES.sectionCTA.logo}
        imageAlt='Mascotte du club'
        />
      </section>

      <BannerScroll
      text="Quelques infos pour nous rejoindre"
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      {/* Section Infos Pratiques Inscriptions */}
      <section className="contact__inscriptions">
        <div className="container">
          <h2 className="contact__inscriptions-title">Infos pratiques pour les inscriptions :</h2>
          
          <div className="contact__inscriptions-content">
            {/* Mascotte gauche */}
            <img 
              src={IMAGES.mascottes.lion} 
              alt="Mascotte FC Provence"
              className="contact__inscriptions-mascotte contact__inscriptions-mascotte--left"
            />

            {/* Card centrale */}
            <div className="contact__inscriptions-card">
              <h3 className="contact__inscriptions-card-title">
                Contactez-nous et préparons votre inscription
              </h3>
              
              <div className="contact__inscriptions-card-documents">
                <h4 className="contact__inscriptions-card-subtitle">Documents à fournir :</h4>
                <ul className="contact__inscriptions-card-list">
                  <li>
                    Après avoir communiqué une adresse e-mail valide, suivez le lien transmis par la FFF.
                  </li>
                  <li>Certificat médical de non-contre-indication</li>
                  <li>Photocopie de la carte d’identité</li>
                  <li>Photo d’identité récente</li>
                  <li>Paiement en ligne ou sur place, directement au club</li>
                </ul>
              </div>
            </div>

            {/* Mascotte droite */}
            <img 
              src={IMAGES.mascottes.lionne} 
              alt="Mascotte FC Provence"
              className="contact__inscriptions-mascotte contact__inscriptions-mascotte--right"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;