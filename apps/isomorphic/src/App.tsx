import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@/kedaimaster-landing/page';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import DashboardPage from '@/app/shared/dashboard-page/dashboard/index';
import EditProductPage from '@/app/shared/ecommerce/product/create-edit/index';
import CreateProductPage from '@/app/shared/ecommerce/product/create-edit/index';
import ProductsPage from '@/app/shared/ecommerce/products/page';
import MaterialsPage from '@/app/shared/materials-page/dashboard/index';
import UsersPage from '@/app/shared/users-page/dashboard/index';
import { useEffect, useState } from 'react';

import {
  handleDashboardData,
  handleDashboardAggregate,
  getTransactionGraph, // <--- Tambahkan ini
} from '@/kedaimaster-api-handlers/dashboardApiHandlers';

import MenuPage from '@/kedaimaster-menu/page';

// Dummy pages
const StorePage = () => <div>Store Page</div>;
const DataPage = () => <div>Data Page</div>;
const CategoriesPage = () => <div>Categories Page</div>;

// ✅ Type Definitions
interface DateRange {
  start: Date | null;
  end: Date | null;
  type: string;
}

interface DashboardData {
  [key: string]: any;
}

interface DashboardAggregate {
  [key: string]: any;
}

function App() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
    type: '',
  });

  const handleSetDate = (start: Date | null, end: Date | null, type: string) => {
    setDateRange({ start, end, type });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Layout Route untuk semua halaman dashboard */}
        <Route element={<HydrogenLayout setDate={handleSetDate} />}>
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                dateRange={dateRange}
              />
            }
          />
          <Route path="/material" element={<MaterialsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:slug/edit" element={<EditProductPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/uoms" element={<DataPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
