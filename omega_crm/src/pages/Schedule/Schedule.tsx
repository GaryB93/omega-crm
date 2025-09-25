import ScheduleTabs from "./ScheduleTabs/ScheduleTabs";
import CustomerPane from "./CustomerPane/CustomerPane";
import DateSelection from "./DateSelection/DateSelection";
import './Schedule.css';
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid";

function Schedule () {

  const schedules = [
    {
      scheduleID: 1,
      scheduleName: "Store 1"
    },
    {
      scheduleID: 2,
      scheduleName: "Store 2"
    },
    {
      scheduleID: 3,
      scheduleName: "Store 3"
    }
  ]
  
  return (
    <div id="scheduleMainContainer">
      <div id="schedule">
        <ScheduleTabs schedules={schedules} />
        <DateSelection />
        <ScheduleGrid />
      </div>
      <CustomerPane/>
    </div>
  )
}

export default Schedule;