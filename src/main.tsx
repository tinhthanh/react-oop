import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/keycloak';

ReactDOM.createRoot(document.getElementById('root')!).render(
      <ReactKeycloakProvider  authClient={keycloak} initOptions={{ onLoad: 'check-sso' ,  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'}}> 
          <App />
      </ReactKeycloakProvider>
);
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/firebase-messaging-sw.js')
//       .then((registration) => {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       })
//       .catch((error) => {
//         console.error('ServiceWorker registration failed: ', error);
//       });
//   });
// }