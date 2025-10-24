import { useEffect } from 'react';
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
}

// =======================
// 🧠 Component
// =======================

export default function AppointmentDashboard({
  dateRange,
  dashboardData,
  dashboardAggregate,
  fetchDashboardData,
  fetchDashboardAggregate,
}: AppointmentDashboardProps) {
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchDashboardData(dateRange.start, dateRange.end);
      fetchDashboardAggregate(dateRange.start, 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.start, dateRange.end]);

  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7 3xl:gap-8">
      {/* Statistik utama */}
      <AppointmentStats className="col-span-full order-1 @[59rem]:order-1 @[90rem]:order-1" />

      {/* Total Appointment */}
      <TotalAppointment className="col-span-full order-2 @[59rem]:col-span-12 @[59rem]:order-2 @[90rem]:col-span-8 @[90rem]:order-2" />

      {/* Daftar todo dan patients */}
      <AppointmentTodo className="col-span-full order-3 @[59rem]:col-span-6 @[59rem]:order-3 @[90rem]:col-span-4 @[90rem]:order-3" />
      <Patients className="col-span-full order-4 @[59rem]:col-span-6 @[59rem]:order-4 @[90rem]:col-span-4 @[90rem]:order-4" />

      {/* Department */}
      <Department className="col-span-full order-5 @[59rem]:col-span-6 @[59rem]:order-5 @[90rem]:col-span-8 @[90rem]:order-5" />

      {/* Appointment Patient */}
      <PatientAppointment className="col-span-full order-6 @[59rem]:col-span-full @[59rem]:order-7 @[90rem]:col-span-7 @[90rem]:order-6" />

      {/* Appointment Diseases */}
      <AppointmentDiseases className="col-span-full order-7 @[59rem]:col-span-6 @[59rem]:order-6 @[90rem]:col-span-5 @[90rem]:order-7" />
    </div>
  );
}
