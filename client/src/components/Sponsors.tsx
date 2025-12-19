import Sponsors1 from '../assets/sponsorFake.jpg'
import Sponsors2 from '../assets/sponsorFake2.jpg'
import Sponsors3 from '../assets/sponsorFake.webp'
import Sponsors4 from '../assets/sposorFake3.avif'

function Sponsors() {
  return (
    <section className="sponsors">
      <div className="sponsors__container">
        <h2 className="sponsors__title">Nos sponsors:</h2>
        
        <div className="sponsors__grid">
          {/* Sponsor 1 - GEOTEC */}
          <div className="sponsors__item">
            <img src={Sponsors1} alt="GEOTEC - Construções e Fundações" />
          </div>

          {/* Sponsor 2 - Grupo Buzatto's */}
          <div className="sponsors__item">
            <img src={Sponsors2}  alt="Grupo Buzatto's" />
          </div>

          {/* Sponsor 3 - MELK Andaimes */}
          <div className="sponsors__item">
            <img src={Sponsors3}  alt="MELK Andaimes" />
          </div>

          {/* Sponsor 4 - ADFO */}
          <div className="sponsors__item">
            <img src={Sponsors4}  alt="ADFO - Advogados Associados" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sponsors;