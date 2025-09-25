import { useContext } from "react";
import { ScheduleDispatchContext } from "../../../reducers/scheduleReducer";

import './ScheduleTab.css';

interface ScheduleTabProps {
  schedule: {
    scheduleID: number;
    scheduleName: string;
  };
  selectedId: number;
}

function ScheduleTab({ schedule, selectedId }: ScheduleTabProps) {

  const dispatch = useContext(ScheduleDispatchContext);

  return (
    <button className={schedule.scheduleID == selectedId ? "selected" : "notSelected"}>
        {schedule.scheduleName}
    </button>
  )
}

export default ScheduleTab;