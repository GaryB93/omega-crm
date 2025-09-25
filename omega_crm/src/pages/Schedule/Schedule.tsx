import ScheduleTabs from "./ScheduleTabs/ScheduleTabs";
import CustomerPane from "./CustomerPane/CustomerPane";
import DateSelection from "./DateSelection/DateSelection";
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid";
import { useSchedules } from "../../reducers/scheduleReducer";
import './Schedule.css';

function Schedule () {

  const scheduleState = useSchedules();
  const schedules = scheduleState.schedules;
  const selectedScheduleId = scheduleState.selectedSchedule;
  
  return (
    <div id="scheduleMainContainer">
      <div id="schedule">
        <ScheduleTabs schedules={schedules} selectedId={selectedScheduleId} />
        <DateSelection />
        <ScheduleGrid />
      </div>
      <CustomerPane />
    </div>
  )
}

export default Schedule;