import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PaginaChat from './components/PaginaChat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PaginaChat />
  </StrictMode>,
)
