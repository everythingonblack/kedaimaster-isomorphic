import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

export const pageLinks = [
  {
    name: 'Home',
  },
  {
    name: 'Dashboard Main',
    href: routes.dashboard.main,
  },
  {
    name: 'Material',
    href: routes.dashboard.material,
  },
  {
    name: 'Product',
    href: routes.dashboard.product,
  },
  {
    name: 'Store',
    href: routes.dashboard.store,
  },
  {
    name: 'Data',
    href: routes.dashboard.data,
  },
  {
    name: 'Categories',
    href: routes.dashboard.categories,
  },
  {
    name: 'Users',
    href: routes.dashboard.users,
  },
  
  // label end
  {
    name: 'Profile Settings',
    href: routes.forms.profileSettings,
  },
  
  // Kalau kamu mau menambahkan label:
  {
    name: 'Apps',
  },
  // Kalau ada tambahan route yang lain, sesuaikan di routes dulu
];
