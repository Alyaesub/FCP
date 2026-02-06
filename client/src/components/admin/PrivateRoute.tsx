import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Vérifier si un token existe dans localStorage
  const token = localStorage.getItem('token');

  // Si pas de token → rediriger vers login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si token présent → afficher la page demandée
  return <>{children}</>;
};

export default PrivateRoute;