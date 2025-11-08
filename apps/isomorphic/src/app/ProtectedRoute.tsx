import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  // Jika tidak ada token dan bukan di halaman yang boleh diakses tanpa login
  const isPublicPath =
    location.pathname === '/' ||
    location.pathname.startsWith('/ff1f9a4d-2876-44b1-8e57-7c6a5d425755/menu');

  if (!isPublicPath && !accessToken) {
    // Redirect ke landing page
    return <Navigate to="/" replace />;
  }

  // Jika lolos, tampilkan child route
  return <Outlet />;
};

export default ProtectedRoute;
