import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';
import ErrorUtils, { Unprocessable } from './Errors';

export default async (req: Request, res: Response, next: NextFunction, schema?: Schema) => {
  try {
    if (schema) {
      await schema.validate(req);
    }

    return next();
  } catch ({ path, errors }) {
    return ErrorUtils.catchError(res, new Unprocessable(JSON.stringify({ path, errors })));
  }
};
