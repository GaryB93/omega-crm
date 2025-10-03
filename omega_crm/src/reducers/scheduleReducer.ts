import { createContext, useContext } from "react";
import getCurrentDate from "../utils/getCurrentDate";

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
  date?: Date;
  scheduleName?: string;
  schedules?: Array<Schedule>;
  sections?: Array<Section>;
}

export interface ScheduleState {
  selectedSchedule: number;
  date: string;
  schedules: Array<Schedule>;
  sections: Array<Section>;
  // appointments: Array<Appointment>;
}

export const initialSchedules = {
  selectedSchedule: 0,
  date: getCurrentDate(),
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
          ],
          sections: [...scheduleState.sections]
        }
      }
      case 'selected': {
        return {...scheduleState,
          selectedSchedule: action.id,
          schedules: action.schedules,
          sections: action.sections
        }
      }
      case 'changeDate': {
        return {...scheduleState,
          date: action.date,
          schedules: [...scheduleState.schedules],
          sections: [...scheduleState.sections],
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