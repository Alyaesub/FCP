import HeroPages from "../components/HeroPages";
import BannerScroll from "../components/BannerScroll";


//import img en attendant branchement back
//img CardMAtch & evenement
/* import logoFCP from '../assets/logo-rond-sansBg.png' */
import logoAno1 from '../assets/logo-ano.jpg'
import logoFCP from '../assets/logo-rond-sansBg.png'
import logoAno2 from '../assets/logo-ano-2.jpg'
import CarouselMatchs from "../components/CarouselMatchs";


function Actualites() {
  // hook temporaire pour les event
  const matchsData = [
    {
    category: 'Senior A',
    homeTeamLogo: logoFCP, // ton logo FC Provence
    homeTeamName: 'FC Provence',
    awayTeamLogo: logoAno1,
    awayTeamName: 'Équipe adverse',
    homeScore: 3,
    awayScore: 1,
    date: '13/25/35',
    location: 'Arles'
  },
  {
    category: 'Senior A',
    homeTeamLogo: logoFCP, // ton logo FC Provence
    homeTeamName: 'FC Provence',
    awayTeamLogo: logoAno2,
    awayTeamName: 'Équipe adverse',
    homeScore: 3,
    awayScore: 1,
    date: '13/25/35',
    location: 'Arles'
  },
  {
    category: 'Senior A',
    homeTeamLogo: logoFCP, // ton logo FC Provence
    homeTeamName: 'FC Provence',
    awayTeamLogo: logoAno1,
    awayTeamName: 'Équipe adverse',
    homeScore: 3,
    awayScore: 1,
    date: '13/25/35',
    location: 'Arles'
  },
  {
    category: 'Senior A',
    homeTeamLogo: logoFCP, // ton logo FC Provence
    homeTeamName: 'FC Provence',
    awayTeamLogo: logoAno2,
    awayTeamName: 'Équipe adverse',
    homeScore: 3,
    awayScore: 1,
    date: '13/25/35',
    location: 'Arles'
  },
  {
    category: 'Senior A',
    homeTeamLogo: logoFCP, // ton logo FC Provence
    homeTeamName: 'FC Provence',
    awayTeamLogo: logoAno1,
    awayTeamName: 'Équipe adverse',
    homeScore: 3,
    awayScore: 1,
    date: '13/25/35',
    location: 'Arles'
  },
  ];
  return (
    <div className="actualites">
      <section className="actu__heros">
        <HeroPages
        title="Découvrez toutes nos dernieres actualités"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text='Découvre les resultats de nos dernier matchs'
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      {/* section des home__result */}
      <section className="actualites__result">
        <h2 className="actualites__result-title">Nos dernières matchs</h2>
        {/* Carousel */}
        <CarouselMatchs 
        matchs={matchsData}
        variant="yellow"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text='Découvrez nos prochain matchs et nos dernieres actualités'
      backgroundColor="var(--club-yellow)"
      textColor="var(--club-green)"
      />
    </div>
  )
}

export default Actualites;