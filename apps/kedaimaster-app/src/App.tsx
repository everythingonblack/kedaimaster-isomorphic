import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './LandingPage';
import FileDashboardPage from '@/kedaimaster-dashboard/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<FileDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;