import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';

import AuthRootRouter from './src/routers/Auth';

dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));

app.use(
  Fingerprint({
    parameters: [],
  }),
);

app.use('/auth', AuthRootRouter);
app.get('/aaa', (req, res) => {
  res.send('aaa');
});

const bootstrap = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
