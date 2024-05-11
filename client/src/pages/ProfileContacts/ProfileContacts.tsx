import { ProfileContactsForm } from './components/ProfileContactsForm/ProfileContactsForm';

import styles from './ProfileContacts.module.scss';

const ProfileContacts = () => {
  return (
    <section className={styles.profileContacts}>
      <div className={styles.profileContacts__container}>
        <ProfileContactsForm />
      </div>
    </section>
  );
};

export default ProfileContacts;
