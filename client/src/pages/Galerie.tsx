import { useState, useEffect } from "react";

// Composants
import BannerScroll from "../components/BannerScroll";
import HeroPages from "../components/HeroPages";
import CardPhoto from "../components/CardPhoto";
import Lightbox from "../components/Lightbox";

// API
import { getGaleries, getPhotos } from "../api/index";
import type { Galerie as GalerieType, Photo } from "../api/index";

function Galerie() {
  // ============================================
  // STATES
  // ============================================
  const [galeries, setGaleries] = useState<GalerieType[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filtreGalerie, setFiltreGalerie] = useState<number | null>(null);
  const [photoSelectionnee, setPhotoSelectionnee] = useState<{ image: string; titre: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH galeries + photos
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galeriesRes, photosRes] = await Promise.all([
          getGaleries(),
          getPhotos(),
        ]);

        setGaleries(galeriesRes);
        setPhotos(photosRes);
      } catch (err) {
        console.error("Erreur fetching Galerie:", err);
        setError("Oops ! Erreur lors du chargement des photos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================
  // FILTRAGE des photos
  // ============================================
  const photosFiltrees = filtreGalerie === null
    ? photos // Toutes les photos
    : photos.filter(photo => photo.galerie_id === filtreGalerie);

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="galerie">
        <div className="galerie__loading">
          <div className="galerie__spinner"></div>
          <p>Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="galerie">
        <div className="galerie__error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="galerie">
      {/* Hero */}
      <section className="galerie__hero">
        <HeroPages
          title="Découvrez toutes nos galeries photos"
          subtitle="Revivez les meilleurs moments du club"
        />
      </section>

      {/* Bandeau */}
      <BannerScroll
        text="Retrouvez toutes les photos de nos événements"
        backgroundColor="var(--club-green)"
        textColor="var(--club-yellow)"
      />

      {/* Filtre */}
      <section className="galerie__header">
        <div className="container">
          <div className="galerie__header-content">
            <h2 className="galerie__title">Galerie photo</h2>

            <select
              className="galerie__select"
              value={filtreGalerie ?? ""}
              onChange={(e) => setFiltreGalerie(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Tous les événements</option>
              {galeries.map((galerie) => (
                <option key={galerie.id} value={galerie.id}>
                  {galerie.titre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid de photos */}
      <section className="galerie__grid-section">
        <div className="container">
          {photosFiltrees.length > 0 ? (
            <div className="galerie__grid">
              {photosFiltrees.map((photo) => (
                <CardPhoto
                  key={photo.id}
                  image={photo.url || photo.filename}
                  titre={photo.description || "Photo du club"}
                  onClick={() =>
                    setPhotoSelectionnee({
                      image: photo.url || photo.filename,
                      titre: photo.description || "Photo du club",
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <p className="galerie__no-photos">Aucune photo disponible pour cet événement.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {photoSelectionnee && (
        <Lightbox
          image={photoSelectionnee.image}
          titre={photoSelectionnee.titre}
          onClose={() => setPhotoSelectionnee(null)}
        />
      )}
    </div>
  );
}

export default Galerie;