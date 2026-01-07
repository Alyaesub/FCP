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


function App() {
  return (
    
    <BrowserRouter>
      <div className='app'>
        <Header/>
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
    </BrowserRouter>
  )
}


export default App
