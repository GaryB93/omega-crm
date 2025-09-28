import express from 'express';
import scheduleController from '../controllers/scheduleController.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', 
  scheduleController.getSchedules,
  (req, res) => {
    res.status(200).send(res.locals.schedules);
  }
)

export default scheduleRouter;