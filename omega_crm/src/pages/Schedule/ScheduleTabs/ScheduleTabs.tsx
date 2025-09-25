import './ScheduleTabs.css';
import ScheduleTab from '../ScheduleTab/ScheduleTab';
import { useSchedules, type Schedule } from '../../../reducers/scheduleReducer';

function ScheduleTabs ({ schedules, selectedId }: { schedules: Array<Schedule>; selectedId: number}) {

  const scheduleTabs = schedules.map((schedule) => {
    return (
      <ScheduleTab key={schedule.scheduleID} schedule={schedule} selectedId={selectedId} />
    )
  })

  return (
    <div id="scheduleTabsContainer">
      <div id="tabsContainer">
        {scheduleTabs}
      </div>
      <div id="addScheduleContainer">
        <button>Add Schedule +</button>
      </div>
    </div>
  )
}

export default ScheduleTabs;