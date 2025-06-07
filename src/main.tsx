import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';

function createWaveEffect(e: MouseEvent) {
  const wave = document.createElement('div');
  wave.className = 'click-wave';
  wave.style.left = `${e.clientX}px`;
  wave.style.top = `${e.clientY}px`;
  document.body.appendChild(wave);

  // Supprime l'élément après l'animation
  wave.addEventListener('animationend', () => {
    wave.remove();
  });
}

document.addEventListener('click', (e) => {
  createWaveEffect(e);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
);