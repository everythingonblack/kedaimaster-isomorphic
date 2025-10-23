import AppointmentStats from '@/app/shared/appointment/dashboard/appointment-stats';
import AppointmentDiseases from '@/app/shared/appointment/dashboard/appointment-diseases';
import Department from '@/app/shared/appointment/dashboard/department';
import TotalAppointment from '@/app/shared/appointment/dashboard/total-appointment';
import Patients from '@/app/shared/appointment/dashboard/patients';
import PatientAppointment from '@/app/shared/appointment/dashboard/patient-appointment';
import ScheduleList from '@/app/shared/appointment/dashboard/schedule-list';
import AppointmentTodo from '@/app/shared/appointment/dashboard/appointment-todo';

export default function AppointmentDashboard() {
  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7 3xl:gap-8">
      <AppointmentStats className="col-span-full" />
      <TotalAppointment className="col-span-full @[90rem]:col-span-7" />
      {/* <ScheduleList className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" /> */}
      <AppointmentTodo className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      <Patients className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
            <PatientAppointment className="col-span-full @[90rem]:col-span-7" />

      <Department className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      {/* <UpcomingAppointmentTable className="col-span-full" /> */}
      <AppointmentDiseases className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" />      
    </div>
  );
}
