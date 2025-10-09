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
      res.locals.appointment = data.rows[0];
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
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.description
  ];

  const query = 'UPDATE appointments SET date = $3, "startTime" = $4, "endTime" = $5, description = $6, section = $2 WHERE id = $1 RETURNING *;';

  db.query(query, params)
    .then(data => {
      res.locals.appointment = data.rows[0];
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

appointmentController.addAppointmentEdit = (req, res, next) => {
  const appointment = res.locals.appointment.id;
  const user = req.body.user;
  const timestamp = req.body.timestamp;
  const params = [appointment, user, "Edit made", timestamp];

  const query = 'INSERT INTO appointmentEdits (appointment, owner, previnfo, newinfo, timestamp) VALUES ($1, $2, $3, $3, $4) RETURNING *;';

  db.query(query, params)
    .then(data => {
      console.log(data);
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.addAppointmentEdit middleware error",
        status: 501,
        message: "Creation of appointment edit failed"
      }
      return next(errorObj);
    });
}

appointmentController.deleteAppointmentEdits = (req, res, next) => {
  const appointment = req.query.id;
  const params = [appointment];
  const query = `DELETE FROM appointmentEdits WHERE appointment = $1`;

  db.query(query, params)
    .then(data => {
      console.log(data);
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.deleteAppointmentEdits middleware error",
        status: 501,
        message: "Deletion of appointment edits failed"
      }
      return next(errorObj);
    });
}

appointmentController.getCustomerAppointments = (req, res, next) => {
  const customerId = req.query.customer;
  const params = [ customerId ];
  const query = 'SELECT * FROM appointments WHERE customer = $1;';

  db.query(query, params)
    .then(data => {
      res.locals.appointments = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.getCustomerAppointments middleware error",
        status: 501,
        message: "Retrieval of customer's appointments failed"
      }
      return next(errorObj);
    });
}

appointmentController.getAppointmentEdits = (req, res, next) => {
  const appointmentIds = res.locals.appointments.map(appt => appt.id);
  let query = 'SELECT * FROM appointmentEdits WHERE';

  for (let i = 1; i <= appointmentIds.length; i++) {
    query += ` id = $${i}`;

    if (i != appointmentIds.length) {
      query += ' OR'
    }
  }

  query += ";";

  db.query(query, appointmentIds)
    .then(data => {
      res.locals.appointmentEdits = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "appointmentController.getAppointmentEdits middleware error",
        status: 501,
        message: "Retrieval of customer's appointment edits failed"
      }
      return next(errorObj);
    });
}

export default appointmentController;