import { Button } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';

import { ProfileEditForm } from './components/ProfileEditForm/ProfileEditForm';

import styles from './ProfileEdit.module.scss';

const ProfileEdit = () => {
  const handleConfirmDeleteProfile = () =>
    openConfirmModal({
      title: 'Вы уверены',
      centered: true,
      children: <div>При удалении профиля вы потеряете все свои данные</div>,
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      onConfirm: () => console.log('Confirmed'),
    });

  return (
    <section className={styles.profileEdit}>
      <div className={styles.profileEdit__container}>
        <ProfileEditForm />
        <div className={styles.profileEdit__controls}>
          <h2 className={styles.profileEdit__title}>Удалить профиль</h2>
          <Button
            className={styles.profileEdit__delete}
            onClick={handleConfirmDeleteProfile}
            color="blue"
            size="md"
          >
            Удалить
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;
