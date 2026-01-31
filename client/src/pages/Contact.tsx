import HeroPages from "../components/HeroPages";
import BannerScroll from "../components/BannerScroll";
import SectionCTATeam from '../components/SectionCTA';

//import img 
import { IMAGES } from '../constants/images';

function Contact() {
  return (
    <div className="contact">
      <section className="contact__hero">
        <HeroPages
        title="Rejoingez Nous vite"
        subtitle="N'attendez plus et découvrez comment nous rejoindre"
        />
      </section>

      <BannerScroll
      text="chosissez votre maniére de nous contactez"
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
              <h3 className="contact__info-card-title">Notre adresse postale :</h3>
              <p className="contact__info-card-text">
                Stade Municipal de Provence<br />
                12 Avenue des Sports<br />
                13000 Marseille
              </p>
            </div>

            {/* Card Email */}
            <div className="contact__info-card">
              <h3 className="contact__info-card-title">Notre email :</h3>
              <a 
                href="mailto:contact@fcprovence.fr" 
                className="contact__info-card-link"
              >
                contact@fcprovence.fr
              </a>
            </div>

            {/* Card Téléphone */}
            <div className="contact__info-card">
              <h3 className="contact__info-card-title">Nos numéros :</h3>
              <a 
                href="tel:+33123456789" 
                className="contact__info-card-link"
              >
                01 23 45 67 89
              </a>
              <a 
                href="tel:+33987654321" 
                className="contact__info-card-link"
              >
                09 87 65 43 21
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* section CTA */}
      <section className='equipes__sectionCTA'>
        <SectionCTATeam
        title="N'attendez plus rejoingnez nous"
        subtitle='Découvrez encore plus notre club et rejoignez nous des maintenant'
        buttonText='Contactez nous par mail'
        buttonLink="mailto:www.fc-provence.fr"
        image= {IMAGES.sectionCTA.logo}
        imageAlt='Mascotte du club'
        />
      </section>

      <BannerScroll
      text="quelques infos pour nous rejoindre"
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
                  <li>Certificat médical de non contre-indication</li>
                  <li>Photocopie de la carte d'identité</li>
                  <li>Photo d'identité récente</li>
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