import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input/Input';
import { PAGES } from '../../constants/pages';
import { signUpSchema } from '../../utils/validationForms';

import styles from './SignUp.module.scss';

export type FormValues = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { isUserLogged, handleSignUp } = useContext(AuthContext) as AuthContextInterface;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogged) {
      navigate(PAGES.ROOT);
    }
  }, [isUserLogged]);

  return (
    <main className={styles.signup}>
      <div className={styles.signup__container}>
        <h2 className={styles.signup__title}>Регистрация</h2>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className={styles.signup__form}
        >
          <Input
            type="text"
            name="email"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            register={register}
            autoComplete="off"
            status={errors.email && 'error'}
            description={errors?.email?.message}
            className={styles.signup__username_input}
          />
          <Input
            type="password"
            name="password"
            label="Пароль"
            placeholder="Введите пароль"
            register={register}
            autoComplete="off"
            status={errors.password && 'error'}
            description={errors?.password?.message}
            className={styles.signup__password_input}
          />
          {/* <Input
            type="password"
            label="Подтвердите пароль"
            placeholder="Введите пароль еще раз"
            className={styles.signup__repassword_input}
          /> */}
          <span className={styles.signup__no_account}>
            Есть аккаунт?{' '}
            <Link
              to={PAGES.SIGN_IN}
              className={styles.link}
            >
              Авторизоваться.
            </Link>
          </span>
          <Button
            type="submit"
            className={styles.signup__submit}
            disabled={isSubmitting}
          >
            Регистрация
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
