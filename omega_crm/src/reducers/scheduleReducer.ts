import { createContext, useContext } from "react";

export interface Schedule {
  id: number;
  name: string;
}

export interface Section {
  id: number;
  name: string;
}

export interface Appointment {
  id: number;

}

export interface Action {
  type: string;
  id?: number;
  scheduleName?: string;
  schedules?: Array<Schedule>;
  sections?: Array<Section>;
}

export interface ScheduleState {
  selectedSchedule: number;
  schedules: Array<Schedule>;
  sections: Array<Section>;
  appointments: Array<Appointment>;
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
  ],
  sections: [
    {
      id: 1,
      name: "SectionName",
    },
    {
      id: 2,
      name: "SectionName2",
    },
  ]
}

export const ScheduleContext = createContext(initialSchedules);
export const ScheduleDispatchContext = createContext();

export function scheduleReducer(scheduleState: ScheduleState, 
  action: Action) {
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
          schedules: action.schedules,
          sections: action.sections,
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