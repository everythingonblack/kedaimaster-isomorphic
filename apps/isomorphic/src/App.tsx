import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@/kedaimaster-landing/page';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import DashboardPage from '@/app/shared/dashboard-page/dashboard/index';
import ProductsPage from '@/app/shared/products-page/dashboard/index';
import MaterialsPage from '@/app/shared/materials-page/dashboard/index';
import UsersPage from '@/app/shared/users-page/dashboard/index';

import MenuPage from '@/kedaimaster-menu/page';

// Dummy pages
const StorePage = () => <div>Store Page</div>;
const DataPage = () => <div>Data Page</div>;
const CategoriesPage = () => <div>Categories Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MenuPage />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<HydrogenLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="material" element={<MaterialsPage />} />
          <Route path="product" element={<ProductsPage />} />
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
