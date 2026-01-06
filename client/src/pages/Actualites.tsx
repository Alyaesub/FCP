import { Link } from "react-router-dom";
import HeroPages from "../components/HeroPages";
import BannerScroll from "../components/BannerScroll";
import CarouselEvenements from '../components/CarouselEvenement';


//import img en attendant branchement back
//img CardMAtch & evenement
/* import logoFCP from '../assets/logo-rond-sansBg.png' */
import logoAno1 from '../assets/logo-ano.jpg'
import logoFCP from '../assets/logo-rond-sansBg.png'
import logoAno2 from '../assets/logo-ano-2.jpg'
import CarouselMatchs from "../components/CarouselMatchs";


function Actualites() {
  // hook temporaire pour les event
  const matchsPastData = [
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
  const matchFuturData = [
    {
      type: 'match' as const,
      title: 'Notre prochain matche contre :',
      logo: logoAno1,
      logoAlt: 'logo equipe ext',
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
    {
      type: 'match' as const,
      title: 'Notre prochain matche contre :',
      logo: logoAno1,
      logoAlt: 'logo equipe ext',
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
  ]
  // hook temporaire pour les event
  const evenementsData = [
    {
      type: 'event' as const,
      title: 'Grande tombola du club',
      items: ['Lots à gagner', 'Tirage au sort', 'Buvette sur place'],
      date: '15/03/24',
      location: 'Stade Municipal'
    },
    {
      type: 'event' as const,
      title: 'Kermesse de printemps',
      items: ['Jeux pour enfants', 'Stand maquillage', 'Barbecue géant'],
      date: '22/04/24',
      location: 'Complexe sportif'
    },
    {
      type: 'event' as const,
      title: 'Sortie bowling équipe U13',
      items: ['2 parties offertes', 'Goûter inclus', 'Transport organisé'],
      date: '10/05/24',
      location: 'Bowling Arles'
    },
    {
      type: 'event' as const,
      title: 'Journée à Marseille',
      items: ['Visite du Vélodrome', 'Match OM-PSG', 'Repas au vieux port'],
      date: '18/06/24',
      location: 'Marseille'
    },
    {
      type: 'event' as const,
      title: 'Tournoi inter-clubs',
      items: ['8 équipes participantes', 'Remise des trophées', 'Pot de clôture'],
      date: '05/07/24',
      location: 'Arles'
    },
    {
      type: 'event' as const,
      title: 'Assemblée générale du club',
      items: ['Bilan de saison', 'Vote du budget', 'Élections bureau'],
      date: '12/09/24',
      location: 'Salle des fêtes'
    }
  ];
  return (
    <div className="actualites">
      <section className="actualites__heros">
        <HeroPages
        title="Découvrez toutes nos dernieres actualités"
        subtitle="nos dernier match et événements a venir"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text='Découvre les resultats de nos dernier matchs'
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      {/* section des actu__result */}
      <section className="actualites__result">
        <h2 className="actualites__result-title">Nos dernières matchs</h2>
        {/* Carousel */}
        <CarouselMatchs 
        matchs={matchsPastData}
        variant="yellow"
        />
      </section>

      {/* Bandeau défilant */}
      <BannerScroll 
      text='Découvrez nos prochain matchs et nos dernieres actualités'
      backgroundColor="var(--club-yellow)"
      textColor="var(--club-green)"
      />

      {/* section match futur */}
      <section className="actualites__events">
        {/* Titre */}
        <h2 className="actualites__events-title">Nos futurs matchs</h2>
        {/* Carousel */}
        <CarouselEvenements evenements={matchFuturData} />
      </section>

      {/* section evenement futur */}
      <section className="actualites__events">
        {/* Titre */}
        <h2 className="actualites__events-title">Nos dernieres news</h2>
        {/* Carousel */}
        <CarouselEvenements evenements={evenementsData} />
        <div className="actualites__events-footer">
          <Link to="/galerie" className="actualites__events-link">
            Découvrez les photos de tous nos événements  →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Actualites;