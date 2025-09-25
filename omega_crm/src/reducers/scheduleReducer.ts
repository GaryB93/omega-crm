import { createContext, useContext } from "react";

export interface Schedule {
  scheduleID: number;
  scheduleName: string;
}

export interface ScheduleState {
  selectedSchedule: number;
  schedules: Array<Schedule>
}

export const initialSchedules = {
  selectedSchedule: 1,
  schedules: [
    {
      scheduleID: 1,
      scheduleName: "Schedule 1"
    },
    {
      scheduleID: 2,
      scheduleName: "Schedule 2"
    },
    {
      scheduleID: 3,
      scheduleName: "Schedule 3"
    }
  ]
}

export const ScheduleContext = createContext(initialSchedules);
export const ScheduleDispatchContext = createContext();

export function scheduleReducer(scheduleState: ScheduleState, 
  action: { type: string; id: number; scheduleName?: string}) {
    switch (action.type) {
      case 'added': {
        return {...scheduleState,
          schedules: [...scheduleState.schedules,
            {
              scheduleID: action.id,
              scheduleName: action.scheduleName!
            }
          ]
        }
      }
      case 'selected': {
        return {
          selectedSchedule: action.id,
          schedules: [...scheduleState.schedules]
        }
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}

export function useSchedules() {
  return useContext(ScheduleContext);
}