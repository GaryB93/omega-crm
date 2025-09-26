import express from 'express';
import cors from'cors';
import db from './omega_crm_model.js';

const app = express();
const port = 3000;

// REMOVE CORS BEFORE HOSTING
app.use(cors());

app.get('/', (req, res) => {
  const queryString = 'SELECT * FROM customers;';

  db.query(queryString).then((data) => 
  console.log(data.rows));
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});