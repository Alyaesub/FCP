import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//style
import './styles/global.scss'

const rootElement = document.getElementById('root')

//if de sécurité pour rootElement
if (!rootElement) {
  throw new Error("l'élement root n'a pas été trouver")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
