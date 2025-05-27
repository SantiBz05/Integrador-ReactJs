import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'primereact/resources/themes/soho-light/theme.css';  // Tema estilizado y profesional
import 'primereact/resources/primereact.min.css';           // Estilos base de PrimeReact
import 'primeicons/primeicons.css';                         // Iconos de PrimeReact

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
