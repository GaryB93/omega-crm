import { useScheduleDispatch } from "../../../reducers/scheduleReducer";

import './ScheduleTab.css';

interface ScheduleTabProps {
  schedule: {
    scheduleID: number;
    scheduleName: string;
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
    <button className={schedule.scheduleID == selectedId ? "selected" : "notSelected"}
      onClick={()=>handleClick(schedule.scheduleID)}>
        {schedule.scheduleName}
    </button>
  )
}

export default ScheduleTab;