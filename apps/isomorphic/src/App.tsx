import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import AppointmentDashboard from '@/app/shared/appointment/dashboard/index';
import { Provider } from '@core/utils/mini-jotai'; // path ke file atom store kamu

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HydrogenLayout><AppointmentDashboard /></HydrogenLayout>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
