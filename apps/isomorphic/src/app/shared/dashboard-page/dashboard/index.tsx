import { useEffect, useState } from 'react';
import {
  handleDashboardData,
  handleDashboardAggregate,
  getTransactionGraph,
} from '@/kedaimaster-api-handlers/dashboardApiHandlers';
import AppointmentStats from '@/app/shared/dashboard-page/dashboard/appointment-stats';
import AppointmentDiseases from '@/app/shared/dashboard-page/dashboard/appointment-diseases';
import Department from '@/app/shared/dashboard-page/dashboard/department';
import TotalAppointment from '@/app/shared/dashboard-page/dashboard/total-appointment';
import Patients from '@/app/shared/dashboard-page/dashboard/patients';
import PatientAppointment from '@/app/shared/dashboard-page/dashboard/patient-appointment';
import ScheduleList from '@/app/shared/dashboard-page/dashboard/schedule-list';
import AppointmentTodo from '@/app/shared/dashboard-page/dashboard/appointment-todo';

// =======================
// 🧩 Type Definitions
// =======================

interface DateRange {
  start: Date | null;
  end: Date | null;
  type: string;
}

interface DashboardData {
  [key: string]: any;
}

interface DashboardAggregate {
  [key: string]: any;
}

interface AppointmentDashboardProps {
  dateRange: DateRange;
  dashboardData: DashboardData | null;
  dashboardAggregate: DashboardAggregate[];
  fetchDashboardData: (start: Date | null, end: Date | null) => Promise<void>;
  fetchDashboardAggregate: (date: Date, intervalHour?: number) => Promise<void>;
  transactionGraph?: any; // Tambahkan ini
  fetchTransactionGraph?: (start: Date | null, end: Date | null, type?: string) => Promise<void>; // Tambahkan ini
}

// =======================
// 🧠 Component
// =======================

export default function AppointmentDashboard({
  dateRange,
}: {
  dateRange: DateRange;
}) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardAggregate, setDashboardAggregate] = useState<DashboardAggregate[]>([]);
  const [transactionGraph, setTransactionGraph] = useState<any>(null);

  // Fetch dashboard data
  const fetchDashboardData = async (
    start: Date | null,
    end: Date | null,
    type: string
  ) => {
    if (!start || !end) return;
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    const data = await handleDashboardData(startStr, endStr, type);
    setDashboardData(data);
  };

  // Fetch dashboard aggregate
  const fetchDashboardAggregate = async (
    date: Date,
    type: string,
    intervalHour = 2
  ) => {
    const dateStr = date.toISOString().slice(0, 10);
    const data = await handleDashboardAggregate(dateStr, type, intervalHour);
    setDashboardAggregate(data);
  };

  // Fetch transaction graph
  const fetchTransactionGraph = async (
    start: Date | null,
    end: Date | null,
    type?: string
  ) => {
    if (!start || !end) return;
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    console.log(type)
    const data = await getTransactionGraph(startStr, endStr, type as any);
    setTransactionGraph(data);
  };
  // Fetch all data when dateRange changes
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      console.log('Fetching dashboard data with range:', dateRange);
      fetchDashboardData(dateRange.start, dateRange.end, dateRange.type);
      fetchTransactionGraph(dateRange.start, dateRange.end, dateRange.type);
      // fetchDashboardAggregate bisa dipanggil sesuai kebutuhan
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.start, dateRange.end, dateRange.type]);

  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7 3xl:gap-8">
      {/* Statistik utama */}
      <AppointmentStats
        className="col-span-full order-1 @[59rem]:order-1 @[90rem]:order-1"
        dashboardData={dashboardData}
      />

      {/* Total Appointment */}
      <TotalAppointment className="col-span-full order-2 @[59rem]:col-span-12 @[59rem]:order-2 @[90rem]:col-span-8 @[90rem]:order-2" />

      {/* Daftar todo dan patients */}
      <AppointmentTodo className="col-span-full order-3 @[59rem]:col-span-6 @[59rem]:order-3 @[90rem]:col-span-4 @[90rem]:order-3" />
      <Patients
        className="col-span-full order-4 @[59rem]:col-span-6 @[59rem]:order-4 @[90rem]:col-span-4 @[90rem]:order-4"
        dashboardData={dashboardData}
      />

      {/* Department */}
      <Department className="col-span-full order-5 @[59rem]:col-span-6 @[59rem]:order-5 @[90rem]:col-span-8 @[90rem]:order-5" />

      {/* Appointment Patient */}
      <PatientAppointment
        className="col-span-full order-6 @[59rem]:col-span-full @[59rem]:order-7 @[90rem]:col-span-7 @[90rem]:order-6"
        transactionGraph={transactionGraph}
      />

      {/* Appointment Diseases */}
      <AppointmentDiseases className="col-span-full order-7 @[59rem]:col-span-6 @[59rem]:order-6 @[90rem]:col-span-5 @[90rem]:order-7" />
    </div>
  );
}
