import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'

import LandingPage from './kedaimaster-landing/page';
import FileDashboardPage from '@/kedaimaster-dashboard/page';
import Menu from '@/kedaimaster-menu/page.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<FileDashboardPage />} />
        <Route path="/*" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;