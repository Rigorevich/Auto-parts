import { ProfileAccountForm } from './components/ProfileContactsForm/ProfileAccountForm';

import styles from './ProfileAccount.module.scss';

const ProfileAccount = () => {
  return (
    <section className={styles.profileContacts}>
      <div className={styles.profileContacts__container}>
        <ProfileAccountForm />
      </div>
    </section>
  );
};

export default ProfileAccount;
