import express from 'express';
import customerController from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter.get('/',
  customerController.getCustomers,
  (req, res) => {
    res.send(res.locals.customers);
  }
)

customerRouter.post('/',
  customerController.createCustomer,
  (req, res) => {
    res.status(200).send(res.locals.newCustomer);
  }
)

customerRouter.put('/',
  customerController.editCustomer,
  (req, res) => {
    res.status(200).send(res.locals.customer);
  }
)

customerRouter.delete('/',
  customerController.deleteCustomer,
  (req, res) => {
    res.status(200).send(res.locals.message);
  }
)

export default customerRouter;