import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@/kedaimaster-landing/page';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import DashboardPage from '@/app/shared/dashboard-page/dashboard/index';
import ProductsPage from '@/app/shared/products-page/dashboard/index';
import MaterialsPage from '@/app/shared/materials-page/dashboard/index';
import UsersPage from '@/app/shared/users-page/dashboard/index';
import { useState } from 'react';

import {
  handleDashboardData,
  handleDashboardAggregate,
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

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardAggregate, setDashboardAggregate] = useState<DashboardAggregate[]>([]);

  const handleSetDate = (start: Date | null, end: Date | null, type: string) => {
    setDateRange({ start, end, type });
    console.log('Date range received in App.tsx:', { start, end, type });
  };

  const fetchDashboardData = async (start: Date | null, end: Date | null) => {
    if (!start || !end) return;
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    const data = await handleDashboardData(startStr, endStr);
    console.log('printtt data')
    console.log(data)
    setDashboardData(data);
  };

  const fetchDashboardAggregate = async (date: Date, intervalHour = 2) => {
    const dateStr = date.toISOString().slice(0, 10);
    const data = await handleDashboardAggregate(dateStr, intervalHour);
    console.log('printtt')
    console.log(data)
    setDashboardAggregate(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MenuPage />} />

        {/* Layout Route untuk semua halaman dashboard */}
        <Route element={<HydrogenLayout setDate={handleSetDate} />}>
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                dateRange={dateRange}
                dashboardData={dashboardData}
                dashboardAggregate={dashboardAggregate}
                fetchDashboardData={fetchDashboardData}
                fetchDashboardAggregate={fetchDashboardAggregate}
              />
            }
          />
          <Route path="/material" element={<MaterialsPage />} />
          <Route path="/product" element={<ProductsPage />} />
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
