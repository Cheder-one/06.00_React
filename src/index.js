import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';

import './styles/styles.scss';
import App from './app/components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
