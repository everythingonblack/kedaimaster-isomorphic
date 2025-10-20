'use client';

import { useState } from 'react';
import { DatePicker } from 'rizzui';
import RingkasanBisnis from './RingkasanBisnis';
import LaporanPenjualan from './LaporanPenjualan';
import GrafikPemasukan from './GrafikPemasukan';

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('tahunIni');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Hanya daftar tombol non-custom, karena custom akan ditangani secara khusus
  const timeFilters = [
    { id: 'hariIni', label: 'Hari ini' },
    { id: 'mingguIni', label: 'Minggu ini' },
    { id: 'bulanIni', label: 'Bulan ini' },
    { id: 'tahunIni', label: 'Tahun ini' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Bagian Header dan Navigasi Kafe (tidak berubah) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">DASHBOARD</h1>
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex gap-4 border-b pb-2">
        <button className="font-semibold text-gray-500">SEMUA</button>
        <button className="font-semibold text-gray-500">DERMAGACAFE</button>
        <button className="font-semibold text-green-600 border-b-2 border-green-600 pb-2">TERAS-CAFE</button>
      </div>
      
      {/* === PERUBAHAN UTAMA DI SINI === */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Render tombol-tombol standar */}
        {timeFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
              activeFilter === filter.id
                ? 'bg-gray-800 text-white font-semibold'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {filter.label}
          </button>
        ))}

        {/* Render DatePicker atau Tombol "Custom" secara kondisional */}
        {activeFilter === 'custom' ? (
          // Tampilan Expanded: Saat 'custom' aktif
          <div className="flex items-center gap-2 p-1 bg-gray-200 rounded-full">
            <span className="pl-3 text-sm font-medium text-gray-600">Start:</span>
            <DatePicker
              selected={customDateRange.startDate}
              onChange={(date: Date) => setCustomDateRange({ ...customDateRange, startDate: date })}
              dateFormat="dd/MM/yy"
              // Styling agar inputnya kecil dan menyatu
              inputClassName="h-8 text-sm w-24 rounded-full border-gray-300 focus:ring-gray-800"
            />
            <span className="text-sm font-medium text-gray-600">End:</span>
            <DatePicker
              selected={customDateRange.endDate}
              onChange={(date: Date) => setCustomDateRange({ ...customDateRange, endDate: date })}
              dateFormat="dd/MM/yy"
              inputClassName="h-8 text-sm w-24 rounded-full border-gray-300 focus:ring-gray-800"
            />
          </div>
        ) : (
          // Tampilan Tombol: Saat 'custom' tidak aktif
          <button
            onClick={() => setActiveFilter('custom')}
            className="px-4 py-1.5 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            Custom
          </button>
        )}
      </div>

      {/* Komponen-komponen lainnya (tidak berubah) */}
      <RingkasanBisnis />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LaporanPenjualan />
        </div>
        <div className="lg:col-span-2">
          <GrafikPemasukan />
        </div>
      </div>
    </div>
  );
}