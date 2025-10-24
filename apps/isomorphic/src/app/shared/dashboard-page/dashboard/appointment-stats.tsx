'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import { IconType } from 'react-icons/lib';
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
  PiArrowDownRight,
  PiArrowUpRight,
} from 'react-icons/pi';

type AppointmentStatsType = {
  className?: string;
};

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  increased: boolean;
  percentage?: string;
  lastMonth?: string;
  iconWrapperFill?: string;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

const statData: StatType[] = [
  {
    title: 'Jumlah Transaksi',
    amount: '360',
    increased: true,
    percentage: '32.40',
    icon: PiCalendarCheck,
  },
  {
    title: 'Item Favorit',
    amount: 'Kentang Goreng',
    increased: true,
    lastMonth: 'Nasi Goreng', // ✅ tambahan: item favorit bulan lalu
    icon: PiCheckCircle,
  },
  {
    title: 'Pendapatan',
    amount: 'Rp 12.060.000',
    increased: false,
    percentage: '32.40',
    icon: PiClock,
  },
  {
    title: 'Pengeluaran',
    amount: 'Rp 361.060',
    increased: true,
    percentage: '32.40',
    icon: PiPhoneSlash,
  },
];

export default function AppointmentStats({ className }: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div className={cn('relative flex w-auto items-center', className)}>
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>

      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8 [&::-webkit-scrollbar]:h-0"
        >
          <StatGrid />
        </div>
      </div>

      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}

export function StatGrid() {
  return (
    <>
      {statData.map((stat: StatType, index: number) => (
        <StatCard
          key={'stat-card-' + index}
          transaction={stat}
          className="min-w-[300px]"
        />
      ))}
    </>
  );
}

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, increased, percentage, lastMonth } = transaction;
  const Icon = icon;

  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75]'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100">
            {title}
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 2xl:text-[20px] 3xl:text-3xl">
            {amount}
          </p>
        </div>
      </div>

      {/* ✅ Ubah bagian bawah: khusus untuk Item Favorit tampil beda */}
      {title === 'Item Favorit' ? (
        <div className="text-gray-500 group-first:text-gray-100">
          Bulan lalu: <span className="font-semibold">{lastMonth}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'flex items-center gap-1',
              increased ? 'text-green-dark' : 'text-red-dark'
            )}
          >
            <span
              className={cn(
                'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0',
                increased
                  ? 'bg-green-lighter/70'
                  : 'bg-red-lighter/70'
              )}
            >
              {increased ? (
                <PiArrowUpRight className="h-auto w-4" />
              ) : (
                <PiArrowDownRight className="h-auto w-4" />
              )}
            </span>
            <span className="font-semibold leading-none group-first:text-gray-0">
              {increased ? '+' : '-'}
              {percentage}%
            </span>
          </div>
          <span className="truncate leading-none text-gray-500 group-first:text-gray-100">
            {increased ? 'Meningkat' : 'Menurun'}&nbsp;Dari Bulan Lalu
          </span>
        </div>
      )}
    </div>
  );
}
