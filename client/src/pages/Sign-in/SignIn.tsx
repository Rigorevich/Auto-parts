import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input/Input';
import { PAGES } from '../../constants/pages';
import { signUpSchema } from '../../utils/validationForms';

import styles from './SignIn.module.scss';

export type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { isUserLogged, handleSignIn } = useContext(AuthContext) as AuthContextInterface;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (isUserLogged) {
      navigate(PAGES.ROOT);
    }
  }, [isUserLogged]);

  return (
    <main className={styles.signin}>
      <div className={styles.signin__container}>
        <h2 className={styles.signin__title}>Авторизация</h2>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className={styles.signin__form}
        >
          <Input
            type="text"
            name="username"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            register={register}
            autoComplete="off"
            status={errors.username && 'error'}
            description={errors?.username?.message}
            className={styles.signin__username_input}
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
            className={styles.signin__password_input}
          />
          <span className={styles.signin__no_account}>
            Нет аккаунта?{' '}
            <Link
              to={PAGES.SIGN_UP}
              className={styles.link}
            >
              Зарегистрироваться.
            </Link>
          </span>
          <Button
            type="submit"
            className={styles.signin__submit}
            disabled={isSubmitting}
          >
            Войти
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
