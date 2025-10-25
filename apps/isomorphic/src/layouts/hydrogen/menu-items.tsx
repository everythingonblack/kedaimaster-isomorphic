import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiChartPieSliceDuotone,
  PiMapPinLineDuotone,
  PiPackageDuotone,
  PiPushPinDuotone,
  PiSquaresFourDuotone,
  PiUserDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <PiChartPieSliceDuotone />,
  },
  {
    name: 'Master',
  },
  {
    name: 'Material',
    href: routes.dashboard.material,
    icon: <PiPackageDuotone />,
  },
  {
    name: 'Produk',
    href: routes.dashboard.products,
    icon: <PiSquaresFourDuotone />,
  },
  {
    name: 'Toko',
    href: routes.dashboard.store,
    icon: <PiMapPinLineDuotone />,
  },
  
  {
    name: 'Data Umum',
    href: '#',
    icon: <PiPushPinDuotone />,
    dropdownItems: [
      {
        name: 'Satuan',
        href: routes.dashboard.uoms,
        badge: '',
      },
      {
        name: 'Kategori Produk',
        href: routes.dashboard.categories,
      },
    ],
  },
  
  // label start
  {
    name: 'Administrator',
  },
  
  {
    name: 'Users',
    href: routes.dashboard.users,
    icon: <PiUserDuotone />,
  },
];
