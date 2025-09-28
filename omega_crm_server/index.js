import express from 'express';
import cors from'cors';
import db from './omega_crm_model.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = 3000;

// REMOVE CORS BEFORE HOSTING
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  const queryString = 'SELECT * FROM customers;';

  db.query(queryString).then((data) => 
  console.log(data.rows));
  res.send('Hello world!');
});

app.use('/api/user', userRouter);

app.use((req, res) => {
  console.log("Backend express server failed to send a response from other paths, sending 404");
  res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught an unknown middleware error",
    status: 500,
    message: {err: "An error occurred"}
  }
  const errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});