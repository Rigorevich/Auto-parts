import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';

import AuthRootRouter from './src/routers/Auth';
import UserRootRouter from './src/routers/User';
import TokenService from './src/services/Auth/Token';

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

app.use('/api/auth', AuthRootRouter);
app.use('/api/users', UserRootRouter);
app.get('/api/resource', TokenService.checkAccess, (req, res) => {
  res.status(200).json('Добро пожаловать!' + Date.now());
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
