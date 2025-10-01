import express from 'express';
import appointmentController from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post('/',
  appointmentController.addAppointment,
  (req, res) => {
    res.status(200).send(res.locals.newAppointment);
  }
)

appointmentRouter.put('/',
  appointmentController.editAppointment,
  (req, res) => {
    res.status(200).send(res.locals.updatedAppointment);
  }
)

appointmentRouter.delete('/',
  appointmentController.deleteAppointment,
  (req, res) => {
    res.status(200).send(res.locals.deletedAppointment);
  }
)

export default appointmentRouter;