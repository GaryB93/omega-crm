import express from 'express';
import scheduleController from '../controllers/scheduleController.js';
import sectionController from '../controllers/sectionController.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/',
  scheduleController.getSchedules,
  sectionController.getSections,
  (req, res) => {
    const result = {
      schedules: res.locals.schedules,
      sections: res.locals.sections,
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

export default scheduleRouter;