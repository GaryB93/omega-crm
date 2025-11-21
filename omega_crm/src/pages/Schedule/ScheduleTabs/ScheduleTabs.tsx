import './ScheduleTabs.css';
import ScheduleTab from '../ScheduleTab/ScheduleTab';
import { type Schedule } from '../../../reducers/scheduleReducer';

interface ScheduleTabsProps {
  schedules: Array<Schedule>;
  selectedId: number;
  openAddScheduleModal: () => void;
}

function ScheduleTabs ({ schedules, selectedId, openAddScheduleModal }: ScheduleTabsProps) {

  const scheduleTabs = schedules.map((schedule) => {
    return (
      <ScheduleTab key={schedule.id} schedule={schedule} selectedId={selectedId} />
    )
  });

  return (
    <div id="scheduleTabsContainer">
      <div id="tabsContainer">
        {scheduleTabs}
      </div>
      <button id="addScheduleBtn" className="secondaryBtn" onClick={openAddScheduleModal}>Add Schedule +</button>
    </div>
  );
}

export default ScheduleTabs;