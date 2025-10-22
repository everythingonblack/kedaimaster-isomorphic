'use client';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from '@core/utils/class-names';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';


interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  overlayClassName?: string;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
}
export function Drawer({
  isOpen,
  onClose,
  // kita tetap simpan placement tapi abaikan, selalu left
  placement = 'left',
  overlayClassName = '',
  containerClassName = '',
  className = '',
  children,
}: DrawerProps) {
  
  // Default posisi drawer selalu fixed di top-0 left-0
  // Width drawer sesuai kebutuhan (misal 320px)
  
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 z-[9998]
          ${overlayClassName}
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Drawer container */}
      <div
        className={cn(
          'fixed top-0 left-0 bg-white shadow-lg z-[9999] transition-all duration-300',
          'h-full w-[320px]',
          className,
          containerClassName
        )}
        style={{
          // posisi drawer
          left: isOpen ? 0 : '-200vw',
          // kamu bisa pakai transform juga kalau mau animasi lebih halus
          // transform: isOpen ? 'translateX(0)' : 'translateX(-200vw)',
          // transition sudah di class 'transition-all duration-300'
        }}
      >
        {children}
      </div>
    </>
  );
}


export default function GlobalDrawer() {
  const { isOpen, view, placement, containerClassName, closeDrawer } = useDrawer();

  const location = useLocation();
  const pathname = location.pathname;

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
      containerClassName={cn(
        'min-w-[320px] max-w-[420px] dark:bg-gray-100',
        containerClassName
      )}
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
