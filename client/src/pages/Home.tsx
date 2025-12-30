import { Link } from 'react-router-dom';
//import composant
import Button from "../components/Button";
import CardMatch from '../components/CardMatch'
import CardActuPrincipal from '../components/CardActuPrincipal'
import CardActuMini from '../components/CardActuMini';
import CarouselJoueurs from '../components/CarouselJoueurs';
import SectionCTAHome from '../components/SectionCTAHome';
import CarouselEvenements from '../components/CarouselEvenement';
import BannerScroll from '../components/BannerScroll';

//import img en attendant branchement back
//img CardMAtch & evenement
import logoFCP from '../assets/logo-rond-sansBg.png'
import logoAno1 from '../assets/logo-ano.jpg'
import logoAno2 from '../assets/logo-ano-2.jpg'
//img carrousel
import joueurHommeRandom from '../assets/mascotte-ballon2.png'
import joueurFilleRandom from '../assets/mascotte-lionne2.png'
import joueur1 from '../assets/photo-perso1.jpg'
import joueur2 from '../assets/photo-perso2.jpg'
//img sectionCTAHome
import logoSectionCTAHome from '../assets/logo-SectionCTA.png'



function Home() {
   // Hook temporaire de tous les joueurs
  const joueursData = [
    { photo: joueur1, numero: 1, nom: "JOUEUR A" },
    { photo: joueur2, numero: 2, nom: "JOUEUR B" },
    { photo: joueurHommeRandom, numero: 3, nom: "JOUEUR C" },
    { photo: joueurFilleRandom, numero: 4, nom: "JOUEUR D" },
    { photo: joueurFilleRandom, numero: 5, nom: "JOUEUR E" },
    { photo: joueurHommeRandom, numero: 6, nom: "JOUEUR F" },
    { photo: joueurFilleRandom, numero: 7, nom: "JOUEUR G" },
  ];
  // hook temporaire pour les event
  const evenementsData = [
    {
      type: 'match' as const,
      title: 'Notre prochain matche contre :',
      logo: logoAno2,
      logoAlt: 'logo equipe ext',
      date: '13/25/35',
      location: 'Arles'
    },
    {
      type: 'event' as const,
      title: 'retrouver nous pour la tombolat',
      items: ['Jeux pour enfants', 'Concours', 'Barbecue'],
      date: '13/25/35',
      location: 'Arles'
    },
    {
      type: 'event' as const,
      title: 'retrouver nous pour la tombolat',
      items: ['Jeux pour enfants', 'Concours', 'Barbecue'],
      date: '13/25/35',
      location: 'Arles'
    },
    {
      type: 'match' as const,
      title: 'Notre prochain matche contre :',
      logo: logoAno2,
      logoAlt: 'logo equipe ext',
      date: '13/25/35',
      location: 'Arles'
    },
  ];
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">Bienvenue au FC Provence</h1>
        <p className="home__hero-subtitle">plus qu'un club, une famille.</p>
        <div className="home__hero-cta">
          <Link to="/contact">
            <Button variant="secondary" size="small">
            Contactez-nous
          </Button>
          </Link>
        </div>
      </section>
      
      {/* section des home__result */}
      <section className="home__result">
        <h2 className="home__result-title">Nos dernières matchs</h2>
          <div className="home__result-container">
            <CardMatch 
              category="U10"
              homeTeamLogo={logoFCP}
              variant="green"
              homeTeamName="FC Provence"
              awayTeamLogo={logoAno1}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
            <CardMatch 
              category="U10"
              variant="green"
              homeTeamLogo={logoFCP}
              homeTeamName="FC Provence"
              awayTeamLogo={logoAno1}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
            <CardMatch 
              category="U10"
              variant="green"
              homeTeamLogo={logoFCP}
              homeTeamName="FC Provence"
              awayTeamLogo={logoAno1}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
          </div>
      </section>
      
      {/* section home actualités */}
      <section className="home__news">
        <div className="home__news-header">
          <h2 className="home__news-title">Actualités récentes</h2>
          <Link to="/actualites" className="home__news-link">
            Voir toutes les actualités →
          </Link>
        </div>
        <div className='home__news-container'>
          <CardActuPrincipal
            title='Kermes du FCP'
            items={[
              "concours de tirs au but",
              "grillade",
              "tombolat"
            ]}
            date='23/04/26'
            location='Stade de Mas-Thibert'
          />
          <div className="home__news-mini">
            <CardActuMini
          title='lorem ipsum'
          items={[
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum"
          ]}
          date='05/03/26'
          location='Stade de Mas-Thibert'
          />
          <CardActuMini
          title='lorem ipsum'
          items={[
            "lorem ipsum",
            "lorem ipsum",
            "lorem ipsum"
          ]}
          date='05/03/26'
          location='Stade de Mas-Thibert'
          />
          </div>
        </div>
      </section>
      
      {/* Bandeau défilant */}
      <BannerScroll text='Découvre nos équipes et nos joueurs'/>
      {/* sections home joueurs/équipes */}
      <section className="home__teams">
        <div className="home__teams-header">
          <h2 className="home__teams-title">Découvrez les équipes</h2>
          <Link to="/equipes" className="home__teams-link">
            Voir toutes nos équipes →
          </Link>
        </div>
        {/* carousel card joueur */}
        <CarouselJoueurs joueurs={joueursData} />
      </section>

      {/* section CTA home -> gallery */}
      <section className='home__sectionCTA'>
        <SectionCTAHome
        title='Découvrez les photos de nos matchs et événement'
        subtitle='Découvrez encore plus notre club et rejoignez nous des maintenant'
        buttonText='Voir nos galerie photos'
        buttonLink='/galerie'
        image= {logoSectionCTAHome}
        imageAlt='Mascotte du club'
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll text='Evénement a venir'/>
      {/* section evenement */}
      <section className="home__events">
        {/* Titre */}
        <h2 className="home__events-title">Nos futurs matchs & événements</h2>
        {/* Carousel */}
        <CarouselEvenements evenements={evenementsData} />
      </section>
    </div>
  );
}

export default Home;
