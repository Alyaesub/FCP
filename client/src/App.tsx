import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import Header from './components/Header'
import Home from './pages/Home'
import Actualites from './pages/Actualites'
import Equipes from './pages/Equipes'
import EquipeDetails from './pages/EquipesDetails'
import Galerie from './pages/Galerie'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import Contact from './pages/Contact'

// Composants admin
import PrivateRoute from './components/admin/PrivateRoute'
import AdminLayout from './components/admin/AdminLayout' 

// Pages admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import ActualitesGestion from './pages/admin/Actualites'
import Evenements from './pages/admin/Evenements'
import EquipesGestion from './pages/admin/Equipes'
import Joueurs from './pages/admin/Joueurs'
import Matchs from './pages/admin/Matchs'
import GalerieGestion from './pages/admin/Galerie' 



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        {/* Routes publiques avec Header/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <div className='app'>
                <main className='main-content'>
                  <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/actualites' element={<Actualites/>}/>
                    <Route path='/equipes' element={<Equipes/>}/>
                    <Route path='/equipes/:slug' element={<EquipeDetails/>}/>
                    <Route path='/galerie' element={<Galerie/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                  </Routes>
                </main>
                <Sponsors/>
                <Footer/>
              </div>
            </>
          }
        />

            {/* Routes admin */}
            <Route path="/admin/login" element={<Login />} />
            {/* ✅ Route Dashboard PROTÉGÉE */}
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/actualites" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <ActualitesGestion />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/evenements" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Evenements />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/equipes" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <EquipesGestion />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/joueurs" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Joueurs />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/matches" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Matchs />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/galerie" 
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <GalerieGestion />
                  </AdminLayout>
                </PrivateRoute>
              } 
            />
          </Routes>
    </BrowserRouter>
  )
}


export default App
