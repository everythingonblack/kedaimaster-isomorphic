'use client';

import { useState } from 'react';
import { DatePicker } from '@core/ui/datepicker';
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

  // Handler functions untuk DatePicker
  const handleStartDateChange = (date: any) => {
    setCustomDateRange({ ...customDateRange, startDate: date });
  };

  const handleEndDateChange = (date: any) => {
    setCustomDateRange({ ...customDateRange, endDate: date });
  };

  // Hanya daftar tombol non-custom, karena custom akan ditangani secara khusus
  const timeFilters = [
    { id: 'hariIni', label: 'Hari ini' },
    { id: 'mingguIni', label: 'Minggu ini' },
    { id: 'bulanIni', label: 'Bulan ini' },
    { id: 'tahunIni', label: 'Tahun ini' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-datepicker,
        .custom-datepicker *:not(.react-datepicker):not(.react-datepicker *) {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .custom-datepicker input {
          outline: none !important;
          height: 20px !important;
          font-size: 0.875rem !important;
          width: 100% !important;
          padding: 0 0.5rem !important;
        }
      `}} />
      
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
          <div className="flex items-center px-4 py-1.5 bg-gray-200 rounded-full gap-4 h-[32px]" >
            <span className="text-sm text-gray-600">Start:</span>
            <div className="w-48 custom-datepicker">
              <DatePicker
                selected={customDateRange.startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yy"
              />
            </div>
            <span className="text-sm text-gray-600">End:</span>
            <div className="w-48 custom-datepicker">
              <DatePicker
                selected={customDateRange.endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yy"
              />
            </div>
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