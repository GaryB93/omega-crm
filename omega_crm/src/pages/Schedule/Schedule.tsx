import ScheduleTabs from "./ScheduleTabs/ScheduleTabs";
import CustomerPane from "./CustomerPane/CustomerPane";
import DateSelection from "./DateSelection/DateSelection";
import './Schedule.css';

function Schedule () {
  return (
    <div id="scheduleMainContainer">
      <div id="schedule">
        <ScheduleTabs/>
        <DateSelection />
      </div>
      <CustomerPane/>
    </div>
  )
}

export default Schedule;