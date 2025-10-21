import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import HydrogenLayout from '@/layouts/hydrogen/layout';
import AppointmentDashboard from '@/app/shared/appointment/dashboard/index';
import GlobalDrawer from './app/shared/drawer-views/container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HydrogenLayout><AppointmentDashboard/><GlobalDrawer/></HydrogenLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;