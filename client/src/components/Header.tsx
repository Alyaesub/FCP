import { Link } from 'react-router-dom';
import Button from './Button';
import logoFCP from '../assets/logo-rond-sansBg.png'

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">
            <img src={logoFCP} alt="FC Provence Logo" />
            <span>FC Provence</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="header__nav">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/equipes">Nos équipes</Link></li>
            <li><Link to="/calendrier">Calendrier</Link></li>
            <li><Link to="/galerie">Galerie photo</Link></li>
            <li><Link to="/contact">Contact & info</Link></li>
          </ul>
        </nav>

        {/* Bouton Administration */}
        <div className="header__actions">
          <Link to="/admin">
            <Button variant="primary" size="small">
              Administration
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;