import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import Header from './components/Header'
import Home from './pages/Home'
import Actualites from './pages/Actualites'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'

function App() {
  return (
    
    <BrowserRouter>
      <div className='app'>
        <Header/>
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/actualites' element={<Actualites/>}/>
          </Routes>
        </main>
        <Sponsors/>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}


export default App
