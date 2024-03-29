import { FormEventHandler } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <main className={styles.signup}>
      <div className={styles.signup__container}>
        <h2 className={styles.signup__title}>Регистрация</h2>
        <form
          onSubmit={handleSubmit}
          className={styles.signup__form}
        >
          <Input
            type="text"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            className={styles.signup__username_input}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            className={styles.signup__password_input}
          />
          <Input
            type="password"
            label="Подтвердите пароль"
            placeholder="Введите пароль еще раз"
            className={styles.signup__repassword_input}
          />
          <Button
            type="submit"
            className={styles.signup__submit}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
