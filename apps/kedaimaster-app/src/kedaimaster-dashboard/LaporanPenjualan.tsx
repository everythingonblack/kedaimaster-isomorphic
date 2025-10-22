'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { Button, Text, Title } from 'rizzui';
import { useState } from 'react';

// Data disesuaikan untuk laporan penjualan
const salesData = [
    { name: 'Kentang Goreng', count: 90, percentage: 44.8, color: '#D6A24A' },
    { name: 'Es Teh', count: 68, percentage: 33.8, color: '#F4B678' },
    { name: 'Tempe Mendoan', count: 20, percentage: 10.0, color: '#FFDDA6' },
    { name: 'Telo', count: 18, percentage: 9.0, color: '#4BC8B1' },
    { name: 'Telo Ireng', count: 3, percentage: 1.5, color: '#7DDDCB' },
];

export default function LaporanPenjualan({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('penjualan');

  return (
    <WidgetCard
      title="Laporan Penjualan & Bahan Baku"
      headerClassName="hidden"
      className={className}
    >
      <div className="flex gap-2 mb-4">
        <Button
            onClick={() => setActiveTab('penjualan')}
            variant={activeTab === 'penjualan' ? 'solid' : 'outline'}
            className="rounded-full"
        >
          Penjualan
        </Button>
        <Button
            onClick={() => setActiveTab('bahanBaku')}
            variant={activeTab === 'bahanBaku' ? 'solid' : 'outline'}
            className="rounded-full"
        >
          Bahan Baku
        </Button>
      </div>

      <div className="space-y-4">
        {salesData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <Text as="span">{item.name} <strong>+{item.count}</strong></Text>
              <Text as="span">({item.percentage}%)</Text>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-6 w-full rounded-full">
        Lihat lebih banyak
      </Button>
    </WidgetCard>
  );
}