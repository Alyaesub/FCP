import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Section Liens */}
        <div className="footer__section">
          <h3> Liens utiles </h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/equipes">Nos équipes</Link></li>
            <li><Link to="/calendrier">Calendrier</Link></li>
            <li><Link to="/galerie">Galerie photo</Link></li>
            <li><Link to="/contact">Contact & infos</Link></li>
          </ul>
        </div>

        {/* Section Contact */}
        <div className="footer__section">
          <h3>Nous contacter </h3>
          <p>Notre email : <a href="mailto:fcprovencale@gmail.com">fcprovencale@gmail.com</a></p>
        </div>

        {/* Section Réseaux sociaux */}
        <div className="footer__section">
          <h3>Nos réseaux </h3>
          <div className="footer__socials">
            <a href="https://www.facebook.com/Football.Club.Provencal/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="icon-facebook">Facebook</i>
            </a>
            <a href="https://www.instagram.com/fcp.masthibert/" target="_blank" rel="noopener noreferrer" aria-label="instagram">
              <i className="icon-instagram">Instagram</i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <p>© 2026</p>
        <p>Site réalisé par <a href="https://pascalreynier.fr/" target="_blank">Reynier Pascal, voir le portfolio.</a></p>
      </div>
    </footer>
  );
}

export default Footer;