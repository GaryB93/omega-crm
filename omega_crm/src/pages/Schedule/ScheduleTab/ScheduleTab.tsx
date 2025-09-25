import { useContext } from "react";
import { ScheduleContext } from "../../../context/scheduleContext";
import { ScheduleDispatchContext } from "../../../context/scheduleContext";
import './ScheduleTab.css';

interface ScheduleTabProps {
  schedule: {
    scheduleID: number;
    scheduleName: string;
  }
}

function ScheduleTab({ schedule }: ScheduleTabProps) {

  const selectedSchedule = useContext(ScheduleContext);
  const setSelectedSchedule = useContext(ScheduleDispatchContext);

  return (
    <button className={schedule.scheduleID == selectedSchedule ? "selected" : "notSelected"}
      onClick={()=>setSelectedSchedule(schedule.scheduleID)}>
        {schedule.scheduleName}
    </button>
  )
}

export default ScheduleTab;