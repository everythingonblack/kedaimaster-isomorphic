'use client';

import { Drawer } from 'rizzui';
import { useEffect } from 'react';
import cn from '@core/utils/class-names';
import { useLocation } from 'react-router-dom';
import { useDrawer } from './use-drawer';

export function DrawerViews() {
  const { isOpen, view, placement, closeDrawer, containerClassName } = useDrawer();
  const pathname = useLocation();
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName={cn('dark:bg-gray-100 min-w-min max-w-[320px]', containerClassName)}
      className="z-[9999] h-screen"
    >
      {view}
    </Drawer>
  );
}
