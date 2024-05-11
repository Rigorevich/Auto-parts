import * as Yup from 'yup';

const phoneValidation = /^(\+?375 ?\((25|29|33|44)\) ?\d{2}-\d{2}-\d{3})|(\+?375\d{9})$/;

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

export const profileEditSchema = Yup.object({
  name: Yup.string().required('Поле обязательно!').max(15, 'Максимальная длина - 15 символов'),
  surname: Yup.string().max(15, 'Максимальная длина - 15 символов'),
  patronymic: Yup.string().max(15, 'Максимальная длина - 15 символов'),
});

export const profileContactsSchema = Yup.object({
  phone: Yup.string().required('Поле обязательно!').matches(phoneValidation, 'Некорректный номер телефона'),
  email: Yup.string().email('Некорректная почта'),
});
