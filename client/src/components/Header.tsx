import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import { IMAGES } from '../constants/images';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/" onClick={closeMenu}>
            <img src={IMAGES.logo} alt="FC Provence Logo" />
            <span>FC Provence</span>
          </Link>
        </div>

        {/* Menu Burger (visible sur mobile uniquement) */}
        <button 
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li><Link to="/actualites" onClick={closeMenu}>Actualités</Link></li>
            <li><Link to="/equipes" onClick={closeMenu}>Nos équipes</Link></li>
            <li><Link to="/galerie" onClick={closeMenu}>Galerie photo</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact & infos</Link></li>
          </ul>
        </nav>

        {/* Bouton Administration */}
        <div className="header__actions">
          <Link to="/admin/login" onClick={closeMenu}>
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