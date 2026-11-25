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
import BoardHome from './pages/Phase 3/BoardHome';
import BoardRules from './pages/Phase 3/BoardRules';
import BoardGallery from './pages/Phase 3/BoardGallery';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Phase1" element={<Blogger />} />
        <Route path="/Phase2" element={<PaintStore />} />
        <Route path="/Phase3" element={<BoardHome />} />
        <Route path="/Phase3-rules" element={<BoardRules />} />
        <Route path="/Phase3-gallery" element={<BoardGallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
