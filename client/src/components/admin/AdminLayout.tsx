import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IMAGES } from '../../constants/images';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items selon le rôle
  const navigationItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊', roles: ['admin', 'staff'] },
    { path: '/admin/users', label: 'Utilisateurs', icon: '👥', roles: ['admin'] },
    { path: '/admin/equipes', label: 'Équipes', icon: '⚽', roles: ['admin'] },
    { path: '/admin/joueurs', label: 'Joueurs', icon: '🎽', roles: ['admin'] },
    { path: '/admin/matches', label: 'Matchs', icon: '🏆', roles: ['admin'] },
    { path: '/admin/actualites', label: 'Actualités', icon: '📰', roles: ['admin'] },
    { path: '/admin/evenements', label: 'Événements', icon: '📅', roles: ['admin'] },
    { path: '/admin/galerie', label: 'Galerie', icon: '📸', roles: ['admin', 'staff'] },
  ];

  const visibleItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-layout__sidebar ${sidebarOpen ? 'admin-layout__sidebar--open' : ''}`}>
        <div className="admin-layout__sidebar-header">
          <img src={IMAGES.logo} alt="FC Provence" className="admin-layout__logo" />
          <h2 className="admin-layout__sidebar-title">FC Provence</h2>
          <p className="admin-layout__sidebar-subtitle">Administration</p>
        </div>

        <nav className="admin-layout__nav">
          {visibleItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-layout__nav-item ${isActive(item.path) ? 'admin-layout__nav-item--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-layout__nav-icon">{item.icon}</span>
              <span className="admin-layout__nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-layout__sidebar-footer">
          <div className="admin-layout__user-info">
            <div className="admin-layout__user-avatar">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="admin-layout__user-details">
              <p className="admin-layout__user-name">{user?.name}</p>
              <p className="admin-layout__user-role">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-layout__main">
        {/* Header */}
        <header className="admin-layout__header">
          <button 
            className="admin-layout__hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          
          <div className="admin-layout__header-right">
            <Link to="/" className="admin-layout__view-site">
              🌐 Voir le site
            </Link>
            <button onClick={handleLogout} className="admin-layout__logout">
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="admin-layout__content">
          {children}
        </main>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="admin-layout__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;