function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">Bienvenue au FC Provence</h1>
        <p className="home__hero-subtitle">plus qu'un club, une famille.</p>
        <div className="home__hero-cta">
        {/*  <Button variant="secondary" size="large">
            Découvrir le club
          </Button> */}
        </div>
      </section>

      <section className="home__result">
        <h2 className="home__result-title">Nos dernières matchs</h2>
        {/* Cards match*/}
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