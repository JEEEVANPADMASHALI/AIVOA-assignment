import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/inter"; // Standard Inter font
import "@fontsource/inter/400.css"; // Normal weight
import "@fontsource/inter/700.css"; // Bold weight for headings

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
