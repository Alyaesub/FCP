import { useEffect, useState } from 'react';
import { 
  getEquipes, 
  getJoueurs, 
  getMatchs, 
  getPhotos 
} from '../../api';

interface Stats {
  equipes: number;
  joueurs: number;
  matches: number;
  photos: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    equipes: 0,
    joueurs: 0,
    matches: 0,
    photos: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      const [equipesData, joueursData, matchesData, photosData] = await Promise.all([
        getEquipes(),
        getJoueurs(),
        getMatchs(),
        getPhotos(),
      ]);

      setStats({
        equipes: equipesData.length,
        joueurs: joueursData.length,
        matches: matchesData.length,
        photos: photosData.length,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="dashboard__loading"><p>Chargement...</p></div>;
  }

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-content__title">Tableau de bord</h1>

      {/* Stats */}
      <div className="dashboard-content__stats">
        <div className="dashboard-content__stat">
          <div className="dashboard-content__stat-icon">⚽</div>
          <div className="dashboard-content__stat-content">
            <p className="dashboard-content__stat-value">{stats.equipes}</p>
            <p className="dashboard-content__stat-label">Équipes</p>
          </div>
        </div>

        <div className="dashboard-content__stat">
          <div className="dashboard-content__stat-icon">👥</div>
          <div className="dashboard-content__stat-content">
            <p className="dashboard-content__stat-value">{stats.joueurs}</p>
            <p className="dashboard-content__stat-label">Joueurs</p>
          </div>
        </div>

        <div className="dashboard-content__stat">
          <div className="dashboard-content__stat-icon">🏆</div>
          <div className="dashboard-content__stat-content">
            <p className="dashboard-content__stat-value">{stats.matches}</p>
            <p className="dashboard-content__stat-label">Matchs</p>
          </div>
        </div>

        <div className="dashboard-content__stat">
          <div className="dashboard-content__stat-icon">📸</div>
          <div className="dashboard-content__stat-content">
            <p className="dashboard-content__stat-value">{stats.photos}</p>
            <p className="dashboard-content__stat-label">Photos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;