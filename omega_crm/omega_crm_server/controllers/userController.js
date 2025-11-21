import db from "../omega_crm_model.js";
import hashPassword from "../utils/hashPassword.js";
import passwordMatches from "../utils/passwordMatches.js";

const userController = {

  verifyUsername: (req, res, next) => {
    const params = [ req.body.username ];
    const query = "SELECT * FROM users WHERE username = $1";

    db.query(query, params)
      .then(data => {
        res.locals.userFound = data.rows[0]
        return next();
      })
      .catch((err) => {
        const errorObj = {
          log: "userController.verifyUsername middleware error",
          status: 501,
          message: "User verification failed",
        };
        return next(errorObj);
      });
  },

  loginUser: async (req, res, next) => {
    const password = req.body.password;
    res.locals.user = { message: "Invalid login credentials" }

    if (res.locals.userFound && await passwordMatches(password, res.locals.userFound.password)) {
      res.locals.user = {
        id: res.locals.userFound.id,
        firstname: res.locals.userFound.firstname,
        lastname: res.locals.userFound.lastname,
        schedule: res.locals.userFound.schedule,
        role: res.locals.userFound.role,
        phone: res.locals.userFound.phone,
      }
    }
    return next();
  },

  createUser: async (req, res, next) => {
    if (res.locals.userFound) {
      return next();
    }

    const params = [
      req.body.firstname.toUpperCase(),
      req.body.lastname.toUpperCase(),
      req.body.username,
      await hashPassword(req.body.password),
      req.body.schedule == 0 ? null : req.body.schedule,
      req.body.role,
      req.body.phone
    ];

    const query = "INSERT INTO users (firstname, lastname, username, password, schedule, role, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, schedule, role, phone;";

    db.query(query, params)
      .then(data => {
        const user = data.rows[0];
        res.locals.user = user;
        return next();
      })
      .catch((err) => {
        const errorObj = {
          log: "userController.createUser middleware error",
          status: 501,
          message: "User create failed",
        };
        return next(errorObj);
      });
  },

  deleteUser: (req, res, next) => {
    const params = [ req.params.id ];
    const query = "DELETE FROM users WHERE id = $1 RETURNING *;";

    db.query(query, params)
      .then(data => {
        if (data.rows[0]) {
          const userDeleted = data.rows[0];
          res.locals.deletedUser = {
            id: userDeleted.id,
            firstname: userDeleted.firstname,
            lastname: userDeleted.lastname,
          };
          return next();
        }
        res.locals.deletedUser = { message: "User not found, delete failed."};
        return next();
      })
      .catch((err) => {
        const errorObj = {
          log: "userController.deleteUser middleware error",
          status: 501,
          message: "User delete failed",
        };
        return next(errorObj);
      });
  },

  editUser: (req, res, next) => {
    const params = [
      req.body.firstname,
      req.body.lastname,
      req.body.schedule == 0 ? null : req.body.schedule,
      req.body.role,
      eq.body.phone,
      req.body.id
    ];

    const query = "UPDATE users SET firstname = $1, lastname = $2, schedule = $3, role = $4, phone = $5 WHERE id = $6 RETURNING id, firstname, lastname, schedule, role, phone;";

    db.query(query, params)
      .then(data => {
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err) => {
        const errorObj = {
          log: "userController.editUser middleware error",
          status: 501,
          message: "User edit failed",
        };
        return next(errorObj);
      });
  },

  getUsers: (req, res, next) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const role = req.query.role;
    const columns = [];
    const params = [];

    let query = "SELECT id, firstname, lastname, schedule, role, phone FROM users";

    if (firstname != "" || lastname != "" || role != "all") {
      query += " WHERE ";

      if (firstname != "") {
        columns.push("firstname");
        params.push(firstname);
      }

      if (lastname != "") {
        columns.push("lastname");
        params.push(lastname);
      }

      if (role != "all") {
        columns.push("role");
        params.push(role);
      }
    }

    for (let i = 0; i < columns.length; i++) {
      query = query + `${columns[i]} = $` + (i + 1).toString();
      if (i != columns.length - 1) {
        query += " AND "
      }
    }

    query += ";";

    db.query(query, params)
      .then(data => {
        if (data.rows) {
          res.locals.users = data.rows;
          return next();
        }
        res.locals.users = undefined;
        return next();
      })
      .catch((err) => {
        const errorObj = {
          log: "userController.getUser middleware error",
          status: 501,
          message: "User retrieval failed",
        };
        return next(errorObj);
      });
  }
}

// userController.deleteUser = (req, res, next) => {
//   const params = [ req.params.id ];
//   const query = "DELETE FROM users WHERE id = $1 RETURNING *;";

//   db.query(query, params)
//     .then(data => {
//       if (data.rows[0]) {
//         const userDeleted = data.rows[0];
//         res.locals.deletedUser = {
//           id: userDeleted.id,
//           firstname: userDeleted.firstname,
//           lastname: userDeleted.lastname,
//         };
//         return next();
//       }
//       res.locals.deletedUser = { message: "User not found, delete failed."};
//       return next();
//     })
//     .catch((err) => {
//       const errorObj = {
//         log: "userController.deleteUser middleware error",
//         status: 501,
//         message: "User delete failed",
//       };
//       return next(errorObj);
//     });
// }

// userController.editUser = (req, res, next) => {
//   const params = [
//     req.body.firstname,
//     req.body.lastname,
//     req.body.schedule == 0 ? null : req.body.schedule,
//     req.body.role,
//     req.body.phone,
//     req.body.id
//   ];

//   const query = "UPDATE users SET firstname = $1, lastname = $2, schedule = $3, role = $4, phone = $5 WHERE id = $6 RETURNING id, firstname, lastname, schedule, role, phone;";

//   db.query(query, params)
//     .then(data => {
//       res.locals.user = data.rows[0];
//       return next();
//     })
//     .catch((err) => {
//       const errorObj = {
//         log: "userController.editUser middleware error",
//         status: 501,
//         message: "User edit failed",
//       };
//       return next(errorObj);
//     });
// }

// userController.getUsers = (req, res, next) => {
//   const firstname = req.query.firstname;
//   const lastname = req.query.lastname;
//   const role = req.query.role;
//   const columns = [];
//   const params = [];

//   let query = "SELECT id, firstname, lastname, schedule, role, phone FROM users";

//   if (firstname != "" || lastname != "" || role != "all") {
//     query += " WHERE ";

//     if (firstname != "") {
//       columns.push("firstname");
//       params.push(firstname);
//     }

//     if (lastname != "") {
//       columns.push("lastname");
//       params.push(lastname);
//     }

//     if (role != "all") {
//       columns.push("role");
//       params.push(role);
//     }
//   }

//   for (let i = 0; i < columns.length; i++) {
//     query = query + `${columns[i]} = $` + (i + 1).toString();
//     if (i != columns.length - 1) {
//       query += " AND "
//     }
//   }

//   query += ";";

//   db.query(query, params)
//     .then(data => {
//       if (data.rows) {
//         res.locals.users = data.rows;
//         return next();
//       }
//       res.locals.users = undefined;
//       return next();
//     })
//     .catch((err) => {
//       const errorObj = {
//         log: "userController.getUser middleware error",
//         status: 501,
//         message: "User retrieval failed",
//       };
//       return next(errorObj);
//     });
// }

export default userController;