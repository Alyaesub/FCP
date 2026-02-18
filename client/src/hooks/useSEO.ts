import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

const BASE_TITLE = 'FC Provençal';
const BASE_DESCRIPTION = 'Site officiel du FC Provençal — Actualités, équipes, matchs et galerie photo du club de football local.';
const BASE_URL = 'https://fcprovençal.fr';

const useSEO = ({ title, description, url }: SEOProps = {}) => {
  useEffect(() => {
    // Titre de la page
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

    // Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || BASE_DESCRIPTION);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', title ? `${title} | ${BASE_TITLE}` : BASE_TITLE);
    if (ogDescription) ogDescription.setAttribute('content', description || BASE_DESCRIPTION);
    if (ogUrl) ogUrl.setAttribute('content', url ? `${BASE_URL}${url}` : BASE_URL);

    // Retour aux valeurs par défaut quand on quitte la page
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description, url]);
};

export default useSEO;