import './ScheduleTabs.css';
import ScheduleTab from '../ScheduleTab/ScheduleTab';

interface ScheduleTabsProps {
  schedules: Array<{scheduleID: number, scheduleName: string}>;
}

function ScheduleTabs ({ schedules }: ScheduleTabsProps) {

  const schedulesList = schedules.map((schedule) => 
    <ScheduleTab key={schedule.scheduleID} schedule={schedule}/>
  );

  return (
    <div id="scheduleTabsContainer">
      <div id="tabsContainer">
        {schedulesList}
      </div>
      <div id="addScheduleContainer">
        <button>Add Schedule +</button>
      </div>
    </div>
  )
}

export default ScheduleTabs;