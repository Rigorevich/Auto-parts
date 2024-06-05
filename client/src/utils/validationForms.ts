import * as Yup from 'yup';

const phoneValidation = /^(\+?375 ?\((25|29|33|44)\) ?\d{2}-\d{2}-\d{3})|(\+?375\d{9})$/;

export const signInSchema = Yup.object({
  email: Yup.string().required('Поле обязательно!').email('Некорректная почта'),
  password: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Пароль слишком короткий - минимум 3 символа')
    .max(50, 'Максимальная длина - 50 символов'),
});

export const signUpSchema = Yup.object({
  email: Yup.string().required('Поле обязательно!').email('Некорректная почта'),
  password: Yup.string()
    .required('Поле обязательно!')
    .min(3, 'Пароль слишком короткий - минимум 3 символа')
    .max(50, 'Максимальная длина - 50 символов'),
});

export const profileEditSchema = Yup.object({
  name: Yup.string().max(15, 'Максимальная длина - 15 символов'),
  surname: Yup.string().max(15, 'Максимальная длина - 15 символов'),
  phone_number: Yup.string().matches(phoneValidation, 'Некорректный номер телефона'),
});

export const profileAccountSchema = Yup.object({
  email: Yup.string().email('Некорректная почта').required('Поле обязательно!'),
  password: Yup.string()
    .min(3, 'Пароль слишком короткий - минимум 3 символа')
    .max(50, 'Максимальная длина - 50 символов'),
});

export const catalogSchema = Yup.object({
  name: Yup.string().required('Поле обязательно!').max(35, 'Максимальная длина - 35 символов'),
  image: Yup.mixed().nullable().required('Файл обязателен!'),
});

export const autopartSchema = Yup.object().shape({
  mainInfo: Yup.object().shape({
    partName: Yup.string().required('Напишите название запчасти'),
    price: Yup.number()
      .required('Напишите цену запчасти')
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive('Цена должна быть положительной'),
    quantity: Yup.number()
      .required('Введите количество запчастей')
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, 'Количество не может быть отрицательным'),
    discount: Yup.number()
      .max(50, 'Скидка не может превышать 50%')
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0, 'Скидка не может быть отрицательной'),
    description: Yup.string().required('Напишите описание запчасти'),
  }),
  applicability: Yup.object().shape({
    allCars: Yup.boolean(),
    applicability: Yup.array(),
  }),
  attributes: Yup.object().shape({
    images: Yup.array(),
    attributes: Yup.array(),
  }),
});

export const feedbackSchema = Yup.object({
  rating: Yup.number().required('Оставьте оценку'),
  feedback: Yup.string().required('Напишите отзыв').max(255, 'Максимальная длина - 255 символов'),
});

export const orderCreateSchema = Yup.object({
  phone: Yup.string().matches(phoneValidation, 'Некорректный номер телефона'),
});
