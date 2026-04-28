import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import './styles/dss-utilities.css';
import { GridSystemProvider } from './contexts/GridSystemContext';

console.log('[DIAGNOSTIC v2.1.1] main.tsx EXECUTING');
console.log('[DIAGNOSTIC v2.1.1] GridSystemProvider imported:', typeof GridSystemProvider);

// 🔄 Phase 2.1 - Context Migration Complete - v2.1.1
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {console.log('[DIAGNOSTIC v2.1.1] About to render GridSystemProvider')}
    <GridSystemProvider>
      {console.log('[DIAGNOSTIC v2.1.1] Inside GridSystemProvider children render')}
      <App />
    </GridSystemProvider>
  </React.StrictMode>,
);