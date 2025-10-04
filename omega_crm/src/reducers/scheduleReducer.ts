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
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  section: number;
  firstname: string;
  lastname: string;
  phone: string;
  textreminder: boolean;
}

export interface Action {
  type: string;
  id?: number;
  name?: string;
  date?: string;
  scheduleName?: string;
  schedules?: Array<Schedule>;
  sections?: Array<Section>;
  appointments?: Array<Appointment>;
}

export interface ScheduleState {
  selectedSchedule: number;
  date: string;
  schedules: Array<Schedule>;
  sections: Array<Section>;
  appointments: Array<Appointment>;
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
  ],
  appointments: [
    {
      id: 1,
      date: "2025-10-02",
      startTime: "08:00:00",
      endTime: "09:00:00",
      description: "some work done here",
      section: 1,
      firstname: "Johnny",
      lastname: "Boy",
      phone: "5552224444",
      textreminder: true,
    }
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
          sections: [...scheduleState.sections],
          appointments: [...scheduleState.appointments]
        }
      }
      case 'selected': {
        return {...scheduleState,
          selectedSchedule: action.id,
          schedules: action.schedules,
          sections: action.sections,
          appointments: action.appointments
        }
      }
      case 'changedDate': {
        return {...scheduleState,
          date: action.date,
          schedules: [...scheduleState.schedules],
          sections: [...scheduleState.sections],
          appointments: [...scheduleState.appointments]
        }
      }
      case 'addedSection': {
        return {...scheduleState,
          schedules: [...scheduleState.schedules],
          sections: [...scheduleState.sections,
            {
              id: action.id,
              name: action.name
            }
          ],
          appointments: [...scheduleState.appointments]
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