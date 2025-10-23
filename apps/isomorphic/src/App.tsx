import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@/kedaimaster-landing/page';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import AppointmentDashboard from '@/app/shared/appointment/dashboard/index';
import ProductDashboard from '@/app/shared/ecommerce/dashboard/index';

// Dummy pages
const MaterialPage = () => <div>Material Page</div>;
const ProductPage = () => <div>Product Page</div>;
const StorePage = () => <div>Store Page</div>;
const DataPage = () => <div>Data Page</div>;
const CategoriesPage = () => <div>Categories Page</div>;
const UsersPage = () => <div>Users Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<HydrogenLayout />}>
          <Route index element={<AppointmentDashboard />} />
          <Route path="material" element={<MaterialPage />} />
          <Route path="product" element={<ProductDashboard />} />
          <Route path="store" element={<StorePage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
