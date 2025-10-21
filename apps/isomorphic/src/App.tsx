import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import HydrogenLayout from '@/layouts/hydrogen/layout';
import AppointmentDashboard from '@/app/shared/appointment/dashboard/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HydrogenLayout><AppointmentDashboard/></HydrogenLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;