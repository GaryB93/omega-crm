import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login',
  userController.loginUser,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
)

userRouter.post('/',
  userController.verifyUsername,
  userController.createUser,
  (req, res) => {
    if (res.locals.userFound) {
      res.status(200).send({message: "Username already exists."});
    } else {
      res.status(200).send(res.locals.user);
    }
  }
)

userRouter.delete('/:id',
  userController.deleteUser,
  (req, res) => {
    res.status(200).send(res.locals.deletedUser);
  }
)

userRouter.put('/',
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