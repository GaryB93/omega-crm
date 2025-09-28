import db from "../omega_crm_model.js";

const customerController = {};

customerController.getCustomers = (req, res, next) => {
  const fname = req.query.firstName;
  const lname = req.query.lastName;
  const phoneNum = req.query.phone;

  const columns = [];
  const params = [];

  let query = "SELECT id, firstname, lastname, phone, textreminder FROM customers"

  if (fname != "" || lname != "" || phoneNum != "") {
    query += " WHERE ";

    if (fname != "") {
      columns.push("firstname");
      params.push(fname);
    }
    if (lname != "") {
      columns.push("lastname");
      params.push(lname);
    }
    if (phoneNum != "") {
      columns.push("phone");
      params.push(phoneNum);
    }

    for (let i = 0; i < filters.length; i++) {
      query = query + `${columns[i]} = $` + (i +1).toString();
      if (i != filters.length - 1) {
        query += " AND "
      }
    }
  }
  
  query += ";"

  db.query(query, params)
    .then(data => {
      res.locals.customers = data.rows;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "customerController.getCustomers middleware error",
        status: 501,
        message: "Customer retrieval failed",
      };
      return next(errorObj);
    });
}

customerController.createCustomer = (req, res, next) => {
  const params = [ req.body.firstname, req.body.lastname, req.body.phone, req.body.textReminder ];
  const query = "INSERT INTO customers (firstname, lastname, phone, textreminder) VALUES ($1, $2, $3, $4) RETURNING *;";

  db.query(query, params)
    .then(data => {
      const newCustomer = data.rows[0];
      res.locals.newCustomer = newCustomer;
      return next();
    })
    .catch((err) => {
      const errorObj = {
        log: "customerController.createCustomer middleware error",
        status: 501,
        message: "Customer creation failed",
      };
      return next(errorObj);
    });
}

export default customerController;