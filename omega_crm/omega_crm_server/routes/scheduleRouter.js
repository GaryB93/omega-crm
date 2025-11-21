import express from 'express';
import scheduleController from '../controllers/scheduleController.js';
import sectionController from '../controllers/sectionController.js';
import appointmentController from '../controllers/appointmentController.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/',
  scheduleController.getSchedules,
  sectionController.getSections,
  appointmentController.getAppointments,
  (req, res) => {
    const result = {
      selectedSchedule: res.locals.selectedSchedule,
      schedules: res.locals.schedules,
      sections: res.locals.sections,
      appointments: res.locals.appointments,
    };
    res.status(200).send(result);
  }
)

scheduleRouter.post('/',
  scheduleController.addSchedule,
  (req, res) => {
    res.status(200).send(res.locals.newSchedule);
  }
)

scheduleRouter.post('/section',
  sectionController.addSection,
  (req, res) => {
    res.status(200).send(res.locals.newSection);
  }
)

export default scheduleRouter;