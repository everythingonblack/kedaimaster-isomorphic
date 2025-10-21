'use client';

import React, { useEffect, lazy, Suspense } from 'react';
// import { useTheme } from "next-themes";
import { useDirection } from '@core/hooks/use-direction';
import CogSolidIcon from '@core/components/icons/cog-solid';
import { ActionIcon } from 'rizzui';
import cn from '@core/utils/class-names';
import DrawerHeader from '@/layouts/drawer-header';
import { usePresets } from '@/config/color-presets';
import { useApplyColorPreset, useColorPresets } from '@/layouts/settings/use-theme-color';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

// Ganti next/dynamic dengan React.lazy
const SettingsDrawer = lazy(() => import('@/layouts/settings-drawer'));

export default function SettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();

  // Terapkan warna preset
  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  // Set atribut dir pada html saat direction berubah
  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';
  }, [direction]);

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader onClose={closeDrawer} />
              <Suspense fallback={<div>Loading...</div>}>
                <SettingsDrawer />
              </Suspense>
            </>
          ),
          placement: 'right',
          containerClassName: 'max-w-[420px]',
        })
      }
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon strokeWidth={1.8} className="h-[22px] w-auto animate-spin-slow" />
      )}
    </ActionIcon>
  );
}
