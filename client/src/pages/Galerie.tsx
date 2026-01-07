import { useState } from "react";
import BannerScroll from "../components/BannerScroll";
import HeroPages from "../components/HeroPages";
import CardPhoto from "../components/CardPhoto";
import Lightbox from "../components/Lightbox";
import { photos, evenements } from "../data/galerieData";


function Galerie() {
  // hook État pour le filtre sélectionné (null = toutes les photos)
  const [filtreEvenement, setFiltreEvenement] = useState<number | null>(null);

  // État pour le lightbox
  const [photoSelectionnee, setPhotoSelectionnee] = useState<{ image: string; titre: string } | null>(null);

  // Filtrer les photos selon l'événement sélectionné
  const photosFiltrees = filtreEvenement === null
    ? photos // Toutes les photos
    : photos.filter(photo => photo.evenementId === filtreEvenement);

  return (
    <div className="galerie">
      <section className="galerie__hero">
        <HeroPages
        title="Découvrez toutes nos galeries photo"
        subtitle="Revivez les meilleurs moments du club"
        />
      </section>

      <BannerScroll
      text="retrouvez toutes les photos de nos événements"
      backgroundColor="var(--club-green)"
      textColor="var(--club-yellow)"
      />

      <section className="galerie__header">
          <div className="container">
            <div className="galerie__header-content">
              <h2 className="galerie__title">Galerie photo</h2>
              
              <select 
                className="galerie__select"
                value={filtreEvenement ?? ''}
                onChange={(e) => setFiltreEvenement(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Tous les événements</option>
                {evenements.map(evenement => (
                  <option key={evenement.id} value={evenement.id}>
                    {evenement.nom}
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
                {photosFiltrees.map(photo => (
                  <CardPhoto
                    key={photo.id}
                    image={photo.image}
                    titre={photo.titre}
                    onClick={() => setPhotoSelectionnee({ image: photo.image, titre: photo.titre })}
                  />
                ))}
              </div>
            ) : (
              <p className="galerie__no-photos">
                Aucune photo disponible pour cet événement.
              </p>
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
  )
}

export default Galerie;