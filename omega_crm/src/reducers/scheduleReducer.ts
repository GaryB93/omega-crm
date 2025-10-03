import { createContext, useContext } from "react";

export interface Schedule {
  id: number;
  name: string;
}

export interface ScheduleState {
  selectedSchedule: number;
  schedules: Array<Schedule>
}

export const initialSchedules = {
  selectedSchedule: 1,
  schedules: [
    {
      id: 1,
      name: "Schedule 1"
    },
    {
      id: 2,
      name: "Schedule 2"
    },
    {
      id: 3,
      name: "Schedule 3"
    }
  ]
}

export const ScheduleContext = createContext(initialSchedules);
export const ScheduleDispatchContext = createContext();

export function scheduleReducer(scheduleState: ScheduleState, 
  action: { type: string; id: number; scheduleName?: string; schedules?: Array<Schedule>}) {
    switch (action.type) {
      case 'added': {
        return {...scheduleState,
          schedules: [...scheduleState.schedules,
            {
              id: action.id,
              name: action.scheduleName!
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
      case 'retrieved': {
        return {
          ...scheduleState,
          schedules: action.schedules
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

export function useScheduleDispatch() {
  return useContext(ScheduleDispatchContext);
}