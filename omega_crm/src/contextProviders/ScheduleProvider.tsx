import { useReducer } from "react";
import { scheduleReducer, initialSchedules, ScheduleContext, ScheduleDispatchContext } from "../reducers/scheduleReducer";

function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [scheduleState, dispatch] = useReducer(scheduleReducer, initialSchedules);

  return (
    <ScheduleContext.Provider value={scheduleState}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        {children}
      </ScheduleDispatchContext.Provider>
    </ScheduleContext.Provider>
  );
}

export default ScheduleProvider;