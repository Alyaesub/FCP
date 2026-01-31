import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Section Liens */}
        <div className="footer__section">
          <h3>Liens vers les pages :</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/equipes">Nos équipes</Link></li>
            <li><Link to="/calendrier">Calendrier</Link></li>
            <li><Link to="/galerie">Galerie photo</Link></li>
            <li><Link to="/contact">Contact & info</Link></li>
          </ul>
        </div>

        {/* Section Contact */}
        <div className="footer__section">
          <h3>Nous contacter :</h3>
          <p>Notre email : <a href="mailto:www.fc-provence.fr">www.fc-provence.fr</a></p>
        </div>

        {/* Section Réseaux sociaux */}
        <div className="footer__section">
          <h3>Nos réseaux :</h3>
          <div className="footer__socials">
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i className="icon-tiktok">TikTok</i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="icon-facebook">Facebook</i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <p>© 2026</p>
        <p>Site fait par <a href="https://pascalreynier.fr/" target="_blank">Reynier pascal, voir mon portfolio</a></p>
      </div>
    </footer>
  );
}

export default Footer;