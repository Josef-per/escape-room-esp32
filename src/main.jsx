import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from "./App";
import Blogger from './pages/Phase 1/Blogger';
import PaintStore from './pages/Phase 2/PaintStore';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Phase1" element={<Blogger />} />
        <Route path="/Phase2" element={<PaintStore/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
