import { IMAGES } from '../constants/images'

function Sponsors() {
  return (
    <section className="sponsors">
      <div className="sponsors__container">
        <h2 className="sponsors__title">Nos sponsors:</h2>
        
        <div className="sponsors__grid">
          {/* Sponsor 1 */}
          <div className="sponsors__item">
            <img src={IMAGES.sponsors.sponsor2} alt="logo rougeline" />
          </div>

          {/* Sponsor 2 */}
          <div className="sponsors__item">
            <img src={IMAGES.sponsors.sponsor3}  alt="logo RDT" />
          </div>

          {/* Sponsor 3 */}
          <div className="sponsors__item">
            <img src={IMAGES.sponsors.sponsor2}  alt="logo rougeline" />
          </div>

          {/* Sponsor 4  */}
          <div className="sponsors__item">
            <img src={IMAGES.sponsors.sponsor4}  alt="logo RDT" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;