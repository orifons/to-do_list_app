import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CoreTaskApp from '@/app/CoreTaskApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreTaskApp />
  </StrictMode>,
)
