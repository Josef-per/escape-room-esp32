import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from "./App";
import Phase1 from './pages/Phase 1/Page1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Phase1" element={<Phase1 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
