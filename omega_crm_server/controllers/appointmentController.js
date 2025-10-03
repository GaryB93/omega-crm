import db from "../omega_crm_model.js";

const appointmentController = {};

appointmentController.getAppointments = (req, res, next) => {
  const params = new Array(2);
  params[0] = res.locals.selectedSchedule; 
  params[1] = req.query.date;
 
  const query = 'SELECT a.id, a.date, a."startTime", a."endTime", a.description, a.section, customers.firstname, customers.lastname, customers.phone, customers.textreminder FROM appointments AS a INNER JOIN customers ON a.customer = customers.id INNER JOIN sections ON a.section = sections.id WHERE sections.schedule = $1 AND a.date = $2;';

  db.query(query, params)
    .then(data => {
      res.locals.appointments = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.getAppointments middleware error",
        status: 501,
        message: "Retrieval of appointments failed"
      }
      return next(errorObj);
    });
}

appointmentController.addAppointment = (req, res, next) => {
  const params = [
    req.body.section,
    req.body.customer,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.description
  ];

  const query = 'INSERT INTO appointments (customer, date, "startTime", "endTime", description, section) VALUES ($2, $3, $4, $5, $6, $1) RETURNING *;';

  db.query(query, params)
    .then(data => {
      res.locals.newAppointment = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.addAppointment middleware error",
        status: 501,
        message: "Creation of new appointment failed"
      }
      return next(errorObj);
    });
}

appointmentController.editAppointment = (req, res, next) => {
  const params = [
    req.body.id,
    req.body.section,
    req.body.customer,
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.description
  ];

  const query = 'UPDATE appointments SET customer = $3, date = $4, "startTime" = $5, "endTime" = $6, description = $7, section = $2 WHERE id = $1 RETURNING *;';

  db.query(query, params)
    .then(data => {
      res.locals.updatedAppointment = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.editAppointment middleware error",
        status: 501,
        message: "Update of appointment failed"
      }
      return next(errorObj);
    });
}

appointmentController.deleteAppointment = (req, res, next) => {
  const params = [ req.query.id ];

  const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *;';

  db.query(query, params)
    .then(data => {
      res.locals.deletedAppointment = data.rows[0];
      console.log(res.locals.deletedAppointment);
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.deleteAppointment middleware error",
        status: 501,
        message: "Delete of appointment failed"
      }
      return next(errorObj);
    });
}

export default appointmentController;