'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge, ActionIcon } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import SmartDateSelector, { DateOption } from '@core/ui/SmartDateSelector';
import MessagesDropdown from '@/layouts/messages-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/layouts/settings-button';
import RingBellSolidIcon from '@core/components/icons/ring-bell-solid';
import ChatSolidIcon from '@core/components/icons/chat-solid';
import NotificationDropdown from './notification-dropdown';
import DropdownAction from '@core/components/charts/dropdown-action';

type HeaderMenuRightProps = {
  setDate: (start: Date | null, end: Date | null, type: string) => void;
};

const rangeOptions: DateOption[] = [
  {
    label: "Harian",
    value: "harian",
    getRange: () => {
      const now = new Date();
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    },
  },
  {
    label: "Mingguan",
    value: "mingguan",
    getRange: () => {
      const now = new Date();
      const day = now.getDay();
      const start = new Date(now);
      start.setDate(now.getDate() - day);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    },
  },
  {
    label: "Bulanan",
    value: "bulanan",
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      return { start, end };
    },
  },
  {
    label: "Tahunan",
    value: "tahunan",
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return { start, end };
    },
  },
  {
    label: "Pilih Rentang Waktu",
    value: "kustom", // tidak ada getRange -> datepicker muncul
  },
];

export default function HeaderMenuRight({ setDate }: HeaderMenuRightProps) {
  const location = useLocation();
const isDashboard = location.pathname === '/dashboard';

  const [viewType, setViewType] = useState<string>('Bulanan');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // 🧠 Simpan range sebelumnya agar tidak setDate terus-menerus
  const prevRange = useRef<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  // 🧮 Hitung otomatis berdasarkan viewType
  useEffect(() => {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);

    switch (viewType) {
      case 'Harian':
        start.setHours(0, 0, 0, 0);
        end = start;
        break;
      case 'Mingguan': {
        const day = now.getDay();
        start.setDate(now.getDate() - day);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case 'Bulanan':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case 'Tahunan':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      case 'Kustom':
        return; // jangan ubah otomatis
    }

    setStartDate(start);
    setEndDate(end);

    // ✅ Cek apakah range berubah
    const isSame =
      prevRange.current.start?.getTime() === start.getTime() &&
      prevRange.current.end?.getTime() === end.getTime();

    if (!isSame) {
      setDate(start, end);
      prevRange.current = { start, end };
    }
  }, [viewType, setDate]);

  // 🧠 Untuk viewType Kustom (ubah manual)
  useEffect(() => {
    if (viewType === 'Kustom' && startDate && endDate) {
      const isSame =
        prevRange.current.start?.getTime() === startDate.getTime() &&
        prevRange.current.end?.getTime() === endDate.getTime();

      if (!isSame) {
        setDate(startDate, endDate);
        prevRange.current = { start: startDate, end: endDate };
      }
    }
  }, [startDate, endDate, viewType, setDate]);

  return (
    <div className="ms-auto flex items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {isDashboard &&
      
    <SmartDateSelector
      options={rangeOptions}
      defaultValue='bulanan'
      onChange={({ start, end, type }) => {
        setDate(start, end, type);
      }}
    />}

      {/* Notifikasi */}
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <ProfileMenu />
    </div>
  );
}
