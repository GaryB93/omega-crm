import { useScheduleDispatch } from "../../../reducers/scheduleReducer";

import './ScheduleTab.css';

interface ScheduleTabProps {
  schedule: {
    id: number;
    name: string;
  };
  selectedId: number;
}

function ScheduleTab({ schedule, selectedId }: ScheduleTabProps) {

  const dispatch = useScheduleDispatch();

  const handleClick = (scheduleID: number) => {
    dispatch({
      type: "selected",
      id: scheduleID
    });
  }

  return (
    <button className={schedule.id == selectedId ? "selected" : "notSelected"}
      onClick={()=>handleClick(schedule.id)}>
        {schedule.name}
    </button>
  )
}

export default ScheduleTab;