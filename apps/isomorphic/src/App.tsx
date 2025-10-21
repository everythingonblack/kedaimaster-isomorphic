import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'

import AppointmentDashboard from '@/app/shared/appointment/dashboard/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;