
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '@/kedaimaster-landing/page';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import DashboardPage from '@/app/shared/dashboard-page/dashboard/index';
import EditProductPage from '@/app/shared/ecommerce/product/create-edit/index';
import CreateProductPage from '@/app/shared/ecommerce/product/create-edit/index';
import ProductsPage from '@/app/shared/ecommerce/products/page';
import MaterialsPage from '@/app/shared/new-materials-page/products/page';
import EditMaterialsPage from '@/app/shared/new-materials-page/product/create-edit/index';
import CreateMaterialPage from '@/app/shared/new-materials-page/product/create-edit/index';
import AccountSettings from '@/app/shared/account-settings/page';

import UomPage from '@/app/shared/satuan/products/page';
import CreateUomPage from '@/app/shared/satuan/product/create-edit/index';
import EditUomPage from '@/app/shared/satuan/products/[slug]/edit/page';

import ProductCategoriesPage from '@/app/shared/product-category-pages/products/page';
import CreateProductCategoryPage from '@/app/shared/product-category-pages/product/create-edit';
import EditProductCategoryPage from '@/app/shared/product-category-pages/products/[slug]/edit/page';


import UsersPage from '@/app/shared/users-page/products/page';
import EditUserPage from '@/app/shared/users-page/product/create-edit/index';
import CreateUserPage from '@/app/shared/users-page/product/create-edit/index';
import { useState } from 'react';
import MenuPage from '@/kedaimaster-menu/page';

// Dummy pages
const StorePage = () => <div>Store Page</div>;
const DataPage = () => <div>Data Page</div>;
// const CategoriesPage = () => <div>Categories Page</div>; // This dummy page is no longer needed

// ✅ Type Definitions
interface DateRange {
  start: Date | null;
  end: Date | null;
  type: string;
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
        {/* Halaman tanpa layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} /> {/* ✅ Standalone */}

        {/* Halaman dengan layout */}
        <Route element={<HydrogenLayout setDate={handleSetDate} />}>
          <Route path="/dashboard" element={<DashboardPage dateRange={dateRange} />} />

          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/materials/create" element={<CreateMaterialPage />} />
          <Route path="/materials/:slug/edit" element={<EditMaterialsPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:slug/edit" element={<EditProductPage />} />

          <Route path="/store" element={<StorePage />} />
          <Route path="/uoms" element={<UomPage />} />
          <Route path="/uoms/create" element={<CreateUomPage />} />
          <Route path="/uoms/:slug/edit" element={<EditUomPage />} />
          <Route path="/profile" element={<AccountSettings />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users/:slug/edit" element={<EditUserPage />} />

          <Route path="/product-categories" element={<ProductCategoriesPage />} />
          <Route path="/product-categories/create" element={<CreateProductCategoryPage />} />
          <Route path="/product-categories/:slug/edit" element={<EditProductCategoryPage />} />
          <Route path="/categories" element={<ProductCategoriesPage />} /> {/* Added route for /categories */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
