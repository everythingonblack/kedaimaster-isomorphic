'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Title, Button } from 'rizzui';

// Data disesuaikan untuk grafik pemasukan kuartal
const chartData = [
  { quarter: 'Kuartal 1', "tahun ini": 0, "tahun lalu": 0 },
  { quarter: 'Kuartal 2', "tahun ini": 0, "tahun lalu": 0 },
  { quarter: 'Kuartal 3', "tahun ini": 0, "tahun lalu": 0 },
  { quarter: 'Kuartal 4', "tahun ini": 4516500, "tahun lalu": 80000 },
];

// Fungsi untuk format Y-Axis sebagai Rupiah
function formatCurrency(value: number) {
  if (value === 0) return 'Rp 0';
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export default function GrafikPemasukan({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Grafik Bisnis"
      description="Perbandingan antara tahun ini dan tahun lalu"
      action={
        <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full">Pemasukan</Button>
            <Button size="sm" variant="outline" className="rounded-full">Pengeluaran</Button>
            <Button size="sm" variant="outline" className="rounded-full">Transaksi</Button>
        </div>
      }
      className={className}
    >
      <div className="h-96 w-full pt-9">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: -20, right: 10, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
            <XAxis dataKey="quarter" tickLine={false} />
            <YAxis tickLine={false} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip formatter={(value) => formatCurrency(Number(value))} />} />
            <Area type="monotone" dataKey="tahun ini" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Area type="monotone" dataKey="tahun lalu" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}