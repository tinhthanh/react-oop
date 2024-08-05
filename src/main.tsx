import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { inject } from './utils/inject.ts';
import { NotifyService } from './views/portal/services/notify.service.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
const notifyService = inject(NotifyService);
window.addEventListener('load', () => {
  notifyService.init(); // setup notification
 });
