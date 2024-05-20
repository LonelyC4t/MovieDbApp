import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';

import OfflineApp from './components/offline/offlineApp';
import App from './components/app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Online>
      <App />
    </Online>
    <Offline>
      <OfflineApp />
    </Offline>
  </React.StrictMode>
);
