import express from 'express';
import cors from'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRouter.js';
import customerRouter from './routes/customerRouter.js';
import scheduleRouter from './routes/scheduleRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';

const app = express();
const port = 3000;

// REMOVE CORS BEFORE HOSTING
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html')), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  };
});

app.use('/api/user', userRouter);
app.use('/api/customer', customerRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/appointment', appointmentRouter);

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
  console.log(`Omega CRM server listening on port ${port}`);
});