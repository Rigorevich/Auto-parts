import { FormEventHandler } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import styles from './SignIn.module.scss';

const SignIn = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <main className={styles.signin}>
      <div className={styles.signin__container}>
        <h2 className={styles.signin__title}>Авторизация</h2>
        <form
          onSubmit={handleSubmit}
          className={styles.signin__form}
        >
          <Input
            type="text"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            className={styles.signin__username_input}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            className={styles.signin__password_input}
          />
          <Button
            type="submit"
            className={styles.signin__submit}
          >
            Войти
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
