import ScheduleTabs from "./ScheduleTabs/ScheduleTabs";
import CustomerPane from "./CustomerPane/CustomerPane";
import './Schedule.css';

function Schedule () {
  return (
    <div id="scheduleMainContainer">
      <div id="schedule">
        <ScheduleTabs/>
      </div>
      <CustomerPane/>
    </div>
  )
}

export default Schedule;