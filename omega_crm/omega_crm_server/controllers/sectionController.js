import db from "../omega_crm_model.js";

const sectionController = {};

sectionController.getSections = (req, res, next) => {
  const params = [0];
  
  if (req.query.schedule == 0) {
    if (res.locals.schedules[0]) {
      res.locals.selectedSchedule = res.locals.schedules[0].id;
      params[0] = res.locals.schedules[0].id;
    }
  } else {
    res.locals.selectedSchedule = Number(req.query.schedule);
    params[0] = req.query.schedule;
  }

  const query = "SELECT * FROM sections WHERE schedule = $1;";

  db.query(query, params)
    .then(data => {
      res.locals.sections = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "sectionController.getSections middleware error",
        status: 501,
        message: "Retrieval of sections failed",
      }
      return next(errorObj);
    });
}

sectionController.addSection = (req, res, next) => {
  const params = [ req.body.sectionName, req.body.scheduleId ];
  const query = "INSERT INTO sections (name, schedule) VALUES ($1, $2) RETURNING *;";

  db.query(query, params)
    .then(data => {
      res.locals.newSection = data.rows[0];
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "sectionController.addSection middleware error",
        status: 501,
        message: "Section creation failed",
      }
      return next(errorObj);
    });
}

export default sectionController;