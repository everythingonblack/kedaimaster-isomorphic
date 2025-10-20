'use client';

import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import MetricCard from '@core/components/cards/metric-card';

// Data disesuaikan untuk dasbor bisnis
const businessStatData = [
  {
    id: 1,
    title: 'Pendapatan',
    metric: 'Rp 4.596.500',
    percentage: 100,
  },
  {
    id: 2,
    title: 'Pengeluaran',
    metric: 'Rp 371.060',
    percentage: 100,
  },
  {
    id: 3,
    title: 'Transaksi',
    metric: '148',
    percentage: 100,
  },
  {
    id: 4,
    title: 'Item favorit',
    metric: 'Kentang Goreng',
    percentage: null, // Tidak ada persentase untuk item favorit
  },
];

export default function RingkasanBisnis({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 3xl:gap-8', className)}>
      {businessStatData.map((stat) => (
        <MetricCard
          key={stat.id}
          title={stat.title}
          metric={stat.metric}
          metricClassName="text-lg sm:text-xl"
          className="w-full max-w-full"
        >
          {stat.percentage && (
             <Text className="mt-3 flex items-center leading-none text-gray-500">
                <span className="font-semibold text-green">{stat.percentage}%</span>
             </Text>
          )}
        </MetricCard>
      ))}
    </div>
  );
}