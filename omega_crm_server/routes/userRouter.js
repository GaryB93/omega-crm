import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login',
  userController.loginUser,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
)

userRouter.post('/create',
  userController.verifyUsername,
  userController.createUser,
  (req, res) => {
    if (res.locals.message == "Username already exists.") {
      res.status(200).send(res.locals.message);
    } else {
      res.status(200).send(res.locals.user);
    }
  }
)

userRouter.delete('/delete/:id',
  userController.deleteUser,
  (req, res) => {
    res.status(200).send(res.locals.message);
  }
)

userRouter.put('/edit',
  userController.editUser,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
)

userRouter.get('/',
  userController.getUsers,
  (req, res) => {
    res.status(200).send(res.locals.users);
  }
)

export default userRouter;