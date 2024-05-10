import * as Yup from 'yup';

export const signInSchema = Yup.object({
  username: Yup.string().required('Поле обязательно!').max(15, 'Максимальная длина - 15 символов'),
  password: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Пароль слишком короткий - минимум 3 символа')
    .max(50, 'Максимальная длина - 50 символов'),
});

export const signUpSchema = Yup.object({
  username: Yup.string().required('Поле обязательно!').max(15, 'Максимальная длина - 15 символов'),
  password: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Пароль слишком короткий - минимум 3 символа')
    .max(50, 'Максимальная длина - 50 символов'),
});
