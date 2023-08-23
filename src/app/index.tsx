import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@app/app.css';
import AppLayout from '@app/pages/AppLayout';
import { Routes } from 'react-router';
import MetricsPage from '@app/pages/Metrics/MetricsPage';
import DebugPage from '@app/pages/Debug/DebugPage';
import { GlobalContextProvider } from '@app/GlobalContext';
import ChartsPage from '@app/pages/Charts/ChartsPage';

const App: React.FC = () => (
  <GlobalContextProvider>
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MetricsPage />} />
          <Route path="debug/*" element={<DebugPage />} />
          <Route path="charts/*" element={<ChartsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  </GlobalContextProvider>
);

export default App;
