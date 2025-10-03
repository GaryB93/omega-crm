import { useScheduleDispatch } from "../../../reducers/scheduleReducer";
import scheduleAPI from "../../../api/scheduleAPI";

import './ScheduleTab.css';

interface ScheduleTabProps {
  schedule: {
    id: number;
    name: string;
  };
  selectedId: number;
}

function ScheduleTab({ schedule, selectedId }: ScheduleTabProps) {

  const scheduleDispatch = useScheduleDispatch();

  const handleClick = (scheduleID: number) => {
    scheduleAPI.getSchedules(scheduleID)
    .then(result => {
      scheduleDispatch({
        type: "selected",
        id: scheduleID,
        schedules: result.schedules,
        sections: result.sections
      });
    })
    .catch(err => console.error(err));
  }

  return (
    <button className={schedule.id == selectedId ? "selected" : "notSelected"}
      onClick={()=>handleClick(schedule.id)}>
        {schedule.name}
    </button>
  )
}

export default ScheduleTab;