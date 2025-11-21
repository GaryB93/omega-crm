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

// export interface Action {
//   type: string;
//   id?: number;
//   name?: string;
//   date?: string;
//   scheduleName?: string;
//   schedules?: Array<Schedule>;
//   sections?: Array<Section>;
//   appointments?: Array<Appointment>;
// }

type Action = 
  | { type: 'added', id: number, name: string }
  | { type: 'selected', id: number, schedules: Array<Schedule>, sections: Array<Section>, appointments: Array<Appointment> }
  | { type: 'changedDate', date: string }
  | { type: 'addedSection', id: number, name: string }

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
  schedules: [{id: 0, name: ""}],
  sections: [{id: 0, name: ""}],
  appointments: [{
    id: 0,
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    section: 0,
    firstname: '',
    lastname: '',
    phone: '',
    textreminder: false,
  }]
}

export const ScheduleContext = createContext(initialSchedules);
export const ScheduleDispatchContext = createContext<React.ActionDispatch<[Action]>>(()=>{});

export function scheduleReducer(scheduleState: ScheduleState, 
  action: Action) {
    switch (action.type) {
      case 'added': {
        return {...scheduleState,
          schedules: [...scheduleState.schedules,
            {
              id: action.id,
              name: action.name
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
        throw Error('Unknown action in scheduleReducer');
      }
    }
}

export function useSchedules() {
  return useContext(ScheduleContext);
}

export function useScheduleDispatch() {
  return useContext(ScheduleDispatchContext);
}