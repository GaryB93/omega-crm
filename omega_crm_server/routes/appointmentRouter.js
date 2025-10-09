import express from 'express';
import appointmentController from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post('/',
  appointmentController.addAppointment,
  appointmentController.addAppointmentEdit,
  (req, res) => {
    res.status(200).send(res.locals.appointment);
  }
)

appointmentRouter.put('/',
  appointmentController.editAppointment,
  appointmentController.addAppointmentEdit,
  (req, res) => {
    res.status(200).send(res.locals.appointment);
  }
)

appointmentRouter.delete('/',
  appointmentController.deleteAppointmentEdits,
  appointmentController.deleteAppointment,
  (req, res) => {
    res.status(200).send(res.locals.deletedAppointment);
  }
)

appointmentRouter.get('/',
  appointmentController.getCustomerAppointments,
  appointmentController.getAppointmentEdits,
  (req, res) => {
    res.status(200).send({
      appointments: res.locals.appointments,
      appointmentEdits: res.locals.appointmentEdits,
    });
  }
)

export default appointmentRouter;