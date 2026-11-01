import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter';
import './styles/variables.css';
import './styles/globals.css';
import App from './App';
import { aplicarTema, temaInicial } from './tema/tema';
import { TemaProvider } from './tema/TemaProvider';

// Reaplica o tema antes de renderizar (o script em public/tema-inicial.js já o faz antes da 1ª pintura).
aplicarTema(temaInicial());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TemaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TemaProvider>
  </StrictMode>,
);
