import db from "../omega_crm_model.js";

const scheduleController = {};

scheduleController.getSchedules = (req, res, next) => {
  const query = "SELECT * FROM schedules;";

  db.query(query)
    .then(data => {
      res.locals.schedules = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "scheduleController.getSchedules middleware error",
        status: 501,
        message: "Schedule retrieval failed",
      }
      return next(errorObj);
    });
}

scheduleController.addSchedule = (req, res, next) => {
  const params = [ req.body.name ];
  const query = "INSERT INTO schedules (name) VALUES ($1) RETURNING *;";

  db.query(query)
    .then(data => {
      res.locals.newSchedule = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "scheduleController.addSchedule middleware error",
        status: 501,
        message: "Schedule creation failed",
      }
      return next(errorObj);
    });
}

export default scheduleController;