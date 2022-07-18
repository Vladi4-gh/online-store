import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { selfAssessment } from './utils/selfAssessment';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

selfAssessment();
