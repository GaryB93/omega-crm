import express from 'express';
import customerController from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter.get('/',
  customerController.getCustomers,
  (req, res) => {
    res.send(res.locals.customers);
  }
)

customerRouter.post('/create',
  customerController.createCustomer,
  (req, res) => {
    res.status(200).send(res.locals.newCustomer);
  }
)

export default customerRouter;