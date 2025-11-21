import { useSchedules, useScheduleDispatch } from "../../../reducers/scheduleReducer";
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

  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const handleClick = (scheduleID: number) => {
    scheduleAPI.getSchedules(scheduleID, scheduleState.date)
    .then(response => response.json())
    .then(result => {
      scheduleDispatch({
        type: "selected",
        id: scheduleID,
        schedules: result.schedules,
        sections: result.sections,
        appointments: result.appointments
      });
    })
    .catch(err => console.error(err));
  }

  return (
    <button className={schedule.id == selectedId ? "selectedTab scheduleTab" : "scheduleTab"}
      onClick={()=>handleClick(schedule.id)}>
        {schedule.name}
    </button>
  )
}

export default ScheduleTab;