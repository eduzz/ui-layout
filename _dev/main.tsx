import { StrictMode, lazy } from 'react';

import { createRoot } from 'react-dom/client';

import AppLoader from '../AppLoader';

const App = lazy(() => import('./App'));

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppLoader>
      <App />
    </AppLoader>
  </StrictMode>
);
