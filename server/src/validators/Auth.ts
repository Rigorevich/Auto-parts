import * as Yup from 'yup';
import { Response, Request, NextFunction } from 'express-serve-static-core';

import validateRequest from '../utils/ValidateRequest';

export const signInSchema = Yup.object({
  body: Yup.object({
    username: Yup.string().required('Поле обязательно!').max(25, 'Максимальная длина - 15 символов'),
    password: Yup.string()
      .required('Поле обязательно!')
      .min(3, 'Пароль слишком короткий - минимум 5 символа')
      .max(50, 'Максимальная длина - 50 символов'),
  }),
});

export const signUpSchema = Yup.object({
  body: Yup.object({
    username: Yup.string().required('Поле обязательно!').max(25, 'Максимальная длина - 25 символов'),
    password: Yup.string()
      .required('Поле обязательно!')
      .min(3, 'Пароль слишком короткий - минимум 3 символа')
      .max(50, 'Максимальная длина - 50 символов'),
    role: Yup.number()
      .typeError('Значение должно быть числом!')
      .min(1, 'Минимальное значение - 1')
      .max(2, 'Максимальное значение - 2'),
  }),
});

export const logoutSchema = Yup.object({
  cookies: Yup.object({
    refreshToken: Yup.string().required('Поле обязательно!'),
  }),
});

class AuthValidator {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, signInSchema);
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, signUpSchema);
  }

  static async logOut(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, logoutSchema);
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next);
  }
}

export default AuthValidator;
