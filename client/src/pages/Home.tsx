import { Link } from 'react-router-dom';
//import composant
import Button from "../components/Button";
import CardMatch from '../components/CardMatch';

//import img
import logoFCP from '../assets/logo-rond-sansBg.png'
import logoEXT from '../assets/logo-ext.png'


function Home() {
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
              homeTeamName="FC Provence"
              awayTeamLogo={logoEXT}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
            <CardMatch 
              category="U10"
              homeTeamLogo={logoFCP}
              homeTeamName="FC Provence"
              awayTeamLogo={logoEXT}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
            <CardMatch 
              category="U10"
              homeTeamLogo={logoFCP}
              homeTeamName="FC Provence"
              awayTeamLogo={logoEXT}
              awayTeamName="Cruzeiro"
              homeScore={4}
              awayScore={2}
              date="16/12/2024"
              location="Stade de Mas-Thibert"
            />
            </div>
      </section>
      
      <section className="home__news">
        <h2 className="home__news-title">Nos dernières actualités</h2>
        {/* Cards actualités */}
      </section>
      
      <section className="home__teams">
        <h2 className="home__teams-title">Découvrez nos équipes</h2>
        {/* Cards équipes */}
      </section>
    </div>
  );
}

export default Home;