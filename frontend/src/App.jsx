import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import './index.css';

import { ContactProvider } from './contexts/contact.context';
import { PortalAuthProvider } from './contexts/portalAuth.context';

import PrivacyNotice from './components/PrivacyNotice';

function App() {
  return (
    <ContactProvider>
      <PortalAuthProvider>
        <RouterProvider router={router} />
        <PrivacyNotice />
      </PortalAuthProvider>
    </ContactProvider>
  );
}

export default App;