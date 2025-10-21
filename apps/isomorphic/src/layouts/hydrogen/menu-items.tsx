import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiChartPieSliceDuotone,
  PiChatCenteredDotsDuotone,
  PiLockKeyDuotone,
  PiMapPinLineDuotone,
  PiPackageDuotone,
  PiPushPinDuotone,
  PiShieldCheckDuotone,
  PiSquaresFourDuotone,
  PiUserDuotone,
  PiUserPlusDuotone,
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
    href: '/',
    icon: <PiChartPieSliceDuotone />,
  },
  {
    name: 'Master',
  },
  {
    name: 'Material',
    href: routes.logistics.dashboard,
    icon: <PiPackageDuotone />,
  },
  {
    name: 'Produk',
    href: routes.widgets.cards,
    icon: <PiSquaresFourDuotone />,
  },
  {
    name: 'Store',
    href: routes.widgets.maps,
    icon: <PiMapPinLineDuotone />,
  },
  
  {
    name: 'Data Umum',
    href: '#',
    icon: <PiPushPinDuotone />,
    dropdownItems: [
      {
        name: 'Satuan',
        href: routes.eCommerce.products,
        badge: '',
      },
      {
        name: 'Kategori Produk',
        href: routes.eCommerce.productDetails(DUMMY_ID),
      },
    ],
  },
  
  // label start
  {
    name: 'Administrator',
  },
  
  {
    name: 'Users',
    href: routes.widgets.maps,
    icon: <PiUserDuotone />,
  },
];
