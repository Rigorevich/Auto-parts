import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';

import AuthRootRouter from './src/routers/Auth';
import AccountRootRouter from './src/routers/Account';
import CategoryRootRouter from './src/routers/Categories';
import SubcategoryRootRouter from './src/routers/Subcategories';
import CarAttributesRootRouter from './src/routers/CarAttributes';

dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'src', 'static')));
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(
  fileUpload({
    tempFileDir: '/static/',
  }),
);
app.use(Fingerprint({ parameters: [] }));

app.use('/api/auth', AuthRootRouter);
app.use('/api/accounts', AccountRootRouter);
app.use('/api/categories', CategoryRootRouter);
app.use('/api/subcategories', SubcategoryRootRouter);
app.use('/api/cars', CarAttributesRootRouter);

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
